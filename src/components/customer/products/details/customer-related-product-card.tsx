import { Card, CardContent } from "@/components/ui/card";
import {
  extractSalePrice,
  getCoverImage,
} from "@/features/customer/products/product-list.shared";
import type { CustomerProduct } from "@/features/customer/products/types";
import { formatPrice } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

/**
 * ART DESIGN SYSTEM:
 * Asymmetric rounding, editorial spacing, and brand-consistent colors.
 */
const STYLES = {
  // Matching the Petal shape from the logo and main product card
  card: "group overflow-hidden border-none bg-white transition-all duration-500 hover:shadow-xl hover:shadow-purple-100 rounded-t-[2rem] rounded-bl-[2rem]",
  imageWrap: "relative aspect-square bg-slate-50 overflow-hidden rounded-t-[1.8rem] rounded-bl-[1.8rem] m-1.5", 
  image: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-110",
  content: "space-y-2 p-4 pt-2",
  brand: "text-[10px] font-bold uppercase tracking-[0.2em] text-purple-500/80",
  title: "line-clamp-1 text-sm font-medium text-slate-800 transition-colors group-hover:text-purple-700",
  priceRow: "flex items-baseline gap-2 pt-1",
  salePrice: "text-base font-bold text-slate-900",
  originalPrice: "text-xs text-slate-400 line-through decoration-red-500/50",
  badge: "absolute top-3 left-3 bg-white/90 backdrop-blur-md text-purple-600 text-[9px] font-bold px-2 py-1 rounded-full shadow-sm ring-1 ring-purple-50"
};

type CustomerProductRelatedCardProps = {
  product: CustomerProduct;
};

function CustomerProductRelatedCard({
  product,
}: CustomerProductRelatedCardProps) {
  const coverImage = getCoverImage(product);
  const salePrice = extractSalePrice(product);
  const hasSale = product.salePercentage > 0;

  return (
    <Card className={STYLES.card}>
      <Link to={`/collection/${product._id}`} className="block">
        <div className={STYLES.imageWrap}>
          {hasSale && (
             <div className={STYLES.badge}>
               -{product.salePercentage}%
             </div>
          )}
          
          {coverImage ? (
            <img 
              src={coverImage} 
              alt={product.title} 
              className={STYLES.image} 
              loading="lazy" 
            />
          ) : (
            <div className="flex h-full items-center justify-center text-[10px] text-slate-300 uppercase tracking-widest">
              No Image
            </div>
          )}
        </div>

        <CardContent className={STYLES.content}>
          <div className="space-y-0.5">
            <p className={STYLES.brand}>
              {product.brand}
            </p>
            <h3 className={STYLES.title}>
              {product.title}
            </h3>
          </div>

          {/* Boutique Style Rating */}
          <div className="flex items-center gap-1 opacity-70">
            <Star className="size-3 fill-amber-400 text-amber-400" />
            <span className="text-[11px] font-medium text-slate-500">4.8</span>
          </div>

          <div className={STYLES.priceRow}>
            <span className={STYLES.salePrice}>{formatPrice(salePrice)}</span>
            {hasSale && (
              <span className={STYLES.originalPrice}>
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          
          {/* Subtle Tagline */}
          <p className="text-[10px] font-medium text-slate-400 uppercase tracking-tight pt-1">
            Artisan Quality
          </p>
        </CardContent>
      </Link>
    </Card>
  );
}

export default CustomerProductRelatedCard;