import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCustomerWishlistStore } from "@/features/customer/wishlist/store";
import { formatPrice } from "@/lib/utils";
import { Heart, Trash2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * ART DESIGN SYSTEM:
 * - Petal rounding on thumbnails and dialog
 * - Editorial typography (Bold tracking, Italic titles)
 * - Glassmorphism effects
 */
const STYLES = {
  // Artistic Dialog with custom rounding
  dialog: "sm:max-w-md max-h-[85vh] overflow-hidden flex flex-col p-0 border-none rounded-t-[3rem] rounded-bl-[3rem] shadow-2xl",
  header: "px-6 py-5 border-b border-slate-50 bg-white",
  scrollArea: "flex-1 overflow-y-auto p-6 space-y-6 bg-white",
  // Soft separator
  item: "flex gap-4 pb-6 border-b border-slate-50 last:border-0 group",
  // The Petal Shape for images
  imageWrap: "h-24 w-20 shrink-0 overflow-hidden rounded-t-2xl rounded-bl-2xl bg-slate-50 relative",
  image: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-110",
  content: "min-w-0 flex-1 flex flex-col gap-1",
  brand: "text-[10px] font-bold uppercase tracking-[0.2em] text-purple-600",
  title: "text-sm font-medium leading-tight text-slate-800 hover:text-purple-700 transition-colors line-clamp-2",
  price: "text-base font-bold tracking-tight text-slate-900 mt-1",
  btnRemove: "text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-rose-500 flex items-center gap-1.5 transition-colors",
  // Boutique Action Button
  btnView: "h-9 px-4 rounded-full bg-slate-900 hover:bg-purple-700 text-white text-[10px] font-bold uppercase tracking-widest transition-all",
}

function CustomerWishlistDialog() {
  const { isOpen, setOpen, items, removeItem } = useCustomerWishlistStore(
    (state) => state,
  );

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className={STYLES.dialog}>
        <DialogHeader className={STYLES.header}>
          <DialogTitle className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-slate-900">
            <div className="relative">
              <Heart className="size-4 text-purple-600 fill-purple-600" />
              <span className="absolute -top-1 -right-1 size-2 bg-fuchsia-400 rounded-full animate-ping" />
            </div>
            Your Collection ({items.length})
          </DialogTitle>
        </DialogHeader>

        <div className={STYLES.scrollArea}>
          {!items.length ? (
            <div className="py-16 text-center space-y-4">
              <div className="flex justify-center">
                 <div className="size-16 rounded-t-full rounded-bl-full bg-slate-50 flex items-center justify-center">
                    <Heart className="size-6 text-slate-200" />
                 </div>
              </div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">Your collection is empty.</p>
              <Link 
                to="/collections" 
                onClick={() => setOpen(false)}
                className="text-[10px] font-bold text-purple-600 uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:gap-3 transition-all"
              >
                Discover Pieces <ArrowRight className="size-3" />
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.productId} className={STYLES.item}>
                {/* Petal Thumbnail */}
                <div className={STYLES.imageWrap}>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className={STYLES.image}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[8px] text-slate-300 font-bold uppercase">
                      No Art
                    </div>
                  )}
                </div>

                {/* Editorial Details */}
                <div className={STYLES.content}>
                  <p className={STYLES.brand}>{item.brand}</p>
                  
                  <Link
                    to={`/collection/${item.productId}`}
                    className={STYLES.title}
                    onClick={() => setOpen(false)}
                  >
                    {item.title}
                  </Link>
                  
                  <p className={STYLES.price}>{formatPrice(item.finalPrice)}</p>

                  <div className="flex items-center justify-between mt-auto">
                    <button
                      type="button"
                      className={STYLES.btnRemove}
                      onClick={() => void removeItem(item.productId)}
                    >
                      <Trash2 className="size-3" />
                      Remove
                    </button>

                    <Button
                      asChild
                      className={STYLES.btnView}
                    >
                      <Link
                        onClick={() => setOpen(false)}
                        to={`/collection/${item.productId}`}
                      >
                        View Piece
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CustomerWishlistDialog;