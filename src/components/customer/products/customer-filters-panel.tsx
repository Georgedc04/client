import { Separator } from "@/components/ui/separator";
import { SIZE_OPTIONS } from "@/features/admin/products/constants";
import type { ProductCategory } from "@/features/admin/products/types";
import {
  BRAND_OPTIONS,
  getSwatchColor,
  type CustomerProductFilters,
  type FacetKey,
} from "@/features/customer/products/product-list.shared";
import { cn } from "@/lib/utils";
import { X, Sparkles, Check } from "lucide-react";

/**
 * ARTS DESIGN SYSTEM:
 * - Wide letter spacing for headers
 * - Petal-shaped selection markers
 * - Soft purple/fuchsia accents
 */
const STYLES = {
  panel: "flex flex-col gap-8 bg-transparent py-4",
  section: "space-y-4 px-2",
  title: "text-[11px] font-bold uppercase tracking-[0.3em] text-slate-900",
  link: "group flex items-center justify-between text-[13px] py-1 text-slate-500 hover:text-purple-600 cursor-pointer transition-all duration-300",
  activeLink: "text-purple-600 font-semibold",
  clearBtn: "text-[10px] font-bold uppercase tracking-widest text-rose-500 hover:text-rose-600 flex items-center gap-1.5 transition-colors",
  swatch: "size-6 rounded-full border-2 border-white ring-1 ring-slate-200 shadow-sm transition-transform duration-300 hover:scale-110",
  sizeBtn: "flex items-center justify-center border border-slate-200 bg-white text-[11px] font-bold min-w-[42px] h-10 transition-all duration-300 rounded-t-xl rounded-bl-xl hover:border-purple-300",
  activeSize: "bg-slate-900 border-slate-900 text-white shadow-lg shadow-purple-100 scale-105",
};

type CustomerFiltersPanelProps = {
  categories: ProductCategory[];
  filters: CustomerProductFilters;
  availableColors: string[];
  hasActiveFilters: boolean;
  onToggleFacet: (key: FacetKey, value: string) => void;
  onClearFilters: () => void;
};

function CustomerFiltersPanel({
  categories,
  filters,
  availableColors,
  hasActiveFilters,
  onClearFilters,
  onToggleFacet,
}: CustomerFiltersPanelProps) {
  return (
    <div className={STYLES.panel}>
      {/* Header */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <Sparkles className="size-3.5 text-purple-500" />
          <h2 className="text-xs font-bold uppercase tracking-[0.2em]">Refine</h2>
        </div>
        {hasActiveFilters && (
          <button onClick={onClearFilters} className={STYLES.clearBtn}>
            <X className="size-3" /> Reset
          </button>
        )}
      </div>

      {/* Categories - Editorial List Style */}
      <section className={STYLES.section}>
        <h3 className={STYLES.title}>Collections</h3>
        <div className="flex flex-col gap-1">
          {categories.map((item) => {
            const isActive = filters.category === item._id;
            return (
              <div
                key={item._id}
                onClick={() => onToggleFacet("category", item._id)}
                className={cn(STYLES.link, isActive && STYLES.activeLink)}
              >
                <span className="relative">
                  {item.name}
                  {isActive && (
                    <span className="absolute -left-3 top-1/2 -translate-y-1/2 size-1 bg-purple-500 rounded-full" />
                  )}
                </span>
                <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity italic">Explore</span>
              </div>
            );
          })}
        </div>
      </section>

      <Separator className="bg-slate-100 mx-2" />

      {/* Brands - Clean Minimalist Selection */}
      <section className={STYLES.section}>
        <h3 className={STYLES.title}>Designers</h3>
        <div className="flex flex-col gap-1">
          {BRAND_OPTIONS.map((brand) => {
            const isActive = filters.brand === brand;
            return (
              <div
                key={brand}
                onClick={() => onToggleFacet("brand", brand)}
                className={cn(STYLES.link, isActive && STYLES.activeLink)}
              >
                <span>{brand}</span>
                <div className={cn(
                  "size-4 rounded-t-lg rounded-bl-lg border border-slate-200 flex items-center justify-center transition-all",
                  isActive ? "bg-purple-600 border-purple-600" : "bg-white"
                )}>
                  {isActive && <Check className="size-2.5 text-white" />}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Separator className="bg-slate-100 mx-2" />

      {/* Colors - Floating Swatches */}
      <section className={STYLES.section}>
        <h3 className={STYLES.title}>Palette</h3>
        <div className="grid grid-cols-5 gap-3">
          {availableColors.map((color) => {
            const isActive = filters.color === color;
            return (
              <button
                key={color}
                type="button"
                className="flex flex-col items-center gap-2"
                onClick={() => onToggleFacet("color", color)}
                title={color}
              >
                <div
                  className={cn(
                    STYLES.swatch,
                    isActive && "ring-2 ring-purple-500 ring-offset-2 scale-110"
                  )}
                  style={{ backgroundColor: getSwatchColor(color) }}
                />
              </button>
            );
          })}
        </div>
      </section>

      {/* Sizes - Boutique Shape Grid */}
      <section className={cn(STYLES.section, "pb-8")}>
        <h3 className={STYLES.title}>Size</h3>
        <div className="grid grid-cols-4 gap-2">
          {SIZE_OPTIONS.map((size) => {
            const isActive = filters.size === size;
            return (
              <button
                key={size}
                type="button"
                onClick={() => onToggleFacet("size", size)}
                className={cn(STYLES.sizeBtn, isActive && STYLES.activeSize)}
              >
                {size}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default CustomerFiltersPanel;