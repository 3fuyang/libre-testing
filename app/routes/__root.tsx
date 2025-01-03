import Layout from '@/components/layout'
import indexCss from '@/index.css?url'
import {
  createRootRoute,
  DefaultGlobalNotFound,
  Outlet,
  ScrollRestoration,
} from '@tanstack/react-router'
import { Meta, Scripts } from '@tanstack/start'
import { Provider } from 'jotai'
import { lazy, type PropsWithChildren } from 'react'

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null
  : lazy(() =>
      import('@tanstack/router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    )

const isProd = import.meta.env.PROD

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        lang: 'zh-CN',
      },
      {
        charSet: 'utf-8',
      },
      {
        name: 'description',
        content:
          'Streamline testing showcase with easy-to-use automatic testing web UI, thus making testing libre.',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Libre Testing',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: indexCss,
      },
      {
        rel: 'icon',
        href: '/favicon.webp',
      },
    ],
    scripts: [
      isProd
        ? undefined
        : {
            src: 'https://unpkg.com/react-scan/dist/auto.global.js',
            async: true,
          },
      isProd
        ? {
            type: 'text/partytown',
            src: 'https://www.googletagmanager.com/gtag/js?id=G-PD9F771L0T',
            async: true,
          }
        : undefined,
      isProd
        ? {
            dangerouslySetInnerHTML: {
              __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-PD9F771L0T');`,
            },
          }
        : undefined,
    ],
  }),
  component: RootComponent,
  notFoundComponent: DefaultGlobalNotFound,
})

function RootComponent() {
  return (
    <RootDocument>
      <Provider>
        <Layout>
          <Outlet />
        </Layout>
      </Provider>
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="zh-CN">
      <head>
        <Meta />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
