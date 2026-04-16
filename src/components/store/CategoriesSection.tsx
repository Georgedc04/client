import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Grid2X2, ArrowRight, Sparkles } from "lucide-react"

interface Category {
  _id: string
  name: string
}

interface CategoriesSectionProps {
  categories: Category[]
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  if (!categories?.length) return null

  return (
    <section>
      
      {/* Header */}
      <div className="mb-10 space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary/80 flex items-center gap-2">
          <Sparkles className="size-3" /> Categories
        </p>
        <h2 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Browse by collection
        </h2>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {categories.slice(0, 4).map((category) => (
          <Link
            to={`/collections?category=${category._id}`}
            key={category._id}
            className="group relative h-full"
          >
            <Card className="h-full overflow-hidden rounded-4xl border-border/40 bg-card p-1.5 transition-all duration-500 group-hover:-translate-y-2 group-hover:border-primary/30 group-hover:shadow-2xl">
              
              <CardContent className="flex h-full flex-col justify-between space-y-8 rounded-[1.6rem] bg-linear-to-br from-background to-muted/50 p-8">
                
                {/* Icon */}
                <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/5 text-primary ring-1 ring-primary/10 transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary/10">
                  <Grid2X2 className="size-6" />
                </div>

                {/* Text */}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold tracking-tight">
                    {category.name}
                  </h3>

                  <span className="inline-flex items-center gap-2 text-sm font-bold text-primary">
                    Explore
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>

              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}