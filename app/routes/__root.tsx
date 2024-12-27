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

const TanStackRouterDevtools =
  import.meta.env.PROD
    ? () => null
    : lazy(() =>
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      )

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
        content: 'Streamline testing showcase with easy-to-use automatic testing web UI, thus making testing libre.',
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
      import.meta.env.PROD ? undefined : ({
        src: 'https://unpkg.com/react-scan/dist/auto.global.js',
        async: true,
      })
    ]
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
    <html>
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
