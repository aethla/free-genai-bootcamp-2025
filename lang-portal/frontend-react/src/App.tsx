import { ThemeProvider } from "@/components/theme-provider"
import { BrowserRouter as Router } from 'react-router-dom'
import AppSidebar from '@/components/Sidebar'
import Breadcrumbs from '@/components/Breadcrumbs'
import AppRouter from '@/components/AppRouter'
import { NavigationProvider } from '@/context/NavigationContext'
import { LanguageProvider } from "@/context/LanguageContext"


import {
  SidebarInset,
  SidebarProvider
} from "@/components/ui/sidebar"

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <LanguageProvider>
        <NavigationProvider>
          <Router>
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                <Breadcrumbs />
                <AppRouter />
              </SidebarInset>
            </SidebarProvider>  
          </Router>
        </NavigationProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}