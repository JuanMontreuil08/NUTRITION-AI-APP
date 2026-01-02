"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ThemeToggle from "@/components/theme-toggle"

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-b from-background to-background/95 border-b border-primary/20 backdrop-blur-md">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl">🥗</span>
            <span className="text-xl sm:text-2xl font-bold gradient-text">NutritionAI</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <ThemeToggle />
            <Link href="/auth/login">
              <Button variant="ghost" className="text-sm sm:text-base">Iniciar Sesión</Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="text-sm sm:text-base">Comenzar</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 md:py-32">
        {/* Background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8 animate-slide-in-up">
              <div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
                  Tu nutrición,
                  <span className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                    optimizada.
                  </span>
                </h1>
              </div>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
                Rastrea tu nutrición diaria, obtén recomendaciones de recetas personalizadas y alcanza tus objetivos de salud con inteligencia artificial.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/signup">
                  <Button size="lg" className="w-full sm:w-auto text-base">
                    🚀 Comenzar a Rastrear
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base">
                  📖 Saber Más
                </Button>
              </div>
            </div>

            <div className="relative animate-fade-in-scale">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
              <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl h-80 sm:h-96 flex items-center justify-center border border-primary/20 backdrop-blur-sm">
                <div className="text-center space-y-4">
                  <div className="text-6xl sm:text-8xl">🥗</div>
                  <p className="text-foreground font-bold text-lg sm:text-xl">Descubrimiento Inteligente</p>
                  <p className="text-muted-foreground text-sm">Recetas personalizadas para ti</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">¿Por qué NutritionAI?</h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              Herramientas avanzadas para tu salud nutricional
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: "📊",
                title: "Rastreo en Tiempo Real",
                description: "Monitorea calorías, proteína y nutrientes durante el día",
              },
              {
                icon: "🤖",
                title: "Recetas IA",
                description: "Recomendaciones personalizadas basadas en tus preferencias",
              },
              {
                icon: "💡",
                title: "Análisis de Salud",
                description: "Visualiza datos nutricionales y toma decisiones informadas",
              },
              {
                icon: "📱",
                title: "Multimodal",
                description: "Analiza fotos, videos y documentos con IA",
              },
              {
                icon: "🎯",
                title: "Objetivos Personalizados",
                description: "Metas adaptadas a tu perfil y estilo de vida",
              },
              {
                icon: "📈",
                title: "Progreso Detallado",
                description: "Gráficos y estadísticas de tu evolución",
              },
            ].map((feature, i) => (
              <div 
                key={i} 
                className="bg-card rounded-2xl p-6 sm:p-8 border border-primary/20 hover:border-primary/50 hover:bg-gradient-to-br hover:from-primary/5 hover:to-accent/5 transition-all duration-300 hover:shadow-xl hover:scale-105 group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm sm:text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl p-8 sm:p-12 md:p-16 text-center">
            {/* Background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/50 to-accent opacity-90" />
            
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
                ¿Listo para optimizar tu nutrición?
              </h2>
              <p className="text-primary-foreground/90 mb-8 text-base sm:text-lg max-w-2xl mx-auto">
                Comienza a rastrear y descubre recetas que funcionan para ti.
              </p>
              <Link href="/auth/signup">
                <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-base">
                  Comienza Ahora 🚀
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
