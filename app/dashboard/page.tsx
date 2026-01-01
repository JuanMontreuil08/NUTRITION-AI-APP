"use client"
import { useState } from "react"
import NutritionTracker from "@/components/nutrition-tracker"
import RecipeDiscovery from "@/components/recipe-discovery"
import Navbar from "@/components/navbar"
import MobileNav from "@/components/mobile-nav"
import { Card } from "@/components/ui/card"

type Tab = "tracker" | "recipes" | "analyzer"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("tracker")

  return (
    <div className="min-h-screen bg-background pb-24 sm:pb-0">
      {/* Desktop Navbar */}
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Welcome Section */}
        <div className="mb-8 sm:mb-12 animate-slide-in-up">
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-bold gradient-text">
              ¡Bienvenido!
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
              {activeTab === "tracker" && "🎯 Rastrea tu nutrición diaria y mantén tus objetivos de salud"}
              {activeTab === "recipes" && "🍽️ Descubre recetas deliciosas y personalizadas"}
              {activeTab === "analyzer" && "📸 Analiza contenido multimodal (imágenes, videos, PDFs)"}
            </p>
          </div>
        </div>

        {/* Nutrition Tracker Section */}
        {activeTab === "tracker" && (
          <section className="animate-fade-in-scale">
            <NutritionTracker />
          </section>
        )}

        {/* Recipe Discovery Section */}
        {activeTab === "recipes" && (
          <section className="animate-fade-in-scale">
            <RecipeDiscovery />
          </section>
        )}

        {/* Analyzer Section */}
        {activeTab === "analyzer" && (
          <section className="animate-fade-in-scale">
            <Card className="p-6 sm:p-8 border-border/50 bg-gradient-to-br from-primary/10 to-accent/10">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
                    <span>📸</span> Analizador Multimodal
                  </h2>
                  <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                    Analiza imágenes, videos y PDFs con inteligencia artificial para obtener insights nutricionales.
                  </p>
                </div>
                
                {/* Analyzer Component */}
                <NutritionTracker showOnlyAnalyzer={true} />
              </div>
            </Card>
          </section>
        )}
      </main>

      {/* Mobile Navigation */}
      <MobileNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
