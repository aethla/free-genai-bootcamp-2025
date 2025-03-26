import * as React from "react"
import { useLocation, Link } from "react-router-dom"
import { WholeWord, Group, Home, Hourglass, BookOpenText, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { LanguageSelector } from "./language-selector"
import { useLanguage } from "@/context/LanguageContext"

const navItems = [
  { icon: Home, name: 'Dashboard', path: '/dashboard' },
  { icon: BookOpenText, name: 'Study Activities', path: '/study-activities' },
  { icon: WholeWord, name: 'Words', path: '/words' },
  { icon: Group, name: 'Word Groups', path: '/groups' },
  { icon: Hourglass, name: 'Sessions', path: '/sessions' },
  { icon: Settings, name: 'Settings', path: '/settings' },
]

const languages = [
  { code: 'japanese', name: 'Japanese', nativeName: '日本語' },
  { code: 'arabic', name: 'Arabic', nativeName: 'العربية' }
] 

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation()
  const { language, setLanguage } = useLanguage()
  
  const isActive = (path: string) => {
    // Handle root path
    if (path === '/dashboard' && location.pathname === '/') return true
    // Handle nested routes by checking if the current path starts with the nav item path
    return location.pathname.startsWith(path)
  }
  
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        LangPortal
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <LanguageSelector 
              languages={languages}
              defaultLanguage={language}
              onLanguageChange={(langCode) => {
                setLanguage(langCode as 'japanese' | 'arabic')
              }}
            />
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={isActive(item.path)}>
                    <Link to={item.path}>
                      <item.icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
