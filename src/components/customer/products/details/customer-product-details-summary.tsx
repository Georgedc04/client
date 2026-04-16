import { extractSalePrice } from "@/features/customer/products/product-list.shared";
import type {
  CustomerProduct,
  ProductSize,
} from "@/features/customer/products/types";
import { formatPrice, cn } from "@/lib/utils";
import CustomerProductOptionsGroup from "./customer-product-options-group";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Heart, Info, Star, ShieldCheck } from "lucide-react";

type CustomerProductDetailsSummaryProps = {
  product: CustomerProduct;
  selectedColor: string;
  selectedSize: string;
  setSelectedColor: (value: string) => void;
  setSelectedSize: (value: ProductSize) => void;
  toggleWishlist: () => Promise<void>;
  isWishlistActive: boolean;
  onAddToCart: () => Promise<void>;
};

export function CustomerProductDetailsSummary({
  product,
  selectedColor,
  selectedSize,
  setSelectedColor,
  setSelectedSize,
  toggleWishlist,
  isWishlistActive,
  onAddToCart,
}: CustomerProductDetailsSummaryProps) {
  const salePrice = extractSalePrice(product);
  const hasSale = product.salePercentage > 0;

  return (
    <section className="flex flex-col gap-6 py-2">
      {/* 1. Brand & Editorial Title */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="h-px w-6 bg-purple-500" />
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-purple-600">
            {product?.brand}
          </p>
        </div>
        <h1 className="text-3xl font-light tracking-tight text-slate-900 sm:text-4xl  leading-tight">
          {product.title}
        </h1>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-amber-400">
            <Star className="size-3.5 fill-current" />
            <span className="text-sm font-semibold text-slate-700">4.9</span>
          </div>
          <span className="text-slate-300">|</span>
          <span className="text-xs font-medium text-slate-500 tracking-wide underline underline-offset-4 cursor-pointer hover:text-purple-600 transition-colors">
            128 Reviews
          </span>
        </div>
      </div>

      {/* 2. Pricing - Bold & Modern */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-4">
          <span className="text-3xl font-bold tracking-tighter text-slate-900">
            {formatPrice(salePrice)}
          </span>
          {hasSale && (
            <div className="flex items-center gap-2">
              <span className="text-lg text-slate-400 line-through decoration-red-500/50">
                {formatPrice(product.price)}
              </span>
              <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Save {product.salePercentage}%
              </span>
            </div>
          )}
        </div>
        <p className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 uppercase tracking-widest">
          <Info className="size-3" /> Inclusive of all luxury taxes
        </p>
      </div>

      <Separator className="bg-slate-100" />

      {/* 3. Selections (Clean & Tighter) */}
      <div className="space-y-5">
        {product.colors?.length > 0 && (
          <div className="space-y-3">
             <div className="flex justify-between items-center">
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-900">Color</span>
                <span className="text-[11px] font-medium text-slate-400 italic">{selectedColor || "None selected"}</span>
             </div>
             <CustomerProductOptionsGroup
                values={product.colors}
                selectedValue={selectedColor}
                onSelect={setSelectedColor}
                variant="color"
             />
          </div>
        )}

        {product.sizes?.length > 0 && (
          <div className="space-y-3">
             <div className="flex justify-between items-center">
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-900">Size</span>
                <span className="text-[11px] font-medium text-slate-400 italic">{selectedSize || "None selected"}</span>
             </div>
             <CustomerProductOptionsGroup
                values={product.sizes}
                selectedValue={selectedSize}
                onSelect={setSelectedSize}
                variant="size"
             />
          </div>
        )}
      </div>

      {/* 4. The Petal Buy Box (Modern Premium Card) */}
      <div className="relative mt-4 p-6 overflow-hidden rounded-t-[2.5rem] rounded-bl-[2.5rem] bg-slate-50 ring-1 ring-slate-100">
        <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-between">
            <p className={cn(
              "text-xs font-bold uppercase tracking-[0.2em]",
              product.stock > 0 ? "text-emerald-600" : "text-rose-500"
            )}>
              {product.stock > 0 ? "Available Now" : "Currently Unavailable"}
            </p>
            {product.stock > 0 && product.stock <= 5 && (
              <span className="text-[10px] bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full font-bold uppercase">
                Only {product.stock} Left
              </span>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <Button
              size="lg"
              className="w-full h-14 rounded-full bg-slate-900 hover:bg-purple-700 text-white shadow-xl transition-all duration-300 font-bold uppercase tracking-widest text-xs"
              disabled={product.stock < 1}
              onClick={() => void onAddToCart()}
            >
              Add to Collection
            </Button>
            
            <button 
              onClick={() => void toggleWishlist()}
              className="flex items-center justify-center gap-2 py-2 text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-rose-500 transition-colors group"
            >
              <Heart className={cn("size-4 transition-all group-hover:scale-110", isWishlistActive && "fill-rose-500 text-rose-500")} />
              {isWishlistActive ? "In Your Wishlist" : "Add to Favorites"}
            </button>
          </div>

          <div className="flex items-center gap-3 pt-2 border-t border-slate-200/50 opacity-60">
            <ShieldCheck className="size-4 text-slate-400" />
            <p className="text-[10px] font-medium text-slate-500 leading-none">
              Authenticated & Insured Shipping Global
            </p>
          </div>
        </div>
      </div>

      {/* 5. Editorial Description */}
      {product.description && (
        <div className="mt-4 space-y-3">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-900">The Story</h3>
          <p className="text-sm leading-relaxed text-slate-600 italic">
            {product.description}
          </p>
        </div>
      )}
    </section>
  );
}

export default CustomerProductDetailsSummary;