import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { Link } from '@tanstack/react-router'
import { ChevronRight, Gamepad, Paperclip, TestTube2 } from 'lucide-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible'

const items = [
  {
    title: '课程练习',
    icon: Gamepad,
    children: [
      {
        title: '判断三角形类型',
        url: '/homework/triangle-judge',
      },
      {
        title: '万年历问题',
        url: '/homework/calendar-problem',
      },
      {
        title: '电脑销售系统',
        url: '/homework/computer-selling',
      },
      {
        title: '电信收费系统',
        url: '/homework/telecom-system',
      },
    ],
  },
  {
    title: '期末项目',
    icon: Paperclip,
    children: [
      {
        title: '单元测试',
        url: '/final-project/unit-testing',
      },
      {
        title: '集成测试',
        url: '/final-project/integration-testing',
      },
      {
        title: '系统测试',
        url: '/final-project/system-testing',
      },
    ],
  },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Version />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => (
              <Collapsible
                key={item.title}
                title={item.title}
                defaultOpen
                asChild
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon className="mr-2" />}
                      {item.title}{' '}
                      <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.children.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <Link to={item.url} preload="viewport">
                              {item.title}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

function Version() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          asChild
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Link to="/">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <TestTube2 className="size-4" />
            </div>
            <div className="flex flex-col space-y-1 leading-none tracking-wide">
              <span className="font-semibold">Libre Testing</span>
              <span>v1.0.0</span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
