import {
  CategorySection,
  FeaturesSection,
  HeroSection,
} from "src/sections/home";
import { SaleSection } from "src/sections/home/sale-section";

const HomePage = () => {
  return (
    <>
      <div className="container">
        <HeroSection />
        <CategorySection />
        <FeaturesSection />
      </div>
      <div className="mx-auto">
        <SaleSection />
      </div>
    </>
  );
};

export default HomePage;
