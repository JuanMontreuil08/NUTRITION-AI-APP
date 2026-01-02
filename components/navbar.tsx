/**
 * Navbar de navegación principal
 * Permite cambiar entre diferentes funcionalidades
 */

"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import ThemeToggle from "@/components/theme-toggle"

type Tab = "tracker" | "recipes" | "analyzer"

interface NavbarProps {
  activeTab?: Tab
  onTabChange?: (tab: Tab) => void
}

export default function Navbar({ activeTab = "tracker", onTabChange }: NavbarProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      router.push("/auth/login")
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const tabs: Array<{ id: Tab; label: string; icon: string }> = [
    { id: "tracker", label: "Nutrición", icon: "📊" },
    { id: "recipes", label: "Recetas", icon: "🍽️" },
    { id: "analyzer", label: "Analizador", icon: "🔍" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-b from-card to-card/95 border-b border-border/50 shadow-lg backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-2 sm:py-4">
        {/* Primera fila - Logo y acciones rápidas */}
        <div className="flex items-center justify-between gap-2 mb-2 sm:mb-0">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-1 sm:gap-2 group flex-shrink-0">
            <div className="relative">
              <span className="text-2xl sm:text-3xl font-bold gradient-text">🥗</span>
            </div>
            <span className="text-sm sm:text-lg lg:text-xl font-bold hidden sm:inline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              NutritionAI
            </span>
          </Link>

          {/* Acciones derecha - Responsive */}
          <div className="flex items-center gap-1 sm:gap-2 ml-auto flex-shrink-0">
            <ThemeToggle />
            <Button
              onClick={handleLogout}
              disabled={isLoading}
              variant="outline"
              size="sm"
              className="text-xs sm:text-sm px-2 sm:px-4"
            >
              {isLoading ? "⏳" : "🚪"}
              <span className="hidden sm:inline ml-1">Salir</span>
            </Button>
          </div>
        </div>

        {/* Segunda fila - Tabs (solo visible en SM+, escondido en móvil) */}
        <div className="hidden sm:flex items-center gap-2 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange?.(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg scale-105"
                  : "text-muted-foreground hover:text-foreground hover:bg-primary/10 dark:hover:bg-primary/20"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
