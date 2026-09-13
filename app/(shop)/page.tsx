import HeroCarousel from "./_components/hero-carousel";
import CategoriesSection from "./_components/categories-section";
import TodayDealsSection from "./_components/deals-section";
import ProductSections from "./_components/product-sections";
import TopRatedProducts from "./_components/top-rated-products";

export default function HomePage() {
  return (
    <div className="w-full">
      <HeroCarousel />
      <TodayDealsSection />
      <ProductSections />
      <CategoriesSection />
      <TopRatedProducts />
    </div>
  );
}