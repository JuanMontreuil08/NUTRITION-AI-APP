"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import StatCard from "@/components/stat-card"

export default function ThemeShowcase() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold gradient-text mb-4">🎨 Showcase de Temas</h1>
          <p className="text-lg text-muted-foreground">
            Tema claro y oscuro completamente integrado con colores modernos: Púrpura, Naranja y Verde
          </p>
        </div>

        {/* Color Palette */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">Paleta de Colores</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <div className="w-full h-20 bg-primary rounded-lg shadow-lg" />
              <p className="text-sm font-semibold text-foreground">Primary</p>
              <p className="text-xs text-muted-foreground">#a855f7</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-20 bg-accent rounded-lg shadow-lg" />
              <p className="text-sm font-semibold text-foreground">Accent</p>
              <p className="text-xs text-muted-foreground">#ff6b35</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-20 bg-secondary rounded-lg shadow-lg" />
              <p className="text-sm font-semibold text-foreground">Secondary</p>
              <p className="text-xs text-muted-foreground">#22c55e</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-20 bg-card border border-border rounded-lg shadow-lg" />
              <p className="text-sm font-semibold text-foreground">Card</p>
              <p className="text-xs text-muted-foreground">Background</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-20 bg-muted rounded-lg shadow-lg" />
              <p className="text-sm font-semibold text-foreground">Muted</p>
              <p className="text-xs text-muted-foreground">Neutral</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">Botones</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Default</h3>
              <div className="space-y-2">
                <Button>Botón Default</Button>
                <Button size="lg">Botón Large</Button>
                <Button size="sm">Botón Small</Button>
              </div>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Outline</h3>
              <div className="space-y-2">
                <Button variant="outline">Botón Outline</Button>
                <Button variant="outline" size="lg">Botón Large</Button>
                <Button variant="outline" size="sm">Botón Small</Button>
              </div>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Ghost</h3>
              <div className="space-y-2">
                <Button variant="ghost">Botón Ghost</Button>
                <Button variant="ghost" size="lg">Botón Large</Button>
                <Button variant="ghost" size="sm">Botón Small</Button>
              </div>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Secondary</h3>
              <div className="space-y-2">
                <Button variant="secondary">Botón Secondary</Button>
                <Button variant="secondary" size="lg">Botón Large</Button>
                <Button variant="secondary" size="sm">Botón Small</Button>
              </div>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Destructive</h3>
              <div className="space-y-2">
                <Button variant="destructive">Botón Destructive</Button>
                <Button variant="destructive" size="lg">Botón Large</Button>
                <Button variant="destructive" size="sm">Botón Small</Button>
              </div>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Icons</h3>
              <div className="space-y-2 flex gap-2">
                <Button size="icon">🔔</Button>
                <Button size="icon-lg">⚙️</Button>
                <Button size="icon-sm">✨</Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">Tarjetas de Estadísticas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon="🔥"
              label="Calorías"
              value="2450"
              unit="kcal"
              color="primary"
              trend={{ value: 5, isPositive: true }}
            />
            <StatCard
              icon="💪"
              label="Proteína"
              value="125"
              unit="g"
              color="secondary"
              trend={{ value: 2, isPositive: false }}
            />
            <StatCard
              icon="🥕"
              label="Carbohidratos"
              value="320"
              unit="g"
              color="accent"
              trend={{ value: 8, isPositive: true }}
            />
            <StatCard
              icon="🧈"
              label="Grasas"
              value="78"
              unit="g"
              color="orange"
              trend={{ value: 1, isPositive: true }}
            />
          </div>
        </div>

        {/* Cards */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">Tarjetas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-8">
              <h3 className="text-xl font-bold text-foreground mb-2">Tarjeta Standard</h3>
              <p className="text-muted-foreground mb-4">
                Una tarjeta estándar con estilos modernos, gradientes y sombras mejoradas.
              </p>
              <Button>Acción</Button>
            </Card>
            <Card className="p-8 border-primary/40 bg-gradient-to-br from-primary/5 to-accent/5">
              <h3 className="text-xl font-bold text-foreground mb-2">Tarjeta Destacada</h3>
              <p className="text-muted-foreground mb-4">
                Una tarjeta con colores de gradiente sutil para destacar contenido importante.
              </p>
              <Button>Acción</Button>
            </Card>
          </div>
        </div>

        {/* Typography */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">Tipografía</h2>
          <Card className="p-8 space-y-4">
            <h1 className="text-5xl font-bold text-foreground">Encabezado H1 - 5xl</h1>
            <h2 className="text-4xl font-bold text-foreground">Encabezado H2 - 4xl</h2>
            <h3 className="text-3xl font-bold text-foreground">Encabezado H3 - 3xl</h3>
            <p className="text-lg text-foreground">Párrafo normal - lg</p>
            <p className="text-base text-muted-foreground">Texto muted - base</p>
            <p className="text-sm text-muted-foreground">Texto pequeño - sm</p>
            <p className="gradient-text text-2xl font-bold">Texto con gradiente</p>
          </Card>
        </div>

        {/* Animations */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">Animaciones</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-8 flex items-center justify-center">
              <div className="animate-slide-in-up text-4xl">📊 Slide In Up</div>
            </Card>
            <Card className="p-8 flex items-center justify-center">
              <div className="animate-fade-in-scale text-4xl">⭐ Fade In Scale</div>
            </Card>
            <Card className="p-8 flex items-center justify-center">
              <div className="animate-bounce-subtle text-4xl">🎈 Bounce</div>
            </Card>
          </div>
        </div>

        {/* Info */}
        <Card className="p-8 border-secondary/30 bg-gradient-to-r from-secondary/5 to-primary/5">
          <h3 className="text-xl font-bold text-foreground mb-2">✨ Características del Diseño</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>✅ Tema oscuro y claro completamente integrado</li>
            <li>✅ Colores modernos: Púrpura (#a855f7), Naranja (#ff6b35), Verde (#22c55e)</li>
            <li>✅ Componentes UI mejorados con gradientes y sombras</li>
            <li>✅ Botones con efectos hover y activos</li>
            <li>✅ Animaciones suaves (slide, fade, bounce, glow)</li>
            <li>✅ Completamente responsive para móvil y desktop</li>
            <li>✅ Soporte para dark mode automático</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
