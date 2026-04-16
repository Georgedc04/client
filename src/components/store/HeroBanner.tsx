import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { ArrowRight, ChevronRight } from "lucide-react"

interface Banner {
  _id: string
  imageUrl: string
  title?: string
  link?: string
  subtitle?: string
}

interface HeroBannerProps {
  banners: Banner[]
}

export function HeroBanner({ banners }: HeroBannerProps) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!banners.length) return
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length)
    }, 5000) // 5 Second rotation
    return () => clearInterval(interval)
  }, [banners.length])

  const getIndex = (offset: number) => (current + offset) % banners.length

  return (
    <section className="relative py-8" aria-label="Featured Promotions">
      <div className="grid gap-8 lg:grid-cols-[1.8fr_1fr]">
        
        {/* MAIN SLIDER SECTION */}
        <div className="relative group overflow-hidden rounded-t-[4rem] rounded-bl-[4rem] h-135 shadow-2xl bg-slate-900">
          {banners.map((banner, index) => (
            <Link
              key={banner._id}
              to={banner.link || "/collections"}
              className={`absolute inset-0 transition-all duration-[1500px] ease-in-out ${
                index === current ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0"
              }`}
            >
              {/* Ken Burns Image Effect */}
              <img
                src={banner.imageUrl || "/placeholder.png"}
                alt={banner.title}
                className={`h-full w-full object-cover transition-transform duration-6000 ${
                  index === current ? "scale-110" : "scale-100"
                }`}
              />
              
              {/* Artistic Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Animated Content */}
              <div className="absolute bottom-12 left-12 right-12 text-white">
                <div className={`transition-all duration-700 delay-300 transform ${
                  index === current ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}>
                  <p className="text-purple-400 font-bold uppercase tracking-[0.3em] text-xs mb-3">
                    {banner.subtitle || "Limited Edition"}
                  </p>
                  <h2 className="text-5xl font-bold mb-6 max-w-md leading-tight italic">
                    {banner.title}
                  </h2>
                  <div className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-purple-600 hover:text-white transition-colors group/btn">
                    Shop Now
                    <ArrowRight className="size-4 group-hover/btn:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {/* Advanced Visual Timer (Progress Ring) */}
          <div className="absolute top-8 right-8 z-20 flex items-center gap-4">
             <div className="flex gap-2">
                {banners.map((_, i) => (
                  <div 
                    key={i}
                    className={`h-1 transition-all duration-500 rounded-full ${
                      i === current ? "w-8 bg-purple-500" : "w-2 bg-white/30"
                    }`}
                  />
                ))}
             </div>
          </div>
        </div>

        {/* SIDE PREVIEWS SECTION */}
        <div className="flex flex-col gap-6">
          {[1, 2].map((offset) => {
            const idx = getIndex(offset);
            const sideBanner = banners[idx];
            return (
              <div 
                key={`${idx}-${offset}`}
                className="relative flex-1 overflow-hidden rounded-t-4xl rounded-bl-4xl bg-slate-200 group cursor-pointer shadow-lg"
              >
                <img
                  src={sideBanner?.imageUrl || "/placeholder.png"}
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-purple-900/40 transition-colors duration-500" />
                
                <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-300 mb-1">
                      Up Next
                    </span>
                    <h3 className="text-xl font-bold truncate leading-tight italic">
                      {sideBanner?.title}
                    </h3>
                </div>
                
                <div className="absolute top-4 right-4 size-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <ChevronRight className="text-white size-5" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}