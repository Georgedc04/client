import * as React from "react"
import { Link } from "react-router-dom"
import { useAuth, useUser } from "@clerk/react"
import {
  Heart,
  LayoutDashboard,
  LogIn,
  LogOut,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
  User,
  type LucideIcon,
} from "lucide-react"

// UI Components
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

// Store Hooks (unchanged)
import { useAuthStore } from "@/features/auth/store"
import { useCustomerWishlistStore } from "@/features/customer/wishlist/store"
import { useCustomerProfileStore } from "@/features/customer/profile/store"
import { useCustomerCartAndCheckoutStore } from "@/features/customer/cart-and-checkout/store"
import { useCustomerOrdersStore } from "@/features/customer/orders/store"

// Dialogs
import CustomerWishlistDialog from "../wishlist/customer-wishlist-dialog"
import CustomerProfileDialog from "../profile/customer-profile-dialog"
import CustomerOrdersDialog from "../orders/customer-orders-dialog"
import CustomerCartAndCheckoutDrawer from "../cart-and-checkout/customer-cart-and-checkout-drawer"
import { CustomerMobileNavbar } from "./mobile-navbar"
import { Logo } from "@/components/ui/Logo"

const NAV_STYLES = {
  header: "sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl",
  container: "mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8",
  navItem: "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent",
  iconBtn: "relative inline-flex size-9 items-center justify-center rounded-lg hover:bg-accent",
  badge: "absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white",
}

function NavTextLink({ href, label, icon: Icon }: { href: string; label: string; icon: LucideIcon }) {
  return (
    <Link to={href} className={NAV_STYLES.navItem}>
      <Icon className="size-4" />
      <span>{label}</span>
    </Link>
  )
}

export function CustomerNavbar() {
  const { isSignedIn, signOut, isLoaded } = useAuth()
  const { user } = useUser() // 🔥 Clerk user

  const { isBootstrapped } = useAuthStore()

  // 🔥 ADMIN CHECK FROM CLERK METADATA
  const isAdmin = user?.publicMetadata?.role === "admin"

  // Stores
  const { items: wishlistItems, loadWishlist, clear: clearWishlist, setOpen: setWishlistOpen } = useCustomerWishlistStore()
  const { openProfile, clear: clearProfile } = useCustomerProfileStore()
  const { setOpen: setCartOpen, cart, loadCart } = useCustomerCartAndCheckoutStore()
  const { openOrders } = useCustomerOrdersStore()

  React.useEffect(() => {
    if (!isLoaded || !isBootstrapped) return

    void loadCart(Boolean(isSignedIn))

    if (!isSignedIn) {
      clearWishlist()
      clearProfile()
      return
    }

    void loadWishlist()
  }, [isLoaded, isBootstrapped, isSignedIn, loadCart, loadWishlist, clearWishlist, clearProfile])

  const showFullUi = isLoaded && isBootstrapped && isSignedIn
  const wishlistCount = wishlistItems.length
  const cartCount = cart?.items?.length || 0

  return (
    <header className={NAV_STYLES.header}>
      <div className={NAV_STYLES.container}>
        
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 hover:opacity-90">
            <Logo />
          </Link>

          <div className="hidden lg:block">
            <NavTextLink href="/collections" label="Collections" icon={ShoppingBag} />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          <nav className="hidden lg:flex items-center gap-1">

            {/* Wishlist */}
            {showFullUi && (
              <button onClick={() => setWishlistOpen(true)} className={NAV_STYLES.iconBtn}>
                <Heart className={cn("size-5", wishlistCount > 0 && "fill-primary text-primary")} />
                {wishlistCount > 0 && <span className={NAV_STYLES.badge}>{wishlistCount}</span>}
              </button>
            )}

            {/* Account */}
            {isSignedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2 rounded-full text-xs font-bold uppercase tracking-widest">
                    <User className="size-4" />
                    Account
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56 mt-3 rounded-2xl shadow-xl p-2">

                  {/* 🔥 ADMIN ONLY */}
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link
                        to="/admin"
                        className="flex items-center gap-3 py-3 px-3 rounded-xl font-bold text-purple-600 hover:bg-purple-50"
                      >
                        <LayoutDashboard className="size-4" />
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={() => openProfile()}>
                    <User className="size-4" /> My Profile
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => openOrders()}>
                    <ShoppingBasket className="size-4" /> My Orders
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={() => signOut()} className="text-red-500">
                    <LogOut className="size-4" /> Logout
                  </DropdownMenuItem>

                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <NavTextLink href="/sign-in" label="Sign In" icon={LogIn} />
            )}
          </nav>

          {/* Cart */}
          <button onClick={() => setCartOpen(true)} className={NAV_STYLES.iconBtn}>
            <ShoppingCart className="size-5" />
            {cartCount > 0 && <span className={NAV_STYLES.badge}>{cartCount}</span>}
          </button>

          {/* Mobile */}
          <CustomerMobileNavbar isSignedIn={!!isSignedIn} />
        </div>

        {/* Dialogs */}
        {showFullUi && (
          <>
            <CustomerWishlistDialog />
            <CustomerProfileDialog />
            <CustomerOrdersDialog />
          </>
        )}

        <CustomerCartAndCheckoutDrawer />
      </div>
    </header>
  )
}