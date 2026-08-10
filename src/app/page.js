import BloodMatchSection from "@/Components/BloodMatchSection";
import DonateCTA from "@/Components/DonateCTA";
import FeaturesSection from "@/Components/FeaturesSection";
import Hero from "@/Components/Hero";
import HowItWorks from "@/Components/HowItWorks";


export default function Home() {
  return (
    <div>
      <Hero />
      <BloodMatchSection />
      <FeaturesSection />
      <HowItWorks />
      <DonateCTA />
    </div>
  );
}
