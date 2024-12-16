import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { useBreadcrumb } from '@/hooks/use-breadcrumb'
import { Link } from '@tanstack/react-router'
import { Laptop, MoonStar, Sun } from 'lucide-react'
import type { PropsWithChildren } from 'react'
import { useTernaryDarkMode, type TernaryDarkMode } from 'usehooks-ts'
import { AppSidebar } from './app-sidebar'
import { Flex } from './flex'
import { ThemeProvider } from './theme-provider'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Separator } from './ui/separator'
import { Toaster } from './ui/toaster'

export default function Layout({ children }: PropsWithChildren) {
  const breadcrumb = useBreadcrumb()

  return (
    <ThemeProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbLink asChild className="hidden md:block">
                  <Link to="/">Libre Testing</Link>
                </BreadcrumbLink>
                <BreadcrumbSeparator className="hidden md:block" />
                {breadcrumb.map((segment) => (
                  <BreadcrumbItem key={segment}>
                    <BreadcrumbPage>{segment}</BreadcrumbPage>
                  </BreadcrumbItem>
                ))}
              </BreadcrumbList>
            </Breadcrumb>

            <div className="ml-auto">
              <ThemeSwitch />
            </div>
          </header>

          <div className="min-h-[calc(100vh_-_4rem)] p-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
      <Toaster />
    </ThemeProvider>
  )
}

function ThemeSwitch() {
  const { isDarkMode, ternaryDarkMode, setTernaryDarkMode } =
    useTernaryDarkMode()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="block" aria-label="Theme Preference">
        <Flex align="center">
          {isDarkMode ? (
            <MoonStar className="size-5" />
          ) : (
            <Sun className="size-5" />
          )}
        </Flex>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={ternaryDarkMode}
          onValueChange={(value) =>
            setTernaryDarkMode(value as TernaryDarkMode)
          }
        >
          <DropdownMenuRadioItem value="light">
            <Sun className="mr-2 size-4" />
            Light
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">
            <MoonStar className="mr-2 size-4" />
            Dark
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">
            <Laptop className="mr-2 size-4" />
            System
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
