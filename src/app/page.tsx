import Hero from "@/components/Hero";
import WhyFind from "@/components/WhyFind";
import IdentitySection from "@/components/IdentitySection";
import StepReveal from "@/components/StepReveal";
import AgentSection from "@/components/AgentSection";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import FooterCTA from "@/components/FooterCTA";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <WhyFind />
      <IdentitySection />
      <StepReveal />
      <AgentSection />
      <Services />
      <Testimonials />
      <FooterCTA />
    </div>
  );
}


