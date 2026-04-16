import { Commonloader } from "@/components/common/Loader";
import { CategoriesSection } from "@/components/store/CategoriesSection";
import { HeroBanner } from "@/components/store/HeroBanner";
import { RecentProductsSection } from "@/components/store/RecentProductsSection";
import { CouponsSection } from "@/components/store/CouponsSection";
import { useCustomerHomeStore } from "@/features/customer/home/store";
import { useEffect } from "react";

const STYLES = {
  pageWrap: "min-h-screen bg-background antialiased selection:bg-primary/20 pb-20",
  container: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
  sectionStack: "space-y-24 pt-8",
} as const;

export function StoreHome() {
  const { data, loading, loadHome } = useCustomerHomeStore((state) => state);

  useEffect(() => {
    window.scrollTo(0, 0);
    void loadHome();
  }, [loadHome]);

  if (loading) return <Commonloader />;

  const banners = data?.banners || [];

  return (
    <div className={STYLES.pageWrap}>
      <div className={STYLES.container}>
        <div className={STYLES.sectionStack}>
          
          {/* 🔥 Hero Slider */}
          {banners.length >= 1 && (
            <HeroBanner banners={banners} />
          )}

          {/* 🧩 Categories */}
          <CategoriesSection categories={data?.categories || []} />

          {/* 💸 Coupons */}
          <CouponsSection coupons={data?.coupons || []} />

          {/* 🛍️ Products */}
          <RecentProductsSection products={data?.recentProducts || []} />

        </div>
      </div>
    </div>
  );
}