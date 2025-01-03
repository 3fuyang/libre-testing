# Libre Testing v2

This is a rewrite of the original [Libre Testing](https://github.com/3fuyang/libre-testing) project using modern React technologies, aiming for better illustration of how a **modern static SPA** looks like for learning purposes.

For direct showcases, see [website](https://v2.libretesting.xyz).

## Stack

- Framework: [React 19](https://react.dev) + [Tanstack Start](https://tanstack.com/start/latest)
- State Management: [Jotai](https://jotai.org)
- UI: [Shadcn/UI](https://ui.shadcn.com) + [Tailwind CSS](https://tailwindcss.com)
- Hosting: [Vercel](https://vercel.com)(Origin Server) + [Cloudflare](https://www.cloudflare.com)(Reverse Proxy)
- Analytics: [Google Analytics](https://analytics.google.com)
- Misc: [React Compiler](https://react.dev/learn/react-compiler), [Canvas Confetti](https://github.com/catdad/canvas-confetti), [Partytown](https://partytown.builder.io)

## TODOs

- [x] Spawn workers for each running test so the UI keeps always responsive
- [x] Breadcrumb with Route context
- [ ] Encapsulate panel components to be easily composed but keep them flexible
- [ ] Performance - Best balance between FP and first impression
- [x] Subdomain deployment
