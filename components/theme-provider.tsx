"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      // Follow the OS setting only; there is no theme switch. A fresh key ignores
      // choices saved by an earlier toggle under the default "theme" key.
      storageKey="wsp-theme-system"
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
