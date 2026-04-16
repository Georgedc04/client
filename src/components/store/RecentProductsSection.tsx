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
    <section className="py-8">
      {/* Header - Adjusted for Mobile */}
      <div className="mb-8 space-y-2 px-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-purple-600">
          New Arrivals
        </p>
         <h2 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Recently Added
        </h2>
      </div>

      {/* Products Grid: 2 columns on mobile (grid-cols-2), 4 on desktop */}
      <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
        {products.slice(0, 4).map((product) => (
          <Link
            key={product._id}
            to={`/collection/${product._id}`}
            className="group"
          >
            <Card className="h-full flex flex-col overflow-hidden rounded-t-4xl rounded-bl-4xl border-none bg-white p-1.5 transition-all duration-500 hover:shadow-xl sm:p-3">
              
              {/* Image Container with Petal Shape */}
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-t-[1.6rem] rounded-bl-[1.6rem] bg-slate-100">
                <img
                  src={product?.image || "/placeholder.png"}
                  alt={product?.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Smaller Sale Tag for Mobile */}
                {product.salePercentage > 0 && (
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full shadow-sm sm:top-4 sm:left-4">
                    <p className="text-[9px] font-bold text-purple-600">-{product.salePercentage}%</p>
                  </div>
                )}
              </div>

              {/* Content - Compact for Mobile */}
              <CardContent className="flex flex-1 flex-col justify-between p-2 sm:p-4">
                <div className="space-y-1">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-purple-500/80 sm:text-[10px]">
                    {product.brand}
                  </p>
                  <h3 className="line-clamp-2 text-xs font-medium leading-snug text-slate-800 group-hover:text-purple-700 transition-colors sm:text-sm">
                    {product.title}
                  </h3>
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between pt-3 sm:pt-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900 sm:text-lg">
                      {formatPrice(product.finalPrice)}
                    </span>
                   {product.salePercentage > 0 && (
                      <span className="text-[10px] text-slate-600 line-through decoration-red-500/70 sm:text-xs">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>

                  {/* Smaller Arrow for Mobile */}
                  <div className="size-7 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 transition-all duration-300 group-hover:bg-slate-900 group-hover:text-white sm:size-9">
                    <ArrowRight className="size-3.5 sm:size-4" />
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