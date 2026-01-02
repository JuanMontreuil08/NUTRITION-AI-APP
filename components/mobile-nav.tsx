"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

type Tab = "tracker" | "recipes" | "analyzer"

interface MobileNavProps {
  activeTab?: Tab
  onTabChange?: (tab: Tab) => void
}

export default function MobileNav({ activeTab = "tracker", onTabChange }: MobileNavProps) {
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
    { id: "analyzer", label: "Analizador", icon: "📸" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-gradient-to-t from-card to-card/95 border-t border-border/50 shadow-2xl backdrop-blur-sm">
      <div className="flex items-center justify-around px-2 py-3">
        {/* Tabs */}
        <div className="flex items-center justify-around flex-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange?.(tab.id)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground scale-110 shadow-lg"
                  : "text-muted-foreground"
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span className="text-xs font-semibold">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-muted-foreground hover:text-foreground transition-colors"
          title="Cerrar sesión"
        >
          <span className="text-xl">{isLoading ? "⏳" : "🚪"}</span>
          <span className="text-xs font-semibold">Salir</span>
        </button>
      </div>
    </div>
  )
}
