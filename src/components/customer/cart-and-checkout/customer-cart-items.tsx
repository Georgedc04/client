import { ScrollArea } from "@/components/ui/scroll-area";
import { useCustomerCartAndCheckoutStore } from "@/features/customer/cart-and-checkout/store";
import { formatPrice } from "@/lib/utils";
import { useAuth } from "@clerk/react";
import { Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const STYLES = {
  wrap: "flex h-full min-h-0 flex-col bg-white",
  // Editorial Header
  head: "px-6 py-5 border-b border-slate-50",
  headingText: "text-xs font-bold uppercase tracking-[0.3em] text-slate-900 flex items-center gap-3",
  
  scroll: "min-h-0 flex-1",
  list: "divide-y divide-slate-50 px-2",
  
  // Artistic Item Layout
  item: "group flex gap-5 py-6 px-4 transition-all duration-300 hover:bg-slate-50/50",
  // Signature Petal Shape for Image
  image: "h-24 w-20 shrink-0 object-cover rounded-t-3xl rounded-bl-3xl bg-slate-100 shadow-sm transition-transform duration-500 group-hover:scale-105",
  
  textWrap: "min-w-0 flex-1 flex flex-col gap-1",
  brand: "text-[10px] font-bold uppercase tracking-[0.2em] text-purple-600",
  title: "line-clamp-2 text-sm font-semibold leading-snug text-slate-800 hover:text-purple-700 transition-colors",
  meta: "text-[11px] font-medium text-slate-400 uppercase tracking-tight",
  price: "text-base font-bold tracking-tight text-slate-900 mt-1",

  footerRow: "flex items-center justify-between gap-3 pt-4 mt-auto",
  
  // Refined Qty Selector (Non-Square)
  qtyWrap: "flex items-center gap-1 bg-slate-100 p-1 rounded-full",
  qtyButton: "size-7 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-slate-900 hover:text-white transition-all",
  qtyValue: "w-8 text-center text-[11px] font-bold text-slate-900",
  
  removeBtn: "text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-rose-500 flex items-center gap-1.5 transition-colors",
  
  // Empty State - Artistic
  emptyWrap: "flex flex-col items-center justify-center py-24 px-8 text-center",
};

function CustomerCartItems() {
  const { isSignedIn } = useAuth();
  const { cart, setOpen, increase, decrease, remove } =
    useCustomerCartAndCheckoutStore((state) => state);

  return (
    <div className={STYLES.wrap}>
      <div className={STYLES.head}>
        <p className={STYLES.headingText}>
          <ShoppingBag className="size-4 text-purple-600" />
          Collection ({cart.items.length})
        </p>
      </div>

      <ScrollArea className={STYLES.scroll}>
        <div className={STYLES.list}>
          {!cart.items.length ? (
            <div className={STYLES.emptyWrap}>
              <div className="size-20 rounded-t-full rounded-bl-full bg-slate-50 flex items-center justify-center mb-6">
                 <ShoppingBag className="size-8 text-slate-200" />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">Your collection is empty</p>
              <button 
                className="text-[10px] font-bold text-purple-600 uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all"
                onClick={() => setOpen(false)}
              >
                Browse Gallery <ArrowRight className="size-3" />
              </button>
            </div>
          ) : (
            cart.items.map((item, index) => (
              <div key={`${item.productId}-${index}`} className={STYLES.item}>
                {/* Petal-shaped Image */}
                <img src={item.image} alt={item.title} className={STYLES.image} />

                <div className={STYLES.textWrap}>
                  <p className={STYLES.brand}>{item.brand}</p>

                  <Link
                    to={`/collection/${item.productId}`}
                    className={STYLES.title}
                    onClick={() => setOpen(false)}
                  >
                    {item.title}
                  </Link>

                  {(item.color || item.size) && (
                    <p className={STYLES.meta}>
                      {item.color && <span>{item.color}</span>}
                      {item.color && item.size && <span className="mx-2 opacity-30">•</span>}
                      {item.size && <span>Size {item.size}</span>}
                    </p>
                  )}

                  <p className={STYLES.price}>{formatPrice(item.finalPrice)}</p>

                  <div className={STYLES.footerRow}>
                    {/* Rounded Qty Selector */}
                    <div className={STYLES.qtyWrap}>
                      <button
                        type="button"
                        className={STYLES.qtyButton}
                        onClick={() => void decrease(item, Boolean(isSignedIn))}
                      >
                        <Minus className="size-3" />
                      </button>
                      <span className={STYLES.qtyValue}>{item.quantity}</span>
                      <button
                        type="button"
                        className={STYLES.qtyButton}
                        onClick={() => void increase(item, Boolean(isSignedIn))}
                      >
                        <Plus className="size-3" />
                      </button>
                    </div>

                    <button
                      type="button"
                      className={STYLES.removeBtn}
                      onClick={() => void remove(item, Boolean(isSignedIn))}
                    >
                      <Trash2 className="size-3" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

export default CustomerCartItems;