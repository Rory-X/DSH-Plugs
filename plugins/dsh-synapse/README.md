<h1 align="center">dsh-synapse</h1>

<p align="center">DeepSeek Harness 的可视化对话工作台</p>

<p align="center">
  <a href="https://www.npmjs.com/package/dsh-synapse"><img src="https://img.shields.io/npm/v/dsh-synapse?style=flat-square&logo=npm&label=npm" alt="npm version"></a>
  <a href="https://github.com/liangmianya/dsh-synapse/actions/workflows/main-tests.yml"><img src="https://github.com/liangmianya/dsh-synapse/actions/workflows/main-tests.yml/badge.svg?branch=main&style=flat-square" alt="Main branch tests"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-10b981?style=flat-square" alt="MIT license"></a>
  <a href="package.json"><img src="https://img.shields.io/node/v/dsh-synapse?style=flat-square&logo=node.js&label=node" alt="Node.js version"></a>
</p>

<p align="center">
  <a href="docs/zh-CN/README.md">中文指南</a> ·
  <a href="docs/en/README.md">English guide</a> ·
  <a href="https://www.npmjs.com/package/dsh-synapse">npm</a> ·
  <a href="docs/development.md">开发与发布</a>
</p>

把同一工作区中的会话、追问和分支组织成一张可浏览、可拖拽、可缩放的地图，同时保留 DSH 原生会话作为唯一事实来源。

![Synapse 会话地图：链条、分支和右侧详情](docs/images/synapse-map.jpg)

## 快速安装

需要支持 profile 插件机制的 DeepSeek Harness、Node.js `>= 22.19.0`，以及 `web` profile。

```powershell
corepack pnpm dsh plugin --profile web add dsh-synapse
corepack pnpm dsh web
```

启动后，在 DSH 顶部切换到 **会话地图**。Synapse 复用现有的 DSH Web Server，不会启动第二个应用或代理系统。

## 官方桌面端的本地构建

官方桌面端使用独立的 `desktop` profile；它不会自动读取 `web` profile 的插件列表。桌面端的页面仍使用 `web` 客户端，因此不要把 manifest 中的 `dsh.client.platform` 改成 `desktop`。

在本仓库根目录，使用 Node.js `>= 22.19.0` 执行：

```powershell
pnpm --filter dsh-synapse run test:desktop
```

`plugins/dsh-synapse/lib/desktop/` 是完整的独立插件包，包含服务端入口、编译后的客户端以及同目录静态资源。构建会内联所需的共享 runtime 代码，移除 monorepo 的 `workspace:*` 依赖，不会把旧版官方内核一起安装到桌面端。原有 Web 构建命令保持可用。

安装时，将整个独立包复制到稳定目录，例如 `$DSH_HOME/plugins/synapse-desktop/`。在官方桌面端打开 **插件 → 添加插件**，输入该目录的绝对路径，安装成功后点击 **立即启用**。桌面端会管理本地目录链接和 `desktop` profile 的 bundle 注册；已验证可在运行中启用，无需退出应用。安装前仍建议备份 profile 和 Synapse 布局数据。

不要直接链接 `lib/desktop/`，因为后续 Web 构建会清理 `lib/`。官方 `desktop` profile 是保留 profile，普通 `dsh plugin --profile desktop` 命令不能管理它，应使用桌面端自己的插件管理页。

已核对官方桌面端 `0.1.7-rc.2`：服务端会话事件、`conversation.view` 页面挂载，以及 `/synapse/` 下的同源静态资源路由。Synapse 默认继续使用 `$DSH_HOME/synapse/workspaces.json` 保存布局；迁移不复制或改写原生会话。两个运行实例同时使用这一布局文件时没有跨进程写入锁，建议退出旧实例后再打开新实例。

停用或卸载时，使用桌面端插件管理页中 `dsh-synapse` 的相应操作；保留 `synapse/workspaces.json` 可保留地图布局。若必须手工回退，先退出桌面端，仅移除 `desktop/package.json` 中的 `dsh-synapse` 依赖与 bundle，以及对应目录链接，不要覆盖其他插件和模型配置。

## 它解决什么问题

| 能力 | 说明 |
|---|---|
| 对话地图 | 把连续追问、分支和不同会话放到同一张可操作的画布上。 |
| 保留真实分支 | 按 DSH 原生 fork 关系连接卡片，不制造另一套会话历史。 |
| 追问更顺手 | 选中回答中的文字可直接带入新的追问；常用补充词可编辑。 |
| 双向同步 | 在地图或 DSH 原生对话中切换会话，当前上下文保持一致。 |

## 从原生对话进入

在 DSH 原生对话中，通过顶部的 **会话地图** 进入 Synapse；返回 **对话** 后，仍是同一个 DSH 会话。

地图只显示当前会话、从它 fork 出来的后代，以及它的父会话和祖先会话。加载期间不会混入同工作区的其他会话；选中分支时，也不会带入祖先的其他分支。未打开的祖先通过只读历史加载补齐，fork 继承的消息在祖先卡片中展示，分支只展示自身新增的消息和回复。

卡片的 **详情** 只在地图旁查看这一轮的内容，正在回复的内容会持续更新；查看其他分支的详情也会保留当前会话和地图位置。点击详情面板的 **在会话中打开** 才会切换到对应的原生对话。

详情中的代码块、脚注和流式 Markdown 使用原生渲染器。单条内容格式化失败时会显示原文，可点击 **重试**；详情加载失败也可单独重试，地图会保持打开。客户端兼容早期会话接口以及 `0.2.0-rc.2` 的会话引用生命周期。

卡片以原生会话中的真实提问和回复为依据。空会话、插件注入的上下文和独立运行错误不会生成卡片；真实提问的执行失败仍保留在对应卡片中。重新加载插件后，历史回放会修复旧投影缓存，并保留卡片布局。

![DSH 原生对话与会话地图入口](docs/images/native-webui.jpg)

## 文档

| 文档 | 内容 |
|---|---|
| [中文指南](docs/zh-CN/README.md) | 安装、启动、配置、使用、卸载和限制。 |
| [English guide](docs/en/README.md) | Installation, configuration, usage, cleanup, and limitations. |
| [开发与发布](docs/development.md) | 本地验证、GitHub Actions、版本标签和 npm 发布。 |
| [架构与边界](docs/architecture.md) | 会话归属、投影、数据存储和模型影响。 |

## 与 DSH 的边界

- DSH session log 保存真实会话内容；Synapse 只投影已提交的事件。
- Synapse 的画布布局数据保存在 `$DSH_HOME/synapse/`，删除它不会删除 DSH 会话。
- 插件不修改 prompt、模型请求、工具 schema、provider 路由或可复用 KV-cache 前缀。
- 内置 patch 复用 DSH Web Server，适用于 Web 客户端及官方桌面端。

## 开发

```powershell
corepack pnpm install --frozen-lockfile
corepack pnpm run build
corepack pnpm test
```

完整的贡献、CI/CD 和发布流程见[开发与发布指南](docs/development.md)。

## 许可证

[MIT](LICENSE)
