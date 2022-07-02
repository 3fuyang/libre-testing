# Libre Testing

Fwio

## 简介

同济大学软件学院 2022 软件测试课设，一个**自动化测试平台**。

**前端**：Vue 3 + TypeScript + Naive UI

**测试**：Vitest + Cypress

Online Demo（**在线体验**）: [Libre Testing](https://libretesting.xyz)

集成测试与系统测试使用的项目：[Flea Test](https://github.com/3fuyang/flea-test)

## 使用说明

### 平时练习

包含判断三角形类型、万年历问题、电信收费、电脑销售系统共四个题目。

**使用方法：**

+ **使用自带用例集:** 在右边栏选择**版本号**和**用例类型**后，点击"**开始测试**"按钮即可；
+ **上传用例集:** 注意，上传用例集功能要求用例集遵循一定的**格式**，具体可参考 `/public/testUsecases/*.csv`

### 项目测试

包括单元测试、集成测试（组件测试）和系统测试（E2E 测试），系统测试需要单独运行。

使用嵌入的 **Stackblitz** 窗口实时演示测试过程。

**注意：**

+ 单元测试与集成测试的嵌入窗口加载完毕后，如果 Preview (即视图)为空白的话，在嵌入窗口的 URL 中追加上 `/__vitest__/`。
+ 由于 Cypress 本身是一个桌面应用，系统测试需要在 IDE 的 Node 环境中运行，具体参见 [Flea Test](https://github.com/3fuyang/flea-test) 这个 repo。
+ 集成测试与系统测试使用的是同一个 repo，分别的启动命令应该是 `npm run test:unit` 和 `npm run test:e2e` ，如果结果不对，请手动在窗口终端运行对应脚本。

## 问题笔记

### 关于 StackBlitz 的嵌入

App 的项目测试页面中嵌入（embed）了托管在 StackBlitz 上的项目，但是会出现在开发模式运行正常，而生产模式（指部署到服务器上）无法使用 Node 环境（只能查看文件）的情况。

其原因是 StackBlitz 中 WebContainers 极大地依赖 [SharedArrayBuffer](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer) 这一 Web API，它是一个试验性的 API，而在大多数浏览器中，它是被禁用的。

推荐阅读这篇文章：[Cross-Browser support with Cross-Origin isolation](https://blog.stackblitz.com/posts/cross-browser-with-coop-coep/)

结论上来讲，StackBlitz 开发了 WebContainers 来实现 Web 应用内的在线 IDE，而其需要一个**安全上下文**（Secure Context），简单来说，就是顶级文档必须是通过 **HTTPS** 提供的。如果在一个 `ifame`中加载文档且其父文档不是通过 HTTPS 提供的，则其上下文就不被认为是安全上下文。而该项目没有使用 HTTPS 协议的条件，所以无法成功运行 WebContainers。

> Updated, 2022/6/19: 服务端已经支持 HTTPS 协议，该问题已经解决。

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
