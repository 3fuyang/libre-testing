# Libre Testing v2

This is a rewrite of the original [Libre Testing](https://github.com/3fuyang/libre-testing) project using modern React technologies, aiming for better illustration of how a **modern static SPA** looks like for learning purposes.

For direct showcases, see [website](https://v2.libretesting.xyz), which is hosted with [Vercel](https://vercel.com) and [Cloudflare](https://www.cloudflare.com)(as reverse proxy).

## Stack

- Framework: [React 19](https://react.dev) with [Tanstack Router](https://tanstack.com/router/latest)
- State Management: [Jotai](https://jotai.org)
- UI: [Shadcn/UI](https://ui.shadcn.com) with [Tailwind CSS](https://tailwindcss.com)
- Misc: [React Compiler](https://react.dev/learn/react-compiler)

## TODOs

- [x] Spawn workers for each running test so the UI keeps always responsive
- [x] Breadcrumb with Route context
- [ ] Encapsulate panel components to be easily composed but keep them flexible
- [ ] Site performance improvements - Best balance between FP and first impression
- [x] Subdomain deployment
