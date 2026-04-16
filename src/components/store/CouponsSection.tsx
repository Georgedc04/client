import { Badge } from "@/components/ui/badge"
import { TicketPercent, Copy, Check } from "lucide-react"
import { useState, useEffect } from "react"

interface Coupon {
  _id: string
  code: string
  percentage: number
  expiresAt?: string
}

interface CouponsSectionProps {
  coupons: Coupon[]
}

export function CouponsSection({ coupons }: CouponsSectionProps) {
  if (!coupons?.length) return null

  return (
    <section className="rounded-[3rem] bg-primary/3 border border-primary/5 p-12">
      
      {/* Header */}
      <div className="mb-10 space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary/80">
          Exclusive Offers
        </p>
        <h2 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Save on your next order
        </h2>
      </div>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {coupons.slice(0, 4).map((coupon) => (
          <CouponCard key={coupon._id} coupon={coupon} />
        ))}
      </div>
    </section>
  )
}

function CouponCard({ coupon }: { coupon: Coupon }) {
  const [copied, setCopied] = useState(false)
  const [timeLeft, setTimeLeft] = useState<string | null>(null)

  // ✅ Copy logic
  const handleCopy = () => {
    navigator.clipboard.writeText(coupon.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  // ✅ Timer (safe)
  useEffect(() => {
    if (!coupon.expiresAt) return

    const update = () => {
      const now = new Date().getTime()
      const target = new Date(coupon.expiresAt!).getTime()
      const diff = target - now

      if (diff <= 0) {
        setTimeLeft("Expired")
        return
      }

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const mins = Math.floor((diff / (1000 * 60)) % 60)

      setTimeLeft(`${hours}h ${mins}m left`)
    }

    update() // initial
    const interval = setInterval(update, 60000)

    return () => clearInterval(interval)
  }, [coupon.expiresAt])

  return (
    <div className="group relative overflow-hidden rounded-4xl border border-dashed border-primary/30 bg-background p-8 transition-all hover:border-primary">
      
      {/* Icon */}
      <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
        <TicketPercent className="size-6" />
      </div>

      {/* Discount */}
      <Badge variant="secondary" className="bg-primary/10 text-primary mb-4">
        {coupon.percentage}% DISCOUNT
      </Badge>

      {/* Code + Copy */}
      <div className="space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Coupon Code
        </p>

        <div className="flex items-center justify-between">
          <p className="text-xl font-black tracking-tighter text-primary">
            {coupon.code}
          </p>

          <button
            onClick={handleCopy}
            className="p-2 rounded-lg hover:bg-primary/10 transition"
          >
            {copied ? (
              <Check className="size-4 text-green-500" />
            ) : (
              <Copy className="size-4 text-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Timer */}
      {timeLeft && (
        <p className="mt-3 text-xs text-muted-foreground">
          {timeLeft}
        </p>
      )}
    </div>
  )
}