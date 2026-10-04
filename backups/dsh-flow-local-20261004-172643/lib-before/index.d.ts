import { Context } from "@just-genius/dsh-plugin-runtime/host";
//#region src/index.d.ts
declare const name = "dsh-flow";
declare const inject: readonly ["systemPrompt", "tools", "webServer"];
declare function apply(ctx: Context): void;
//#endregion
export { apply, inject, name };