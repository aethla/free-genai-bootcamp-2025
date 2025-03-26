import * as React from "react"
import { Check, ChevronsUpDown, Globe } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

interface Language {
  code: string
  name: string
  nativeName: string
}

interface LanguageSelectorProps {
  languages: Language[]
  defaultLanguage?: string
  onLanguageChange?: (languageCode: string) => void
}

export function LanguageSelector({
  languages,
  defaultLanguage,
  onLanguageChange,
}: LanguageSelectorProps) {
  const context = useLanguage()
  
  const [selectedLanguage, setSelectedLanguage] = React.useState(
    languages.find(lang => lang.code === (defaultLanguage || context.language)) || languages[0]
  )

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language)
    onLanguageChange?.(language.code)
    context.setLanguage(language.code as 'japanese' | 'arabic')
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton>
              <Globe />
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">{selectedLanguage.name}</span>
                <span className="text-xs text-muted-foreground">
                  {selectedLanguage.nativeName}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width]"
            align="start"
          >
            {languages.map((language) => (
              <DropdownMenuItem
                key={language.code}
                onSelect={() => handleLanguageSelect(language)}
              >
                <span className="flex-1">
                  {language.name}
                  <span className="ml-2 text-xs text-muted-foreground">
                    ({language.nativeName})
                  </span>
                </span>
                {language.code === selectedLanguage.code && (
                  <Check className="ml-2" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}