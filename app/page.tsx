import BestSellProducts from "@/components/BestSellingProducts/BestSellProducts";
import CategoriesMainPage from "@/components/Categories/CategoriesMainPage";
import ExploreOurProduct from "@/components/ExploreOurProduct/ExploreOurProduct";
import Hero from "@/components/Hero/Hero";
import MusicExperience from "@/components/MusicExperience/MusicExperience";
import NewArrival from "@/components/NewArrival/NewArrival";
import Sales from "@/components/Sales/SalesMainPage";
import Services from "@/components/About/Services";


export default function Home() {
  return (
    <div className="py-10">
      <Hero />
      <Sales />
      <CategoriesMainPage />
      <BestSellProducts />
      <MusicExperience />
      <ExploreOurProduct />
      <NewArrival/>
      <Services/>
    </div>
  );
}
