import { Card } from "@/components/ui/card";
import { getCoverImage } from "@/features/customer/products/product-list.shared";
import type { CustomerProduct } from "@/features/customer/products/types";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type CustomerProductDetailsGalleryProps = {
  product: CustomerProduct;
  selectedImage: string;
  setSelectedImage: (value: string) => void;
};

const STYLES = {
  // Signature Petal Shape for Main Stage
  mainCard: "relative overflow-hidden rounded-t-[4rem] rounded-bl-[4rem] border-none bg-slate-50 shadow-inner",
  mainImage: "aspect-[4/5] w-full object-cover",
  thumbnailGrid: "mt-6 grid grid-cols-5 gap-4",
  // Matching Petal Shape for Thumbnails
  thumbnailBtn: "relative aspect-square overflow-hidden rounded-t-2xl rounded-bl-2xl border-2 transition-all duration-500",
}

function CustomerProductDetailsGallery({
  product,
  selectedImage,
  setSelectedImage,
}: CustomerProductDetailsGalleryProps) {
  const galleryImages = product.images || [];
  const displayImage = selectedImage || getCoverImage(product);

  return (
    <div className="flex flex-col gap-2">
      {/* --- Main Stage --- */}
      <Card className={STYLES.mainCard}>
        <div className="relative overflow-hidden bg-slate-100">
          <AnimatePresence mode="wait">
            <motion.img
              key={displayImage}
              src={displayImage || "/placeholder.png"}
              alt={product.title}
              // Advanced cinematic transition
              initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(5px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={STYLES.mainImage}
            />
          </AnimatePresence>

          {/* Luxury Floating Sale Tag */}
          {product.salePercentage > 0 && (
            <div className="absolute top-6 left-6 rounded-full bg-white/90 backdrop-blur-md px-4 py-1.5 text-[10px] font-bold text-purple-600 uppercase tracking-[0.2em] shadow-sm ring-1 ring-purple-100">
              -{product.salePercentage}% OFF
            </div>
          )}
        </div>
      </Card>

      {/* --- Thumbnail Selector --- */}
      {galleryImages.length > 1 && (
        <div className={STYLES.thumbnailGrid}>
          {galleryImages.map((item, index) => {
            const isActive = displayImage === item.url;

            return (
              <motion.button
                key={item.publicId}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => setSelectedImage(item.url)}
                className={cn(
                  STYLES.thumbnailBtn,
                  isActive 
                    ? "border-purple-500 shadow-lg shadow-purple-100 scale-100" 
                    : "border-transparent opacity-60 hover:opacity-100 bg-slate-100"
                )}
              >
                <img
                  src={item.url}
                  alt={`View ${index + 1}`}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                />
                
                {/* Active Indicator Dot */}
                {isActive && (
                   <motion.div 
                    layoutId="activeDot"
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 size-1 bg-purple-500 rounded-full" 
                   />
                )}
              </motion.button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CustomerProductDetailsGallery;