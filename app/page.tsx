import Hero from "@/app/components/home/Hero";
import ProductPillars from "@/app/components/home/ProductPillars";
import ScenarioDemo from "@/app/components/home/ScenarioDemo";
import HeatmapPreview from "@/app/components/home/HeatmapPreview";
import SimilarityPreview from "@/app/components/home/SimilarityPreview";
import TrendForecastPreview from "@/app/components/home/TrendForecastPreview";
import ReportsPreview from "@/app/components/home/ReportsPreview";
import ApiShowcase from "@/app/components/home/ApiShowcase";
import EnterpriseCTA from "@/app/components/home/EnterpriseCTA";
import Footer from "@/app/components/home/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ProductPillars />
      <ScenarioDemo />
      <HeatmapPreview />
      <SimilarityPreview />
      <TrendForecastPreview />
      <ReportsPreview />
      <ApiShowcase />
      <EnterpriseCTA />
      <Footer />
    </main>
  );
}
