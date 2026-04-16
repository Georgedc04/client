import { getSwatchColor } from "@/features/customer/products/product-list.shared";
import type { ProductSize } from "@/features/customer/products/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/** * ARTS DESIGN STYLE: 
 * Asymmetric rounding (Petal), generous tracking, and floating active states.
 */
const STYLES = {
  wrap: "flex flex-wrap gap-3",
  // Softening the base and moving to the Petal Shape
  base: "relative flex items-center justify-center border text-[11px] font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer select-none rounded-t-2xl rounded-bl-2xl",
  
  // High-end active state: Dark background with white text
  active: "border-slate-900 bg-slate-900 text-white shadow-lg shadow-purple-200 z-10 scale-105",
  inactive: "border-slate-200 bg-white hover:border-purple-300 text-slate-600 hover:text-purple-600",
  
  // Size-specific: Elegant and breathable
  size: "h-11 min-w-[54px] px-4",
  
  // Color-specific: Using the swatch as a focal point
  color: "h-11 px-4 gap-3",
  swatch: "size-4 rounded-full border border-white ring-1 ring-slate-200 shadow-inner",
  
  disabled: "opacity-30 grayscale cursor-not-allowed bg-slate-50 border-dashed"
};

type CustomerProductOptionsGroupProps = {
  values: string[];
  selectedValue: string;
  onSelect: (value: ProductSize) => void;
  variant: "color" | "size";
  className?: string; 
};

function CustomerProductOptionsGroup({
  values,
  variant,
  selectedValue,
  onSelect,
  className
}: CustomerProductOptionsGroupProps) {
  return (
    <div role="group" className={cn(STYLES.wrap, className)}>
      {values.map((value) => {
        const isActive = selectedValue === value;

        return (
          <button
            key={value}
            type="button"
            onClick={() => onSelect(value as ProductSize)}
            className={cn(
              STYLES.base,
              variant === "color" ? STYLES.color : STYLES.size,
              isActive ? STYLES.active : STYLES.inactive
            )}
          >
            {variant === "color" ? (
              <>
                <div
                  className={STYLES.swatch}
                  style={{ backgroundColor: getSwatchColor(value) }}
                  aria-hidden="true"
                />
                <span className="text-[10px] leading-none">{value}</span>
              </>
            ) : (
              <span className="leading-none">{value}</span>
            )}

            {/* Artistic Active Indicator: A sliding glow or background */}
            {isActive && (
              <motion.div 
                layoutId={`active-pill-${variant}`}
                className="absolute inset-0 rounded-t-2xl rounded-bl-2xl bg-purple-600/10 -z-10"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

export default CustomerProductOptionsGroup;