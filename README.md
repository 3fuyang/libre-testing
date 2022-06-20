# software-testing

Fwio

## 关于 StackBlitz 的嵌入

本项目的“单元测试”页面中嵌入（embed）了 StackBlitz 的项目，但是会出现在开发模式运行正常，而生产模式（指部署到服务器上）无法使用 Node 环境（只能查看文件）的情况。

其原因是 StackBlitz 中 WebContainers 极大地依赖 [SharedArrayBuffer](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer) 这一 Web API，它是一个试验性的 API，而在大多数浏览器中，它是被禁用的。

推荐阅读这篇文章：[Cross-Browser support with Cross-Origin isolation](https://blog.stackblitz.com/posts/cross-browser-with-coop-coep/)

结论上来讲，StackBlitz 开发了 WebContainers 来实现 Web 应用内的在线 IDE，而其需要一个**安全上下文**（Secure Context），简单来说，就是顶级文档必须是通过 **HTTPS** 提供的。如果在一个 `ifame`中加载文档且其父文档不是通过 HTTPS 提供的，则其上下文就不被认为是安全上下文。而该项目没有使用 HTTPS 协议的条件，所以无法成功运行 WebContainers。

> Updated, 2022/6/19: 服务端已经支持 HTTPS 协议，该问题已经解决。

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

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
