# Libre Testing

## 简介

同济大学软件学院 2022 软件测试课设，一个**自动化测试平台**。

- **Web UI**：[Vue 3](https://vuejs.org/) + [Naive UI](https://www.naiveui.com/)
- **Testing**：[TypeScript](https://www.typescriptlang.org/) (Static Check) + [Vitest](https://vitest.dev/) (Unit & Integration Testing) + [Cypress](https://www.cypress.io/) (E2E Testing)

## Online Demo（**在线体验**）

Deployed with [Vercel](https://vercel.com/):

- V1 - [Libre Testing](https://libre-testing.vercel.app)
- V2(WIP) - [Libre Testing V2](https://libre-testing-git-v2-3fuyangs-projects.vercel.app/)

> [!NOTE]
> 集成测试与系统测试使用的项目：[Flea Test](https://github.com/3fuyang/flea-test)

## 使用说明

### How to Run

Make sure [Node.js (`>20.x.x`)](https://nodejs.org/en) is available on your device.

```bash
# Enable package manager
# Note: This could be changed since `corepack` is scheduled to be removed from node in the future
corepack enable

# Install dependencies
pnpm i

# Run dev server
pnpm dev

# Build
pnpm build
```

### 平时练习

包含判断三角形类型、万年历问题、电信收费、电脑销售系统共四个题目。

**使用方法：**

+ **使用自带用例集**：在右边栏选择**版本号**和**用例类型**后，点击"**开始测试**"按钮即可；
+ **上传用例集**：注意，上传用例集功能要求用例集遵循一定的**格式**，具体可参考 `/public/testUsecases/*.csv`

### 项目测试

包括单元测试、集成测试（组件测试）和系统测试（E2E 测试），系统测试需要单独运行。

使用嵌入的 **Stackblitz** 窗口实时演示测试过程。

> [!IMPORTANT]
> + 单元测试与集成测试的嵌入窗口加载完毕后，如果 Preview (即视图)为空白，需在嵌入窗口的 URL 中追加上 `/__vitest__/`。
> + 由于 Cypress 本身是一个桌面应用，系统测试需要在 Node 环境中运行，具体参见 [Flea Test](https://github.com/3fuyang/flea-test)。
> + 集成测试与系统测试使用的是同一个 repo，分别的启动命令应该是 `npm run test:unit` 和 `npm run test:e2e` ，若结果不符预期，请手动在窗口终端运行对应 script。

## Notes

### The Embedding of StackBlitz

App 的"项目测试"页面中嵌入（embed）了托管在 StackBlitz 上的项目，但是会出现在开发模式（Dev Server）运行正常，而生产模式（指部署到服务器上）无法使用 Node 环境（只能查看文件）的情况。

这是由于 StackBlitz 所实现的 WebContainers 极大程度地依赖于 [SharedArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer) 这一 Experimental Web API，而在大多数浏览器中，它是被禁用的。

Reference：[Cross-Browser support with Cross-Origin isolation](https://blog.stackblitz.com/posts/cross-browser-with-coop-coep/)

总的来说，StackBlitz 开发了 WebContainers 来实现 Web 应用内的在线 IDE，而其需要一个**安全上下文**（Secure Context），简单来说，即顶级文档必须是经由 **HTTPS** 所提供的。如果在一个 `iframe` 中加载文档且其父文档不是通过 HTTPS 提供的，则其上下文就不被认为是安全上下文。没有使用 HTTPS 协议的条件，便无法成功运行 WebContainers。

> Updated, 2022/6/19: 服务端已经支持 HTTPS 协议，该问题已经解决。

## One More Thing

Best wishes.
