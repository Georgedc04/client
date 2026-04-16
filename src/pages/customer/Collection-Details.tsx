import { Commonloader } from "@/components/common/Loader";
import CustomerProductDetailsGallery from "@/components/customer/products/details/customer-product-details-gallery";
import CustomerProductDetailsSummary from "@/components/customer/products/details/customer-product-details-summary";
import CustomerProductRelatedCard from "@/components/customer/products/details/customer-related-product-card";
import { useAuthStore } from "@/features/auth/store";
import { useCustomerProductDetailsStore } from "@/features/customer/products/details/store";
import { useCustomerWishlistStore } from "@/features/customer/wishlist/store";
import { useAuth } from "@clerk/react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";

// ARTS DESIGN CONSTANTS
const pageWrapClass = "min-h-screen bg-white pb-20";

// Modern Hero with a softer gradient
const heroSectionClass = "relative border-b border-slate-50 bg-gradient-to-b from-purple-50/30 to-white";
const heroContainerClass = "mx-auto max-w-7xl px-6 py-10 lg:py-16";

const backButtonClass = "group mb-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 hover:text-purple-600 transition-all";

const heroContentClass = "space-y-4"; 
const heroEyebrowClass = "flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.4em] text-purple-600";
const heroTitleClass = "max-w-4xl text-4xl font-bold tracking-tighter text-slate-900 md:text-6xl lg:text-7xl leading-[1.1]";

const contentContainerClass = "mx-auto max-w-7xl px-6 py-12";
// Responsive Grid: 1 column on mobile, 2 columns on desktop
const contentGridClass = "grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start";

const relatedSectionClass = "mt-32 space-y-12";
const relatedHeadingWrapClass = "flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-8";
const relatedEyebrowClass = "text-[10px] font-bold uppercase tracking-[0.4em] text-purple-600";
const relatedTitleClass = "text-3xl font-bold tracking-tight text-slate-900";

// Responsive Related Grid: 2 columns on mobile, 4 on desktop
const relatedGridClass = "grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-4";

function CollectionDetails() {
  const { id = "" } = useParams();
  const { isLoaded, isSignedIn } = useAuth();
  const { isBootstrapped } = useAuthStore();

  const {
    loadProduct,
    clear,
    data,
    selectedImage,
    setSelectedImage,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    toggleWishlist,
    addToCart,
  } = useCustomerProductDetailsStore((state) => state);

  const wishlistItems = useCustomerWishlistStore((state) => state.items);
  const product = data?.product ?? null;
  const relatedProducts = data?.relatedProducts ?? [];
  const isWishlistActive = product ? wishlistItems.some((item) => item.productId === product._id) : false;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    void loadProduct(id);
    return () => clear();
  }, [clear, id, loadProduct]);

  useEffect(() => {
    if (product?.title) {
      document.title = `${product.title} | ${product.brand || 'Store'}`;
    }
  }, [product]);

  if (!product) return <Commonloader />;

  return (
    <div className={pageWrapClass}>
      {/* Editorial Hero Section */}
      <section className={heroSectionClass}>
        <div className={heroContainerClass}>
          <Link to="/collections" className={backButtonClass}>
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Back to Collection
          </Link>
          
          <div className={cn(heroContentClass, "animate-in fade-in slide-in-from-bottom-4 duration-700")}>
            <div className={heroEyebrowClass}>
              <Sparkles className="size-4" />
              {product?.brand}
            </div>
            <h1 className={heroTitleClass}>{product?.title}</h1>
          </div>
        </div>
      </section>

      <main className={contentContainerClass}>
        <div className={contentGridClass}>
          {/* Left: Interactive Gallery */}
          <div className="animate-in fade-in duration-1000">
            <CustomerProductDetailsGallery
              product={product}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
          </div>

          {/* Right: Product Info (Sticky on Desktop) */}
          <div className="lg:sticky lg:top-32 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            <CustomerProductDetailsSummary
              product={product}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              setSelectedColor={setSelectedColor}
              setSelectedSize={setSelectedSize}
              toggleWishlist={() =>
                toggleWishlist(isLoaded, isBootstrapped, Boolean(isSignedIn), isWishlistActive)
              }
              isWishlistActive={isWishlistActive}
              onAddToCart={() => addToCart(isLoaded, isBootstrapped, Boolean(isSignedIn))}
            />
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className={relatedSectionClass}>
            <div className={relatedHeadingWrapClass}>
              <div className="space-y-2">
                <p className={relatedEyebrowClass}>Curated for you</p>
                <h2 className={relatedTitleClass}>You may also like</h2>
              </div>
              <Link 
                to="/collections" 
                className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-purple-600 transition-colors flex items-center gap-2"
              >
                View Full Gallery <ArrowRight className="size-3" />
              </Link>
            </div>

            <div className={cn(relatedGridClass, "mt-8")}>
              {relatedProducts.map((item) => (
                <CustomerProductRelatedCard key={item._id} product={item} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default CollectionDetails;