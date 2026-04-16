import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { formatPrice } from "@/lib/utils"

interface Product {
  _id: string
  title: string
  brand: string
  image: string
  price: number
  finalPrice: number
  salePercentage: number
}

interface RecentProductsSectionProps {
  products: Product[]
}

export function RecentProductsSection({ products }: RecentProductsSectionProps) {
  if (!products?.length) return null

  return (
    <section>
      
      {/* Header */}
      <div className="mb-10 space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary/80">
          New Arrivals
        </p>
        <h2 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Recently added items
        </h2>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {products.slice(0, 4).map((product) => (
          <Link
            key={product._id}
            to={`/collection/${product._id}`}
            className="group"
          >
            <Card className="h-full flex flex-col overflow-hidden rounded-[2.5rem] border-border/40 bg-card p-3 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
              
              {/* Image */}
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-[1.8rem] bg-muted/30">
                <img
                  src={product?.image || "/placeholder.png"}
                  alt={product?.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Quick View */}
                <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-black shadow-xl">
                    Quick View
                  </div>
                </div>
              </div>

              {/* Content */}
              <CardContent className="flex flex-1 flex-col justify-between p-5">
                
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    {product.brand}
                  </p>

                  <h3 className="line-clamp-2 text-sm font-medium leading-snug group-hover:text-primary transition-colors">
                    {product.title}
                  </h3>
                </div>

                {/* Price */}
                <div className="flex items-end justify-between pt-4">
                  
                  <div className="space-y-1">
                    <p className="text-lg font-bold tracking-tight">
                      {formatPrice(product.finalPrice)}
                    </p>

                    {product.salePercentage > 0 && (
                      <p className="text-xs text-muted-foreground line-through decoration-red-400/50">
                        {formatPrice(product.price)}
                      </p>
                    )}
                  </div>

                  {/* Arrow */}
                  <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <ArrowRight className="size-4" />
                  </div>

                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

    </section>
  )
}