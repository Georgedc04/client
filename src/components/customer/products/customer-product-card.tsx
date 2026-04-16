import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Star, ShoppingBag } from "lucide-react";
import {
  extractSalePrice,
  getCoverImage,
  getSwatchColor,
} from "@/features/customer/products/product-list.shared";
import type { CustomerProduct } from "@/features/customer/products/types";
import { formatPrice, cn } from "@/lib/utils";
import { Link } from "react-router-dom";

type CustomerProductCardProps = {
  product: CustomerProduct;
  isWishlisted?: boolean;
  onWishlistToggle?: (e: React.MouseEvent) => void;
};

const STYLES = {
  // Artistic Petal Shape: Top-right and Bottom-left are rounded heavily
  card: "group relative flex h-full flex-col overflow-hidden border-none bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-purple-200/50 rounded-t-[2.5rem] rounded-bl-[2.5rem] p-2",
  imageWrap: "relative aspect-[4/5] w-full overflow-hidden bg-slate-50 rounded-t-[2.2rem] rounded-bl-[2.2rem]",
  image: "h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110",
  title: "line-clamp-2 text-sm font-medium leading-snug text-slate-800 transition-colors group-hover:text-purple-700",
  brand: "text-[10px] font-bold uppercase tracking-widest text-purple-500/80",
  price: "text-lg font-bold tracking-tight text-slate-900",
  strike: "text-xs text-slate-400 line-through decoration-red-500/60",
}

function CustomerProductCard({ product, isWishlisted, onWishlistToggle }: CustomerProductCardProps) {
  const coverImage = getCoverImage(product);
  const salePrice = extractSalePrice(product);
  const hasSale = product.salePercentage > 0;

  return (
    <Card className={STYLES.card}>
      {/* Wishlist - Premium Style */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "absolute right-4 top-4 z-20 size-9 rounded-full bg-white/80 backdrop-blur-md shadow-sm transition-all hover:bg-white hover:scale-110 active:scale-95",
          isWishlisted ? "text-red-500" : "text-slate-400"
        )}
        onClick={onWishlistToggle}
      >
        <Heart className={cn("size-4 transition-colors", isWishlisted && "fill-current")} />
      </Button>

      <Link to={`/collection/${product._id}`} className="flex flex-col h-full">
        {/* Image Section */}
        <div className={STYLES.imageWrap}>
          {coverImage ? (
            <img
              src={coverImage}
              alt={product.title}
              className={STYLES.image}
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-[10px] text-slate-400 uppercase tracking-widest">
              No Preview
            </div>
          )}

          {/* Luxury Sale Badge */}
          {hasSale && (
            <div className="absolute left-4 top-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
              <p className="text-[10px] font-bold text-purple-600">-{product.salePercentage}%</p>
            </div>
          )}

          {/* Artistic Hover Overlay */}
          <div className="absolute inset-0 bg-purple-900/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col p-4 pt-5 space-y-2">
          <div className="space-y-1">
            <span className={STYLES.brand}>
              {product.brand}
            </span>
            <h3 className={STYLES.title}>
              {product.title}
            </h3>
          </div>

          {/* Subtle Rating */}
          <div className="flex items-center gap-1.5 opacity-80">
            <div className="flex text-amber-400">
              <Star className="size-3 fill-current" />
            </div>
            <span className="text-[11px] font-medium text-slate-500">4.8 (82)</span>
          </div>

          {/* Pricing & Cart Trigger */}
          <div className="flex items-end justify-between pt-2 mt-auto">
            <div className="flex flex-col">
              {hasSale && (
                <span className={STYLES.strike}>
                  {formatPrice(product.price)}
                </span>
              )}
              <span className={STYLES.price}>
                {formatPrice(salePrice)}
              </span>
            </div>
            
            {/* Action Icon */}
            <div className="size-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 transition-all duration-300 group-hover:bg-slate-900 group-hover:border-slate-900 group-hover:text-white">
              <ShoppingBag className="size-4" />
            </div>
          </div>

          {/* Premium Swatches */}
          {product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 pt-2">
              {product.colors.slice(0, 3).map((color) => (
                <div
                  key={color}
                  className="size-3 rounded-full border-2 border-white ring-1 ring-slate-200 shadow-sm"
                  style={{ backgroundColor: getSwatchColor(color) }}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-[9px] font-bold text-slate-400">+{product.colors.length - 3}</span>
              )}
            </div>
          )}
        </div>
      </Link>
    </Card>
  );
}

export default CustomerProductCard;