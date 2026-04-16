import { Commonloader } from "@/components/common/Loader";
import CustomerFiltersPanel from "@/components/customer/products/customer-filters-panel";
import CustomerProductCard from "@/components/customer/products/customer-product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { ProductSort } from "@/features/customer/products/types";
import { useCustomerProductList } from "@/features/customer/products/use-customer-collections";
import { SlidersHorizontal, Sparkles, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

// ARTS DESIGN CONSTANTS
const pageWrapClass = "min-h-screen bg-white pb-20";

const heroSectionClass =
  "relative border-b border-slate-50 bg-gradient-to-b from-purple-50/40 via-white to-white";

const heroContainerClass = "mx-auto max-w-7xl px-6 py-12 lg:py-20";

const heroEyebrowClass = "flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.4em] text-purple-600";

const heroContentClass =
  "mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between animate-in fade-in slide-in-from-bottom-4 duration-700";

const heroTitleClass =
  "max-w-2xl text-4xl font-bold tracking-tighter text-slate-900 sm:text-3xl leading-[1.1]";

const sortTriggerClass = "w-full sm:w-[200px] rounded-full bg-white border-slate-200 text-xs font-bold uppercase tracking-widest h-11 px-6 shadow-sm";

const contentContainerClass = "mx-auto max-w-7xl px-6 py-8";

const topBarClass =
  "mb-8 flex flex-wrap items-center justify-between gap-4";

const activeBadgeClass =
  "rounded-full border-none bg-purple-50 text-purple-600 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest hover:bg-purple-100 transition-colors cursor-default flex items-center gap-2";

const mobileFilterButtonClass = "lg:hidden rounded-full bg-slate-900 hover:bg-purple-700 text-white font-bold uppercase tracking-widest text-[10px] h-11 px-6 shadow-xl";

const layoutGridClass = "grid gap-12 lg:grid-cols-[280px_1fr]";

// The "Petal" Sticky Sidebar
const desktopFilterCardClass = "sticky top-32 overflow-hidden rounded-t-[3rem] rounded-bl-[3rem] border-none bg-slate-50/50 p-6 shadow-inner";

const productGridClass = "grid grid-cols-2 gap-4 md:gap-8 xl:grid-cols-3";

function Collections() {
  const {
    sort,
    changeSort,
    loading,
    products,
    hasActiveFilters,
    categories,
    availableColors,
    filters,
    toggleFacet,
    clearFilters,
    activeFilterBadges,
  } = useCustomerProductList();

  if (loading) return <Commonloader />;

  return (
    <div className={pageWrapClass}>
      <section className={heroSectionClass}>
        <div className={heroContainerClass}>
          <div className={heroEyebrowClass}>
            <Sparkles className="size-4" />
            Curated Gallery
          </div>

          <div className={heroContentClass}>
            <h1 className={heroTitleClass}>Essential Pieces for Every Day</h1>

            <div className="shrink-0 w-full sm:w-auto">
              <Select
                value={sort}
                onValueChange={(value) => changeSort(value as ProductSort)}
              >
                <SelectTrigger className={sortTriggerClass}>
                  <SelectValue placeholder="Sort Gallery" />
                </SelectTrigger>

                <SelectContent className="rounded-2xl border-none shadow-2xl">
                  <SelectItem value="recent" className="text-xs font-medium uppercase tracking-widest">Newest First</SelectItem>
                  <SelectItem value="price-low" className="text-xs font-medium uppercase tracking-widest">Price: Low to High</SelectItem>
                  <SelectItem value="price-high" className="text-xs font-medium uppercase tracking-widest">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      <div className={contentContainerClass}>
        {/* Top bar for active filters & Mobile Trigger */}
        <div className={topBarClass}>
          <div className="flex flex-wrap items-center gap-2">
            {activeFilterBadges.map((item) => (
              <Badge key={item.key} className={activeBadgeClass}>
                <span className="opacity-50">{item.label}:</span> {item.value}
              </Badge>
            ))}
            {hasActiveFilters && (
               <button 
                onClick={clearFilters}
                className="text-[10px] font-bold uppercase tracking-widest text-rose-500 ml-2 hover:text-rose-600 transition-colors"
               >
                Reset All
               </button>
            )}
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button className={mobileFilterButtonClass}>
                <SlidersHorizontal className="mr-2 h-3.5 w-3.5" />
                Refine
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-[85%] sm:max-w-md rounded-r-[3rem] border-none p-0">
              <SheetHeader className="p-6 border-b border-slate-50">
                <SheetTitle className="text-xs font-bold uppercase tracking-[0.3em]">Refine Collection</SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-[calc(100vh-80px)] p-6">
                <CustomerFiltersPanel
                  categories={categories}
                  filters={filters}
                  availableColors={availableColors}
                  hasActiveFilters={hasActiveFilters}
                  onClearFilters={clearFilters}
                  onToggleFacet={toggleFacet}
                />
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>

        <div className={layoutGridClass}>
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block">
            <div className={desktopFilterCardClass}>
              <CustomerFiltersPanel
                categories={categories}
                filters={filters}
                availableColors={availableColors}
                hasActiveFilters={hasActiveFilters}
                onClearFilters={clearFilters}
                onToggleFacet={toggleFacet}
              />
            </div>
          </aside>

          {/* Product Section */}
          <section className="space-y-6">
            {!loading && !products.length ? (
              <Card className="rounded-[3rem] border-2 border-dashed border-slate-100 bg-slate-50/50">
                <CardContent className="flex min-h-100 flex-col items-center justify-center gap-6 p-12 text-center">
                  <div className="size-20 rounded-t-full rounded-bl-full bg-white flex items-center justify-center shadow-sm">
                    <X className="size-8 text-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-bold tracking-tight text-slate-900">No Pieces Found</p>
                    <p className="text-sm text-slate-500 max-w-xs mx-auto">Try adjusting your filters to find what you are looking for.</p>
                  </div>
                  <Button
                    onClick={clearFilters}
                    className="rounded-full px-8 bg-slate-900 uppercase text-[10px] font-bold tracking-widest"
                  >
                    Clear All Filters
                  </Button>
                </CardContent>
              </Card>
            ) : null}

            {!loading && products.length ? (
              <div className={productGridClass}>
                {products.map((item) => (
                  <CustomerProductCard key={item._id} product={item} />
                ))}
              </div>
            ) : null}
          </section>
        </div>
      </div>
    </div>
  );
}

export default Collections;