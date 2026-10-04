# @just-genius/dsh-flow

Leader 规划、子 Agent 执行、流程图实时可调 —— 一个 DSH 插件。

主 Agent（Leader）只做规划：它把任务拆成一张 DAG，每个节点派给一个子 Agent 去跑，
然后根据子 Agent 的产出调整这张图。执行过程在一个独立的 **Flow** 标签页里以流程图
（React Flow）实时呈现。

## 并行与写作用域

DSH 的子 Agent **继承父会话的工作目录**（in-process provider 的 `childSessionMeta`
直接把 `parentHeader.cwd` 交给子会话，subagent seam 也没有 `cwd` 覆盖项）。
所以「给每个子 Agent 一个独立 checkout」在当前 DSH 上做不到，**同一目录里两个
子 Agent 同时改文件会互相覆盖**。

安全性因此来自**所有权声明**，而不是文件系统隔离：

```
writeScope: ["src/auth"]      → 只能写这个前缀；与不重叠的作用域同波并行
writeScope: []                → 只读；永远可并行
省略 writeScope               → 爆炸半径未知，独占运行，且阻塞其它写者
```

三层保证：

| 层 | 做什么 | 在哪 |
|---|---|---|
| 调度 | 重叠/未声明的作用域不进同一波，被推迟的节点保持 `pending` | `src/scope.ts`（纯函数）+ `orchestrator.pump` |
| 运行时 | 子 Agent 的 `edit`/`write` 越界即被拒；声明了作用域的节点失去 `bash`/`pwsh` 与派发类工具 | `src/guard.ts` + `index.ts` 注册的全局 guard |
| 提示词 | Leader 契约解释如何切分才能并行 | `src/policy.ts` |

**为什么声明了作用域就不能用 shell？** shell 的写入无法用路径解析判定（重定向、
脚本、构建工具都能写），任何解析器都会有 fail-open 的洞。所以不猜：声明作用域
就移除 shell，需要 shell 的步骤不要声明作用域、独占运行。**并行安全与不受限的
shell 在构造上互斥**，而不是靠约定。

**为什么 `run_code`（PTC）没被移除？** 它内部发出的调用会带着**同一个
`exec.agent`** 回到同一个 tool scheduler，因此 `tools.edit(...)` 会被上面那层 guard
逐次判到；而 `tools.bash(...)` 仍被 shell 规则拒掉。反过来，在 r-mode / PTC 预设下
`run_code` 是子 Agent 唯一的对外工具（子会话继承预设），禁掉它会让声明了作用域的
节点**什么也做不了**。

默认并行上限是 4，但**上限不等于实际并行度**：真正决定并发的是作用域。全都不声明
作用域的计划行为与从前完全一致（一次一步），声明了互不重叠作用域的计划才会真正并行。
画布节点上会显示 `只读 / 写作用域 … / 独占`，标题栏可直接调并发上限。

**已知边界**：作用域的保证范围是「DSH 文件工具及其 PTC 绑定」，不含 MCP 工具或其它
进程外写入通道；这些无法分类的工具不被拦截，需要靠工作区划分来避免冲突。

## 开关：默认关闭，用户显式开启

Flow 模式**默认是关的**。开启方式二选一：

```sh
/flow                 # 进入
/flow 修这个登录 bug  # 进入，并把后面的文字交给 Leader 当任务
/flow off             # 退出
```

`/flow` 是 slash command，整行都会被命令吃掉。后面跟着任务时，插件会把剩余文字再
`steer` 成一条用户消息（和 `/debug <说明>` 一样）；否则看起来就是「发了没反应」。

或者在 Flow 标签页上点「开启 Flow 模式」按钮。

关闭期间插件对模型零成本：`flow.*` 工具不可见，Leader 契约不注入，执行工具不受限。

开启后 Leader 的执行类工具（`edit` / `write` / `bash` 等）会被**真实禁用** ——
不只是提示词里说"别自己干"，而是从工具集里摘掉。只读工具（`read` / `grep` / `glob` /
`web_search` …）保留，因为能读代码的 Leader 规划得更好；禁掉的是"动手"的能力。

退出时会自动取消所有在跑的子 Agent —— 没有 Leader 看结果的孩子不该继续跑。

## 工作方式

`/flow` 之后：

```
Leader（当前会话的 Agent）
  │ 只拿到 flow.* + 只读工具
  │ edit / write / bash 被禁用 —— 它结构上没法自己动手
  ▼
Host 编排器
  │ 只派发当前就绪的下一步（默认并发 1）→ 等该子 Agent settle → 唤醒 Leader
  ▼
子 Agent（每个节点一个，独立 session）
  │ 简报自带上游结果；任务太大时可 flow.expand 拆子节点，跑完再 settle
  ▼
Leader 验收
  │ flow.status 看产出 → 通过则 flow.next；失败则 flow.patch
  ▼
Flow 标签页（conversation.view）
    节点着色 = 状态，边 = 依赖，点开看简报/产出/失败原因
```

关键循环：**Leader 规划并逐步验收，Host 只在被要求时派发下一步，画布只做查看与局部干预。**

`flow.plan` **不会**一次把所有独立节点铺开。默认并发是 1：先跑第一个就绪步骤，跑完叫醒 Leader。Leader 检查结果后调用 `flow.next` 才开始下一步。

**人工确认是按需的**，不是每一步都停：
- Leader 或子代理调用 `flow.confirm`（带一句问题）
- 或规划时给节点标 `confirm: true`（该节点结束后暂停）
- 此时画布才出现「通过并继续」；你也可以在对话里回答，再由 Leader `flow.next`

节点 settle 之后：
- 通过 → `flow.next`
- 失败 → `flow.patch`：
  - `retry` —— 带着改写后的 prompt 重跑（旧 run 已 settle，新 run 天然干净）
  - `skip` —— 标记跳过；下一步仍要 `flow.next`
  - `add` —— 插入补救步骤（比如失败后加一步"定位根因"）
  - `cancel` / `remove` —— 停掉或删掉

失败的节点**不会自动重试**：重试什么、怎么改 prompt，是 Leader 的判断，不是编排器的默认行为。

### 中途切换

模式在对话进行中切换时，已经发给模型的那段提示词改不了，所以切换会被暂存在
`agent/pre-step` 边界提交 —— 也就是"下一步生效"，跟 `/debug` 的行为一致。
在切换生效前反悔（比如 `/flow` 之后马上 `/flow off`），暂存的切换会直接取消。

## 安装

```sh
pnpm install
pnpm build
dsh plugin --profile web add ./plugins/dsh-flow
```

因为 package 声明了 `dsh.bundle.patch`，安装会自动写入 bundle 层；
**重启 DSH web**（刷新页面不够）。

卸载：

```sh
dsh plugin --profile web remove @just-genius/dsh-flow
```

## 工具

| 工具 | 作用 |
|---|---|
| `flow.plan` | 提交整张 DAG，并启动所有能同波跑的步骤。立刻返回。节点可声明 `writeScope`。 |
| `flow.status` | 读图：状态 + 已完成节点的完整产出（可选 `nodeId` 只看一个节点）。 |
| `flow.next` | 验收通过后，放行下一波就绪步骤。Host 不会自动往下走。 |
| `flow.expand` | 把一个节点拆成子任务。运行中的子代理或 Leader 都可以调用。 |
| `flow.confirm` | 按需请求人工确认。Leader 或运行中的子代理可调用；调用后停手。 |
| `flow.patch` | 改图：`retry` / `skip` / `cancel` / `add` / `remove`。 |
| `flow.clear` | 取消所有在跑的子 Agent 并丢弃计划。 |

这些工具都要求 Flow 模式已开启，否则返回「请先 `/flow`」。

`flow.plan` 会在派发前校验：重复 id、悬空依赖、自依赖、环 —— 任何一项都会带着具体原因
被拒，而不是跑一半才崩。

如果 `flow.next` 报「deferred for write-scope conflicts」，说明有节点作用域重叠、或压根
没声明。那通常是**规划问题**（把工作切到互不重叠的目录即可），不是调度器的限制。

## 界面

- **Flow 标签页**：和 Chat 并列的独立视图。节点按拓扑深度分列，状态用颜色区分，
  边跟随上游节点状态（运行中会流动）。
- **节点上的作用域徽章**：`只读 / 写作用域 … / 独占`，一眼看出为什么某步能并行、
  另一部不能。
- **标题栏的并发上限**：可直接调（1–8）；旁边标注「实际并行度还受 writeScope 约束」。
- **对话进度窗**：Flow 模式且已有计划时，Chat 对话区右下角显示可关闭的流程图预览
  （当前步骤居中）。点击打开 Flow 标签；手动关闭后，直到计划标题/身份变化或退出
  Flow 模式才会再出现。切到 Flow 标签会自动隐藏。
- **点节点**：右侧栏显示完整任务简报、产出摘要、失败原因、子 Agent session id，
  以及「重试 / 跳过 / 停止」。只有请求了人工确认时，顶部才会出现确认条。
- **降级提示**：拿不到 subagent service 时，图照常显示，但顶部会说明不会派发。

## 设计说明

**为什么不监听 `subagent/end` 事件？**
那个事件是按 delegating parent 的作用域分发的，插件级 listener 未必收得到。编排器改为
自己握着 `subagents.start()` 返回的 `run.result` Promise —— 它无论如何都会 settle，
是唯一可靠的状态来源。

**为什么每个节点 settle 都要叫醒 Leader？**
下一波不会自动开始。Leader 必须看完产出再 `flow.next`（或 `flow.patch`）。所以一轮
用户任务会按「规划 → 第 1 波验收 → 第 2 波验收 → … → 总结」推进，而不是一次全部铺开
再最后汇总。

一波里能同时跑几个由**写作用域**决定（见上文「并行与写作用域」）：声明了互不重叠
作用域的节点同波并行，未声明的节点独占运行。并发上限只是天花板，不承诺并行度 ——
所以不声明作用域的计划行为与从前一致：一次一步。

**`flow.status` 会不会截断？**
会，但是给画布和给模型是两套上限。Host 会保存每个子 Agent 的完整产出（安全上限
20 万字符）。画布摘要约 2000 字；`flow.status` 整图每个节点约 1.2 万、整份约 4.8 万；
带 `nodeId` 时单节点约 8 万。需要全文时对那个节点再调一次 `flow.status`。

**为什么画布不做拖拽改拓扑？**
拓扑的所有权在 Leader。两套编辑入口会互相打架，而 Leader 改图还能带上推理（为什么失败、
为什么改 prompt）。画布只保留不争抢所有权的局部操作。

**状态存在哪？**
Host 进程内存。插件卸载或进程重启即丢失 —— 图是"这一轮任务的形状"，不是长期资产。
需要跨重启保留时再引入 `storageDomain`。

## 开发

```sh
pnpm --filter @just-genius/dsh-flow build      # 构建两个半身
pnpm --filter @just-genius/dsh-flow typecheck  # 类型检查
pnpm --filter @just-genius/dsh-flow test       # 调度代数单测
pnpm --filter @just-genius/dsh-flow watch      # watch 模式
```

### 源码结构

| 文件 | 职责 |
|---|---|
| `src/shared.ts` | Host/Client 共享的 wire 词汇（必须是无损 JSON） |
| `src/types.ts` | Host-only 运行态（live Agent、`SubagentRun`、AbortController） |
| `src/mode.ts` | 会话级模式状态机：暂存 / 提交 / 取消切换（有单测） |
| `src/graph.ts` | 纯函数：校验、环检测、ready 集、拓扑分层（有单测） |
| `src/scope.ts` | 纯函数：写作用域归一化、重叠判定、同波可否并行（有单测） |
| `src/guard.ts` | 纯函数：给定作用域与该次工具调用，决定放行还是拒绝（有单测） |
| `src/orchestrator.ts` | 派发、结算、重调度、按波唤醒、作用域门控 |
| `src/wake-policy.ts` | 何时唤醒 Leader（有单测） |
| `src/policy.ts` | Leader 契约文案（仅在模式开启时注入） |
| `src/tools.ts` | `flow.plan` / `status` / `next` / `patch` / `clear` |
| `src/index.ts` | Host apply：注册工具 / 路由 / `/flow` 命令 / 两个工具守卫 |
| `src/client/` | React Flow 画布 + 节点卡 + 布局 + 轮询 |

### 一处构建约定

React Flow 的 `style.css` 不能在运行时 `require` —— 本仓库的 client 模块表只接受
React、React DOM 和声明过的 DSH client injection。构建时把它内联成一个带
`data-plugin-css` 标签的 `<style>`，和 `dshCssModules` 处理 `*.module.css` 的方式一致，
HMR receiver 也会同样清理它。见 `tsdown.client.config.ts`。

## 已知边界（原型）

- 图状态不持久化（见上）。
- 子 Agent 用一次性 run，不用 continuable —— 重试即新 run，没有追问/打断能力。
- 不支持画布拖拽改拓扑。
- 并发上限全局生效，不能按节点设。
- 写作用域是**声明式**的，保证范围是「DSH 文件工具及其 PTC 绑定」:
  - 不含 MCP 工具与其它进程外写入通道（无法分类，因此不拦截）。
  - 子 Agent 继承父会话的 cwd，所以没有文件系统级隔离；安全性来自调度串行化 +
    运行时门禁，两者都依赖模型如实声明作用域。声明范围写得比实际需要小时，越界写
    会被拒（安全方向）；写得过大时，会与更多节点冲突而被串行化（性能方向），
    不会造成数据覆盖。
