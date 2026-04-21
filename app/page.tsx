import Hero from "./components/Hero";
import HomeAbout from "./components/HomeAbout";
import CEOMessage from "./components/CEOMessage";
import WhyChooseUs from "./components/WhyChooseUs"
import HomeIndustries from "./components/HomeIndustries"
import ContactCTA from "./components/ContactCTA"
export default function Home() {
  return (
    <>
      <Hero />      
      <HomeAbout />
      <CEOMessage />
      <HomeIndustries />
      <WhyChooseUs />
      <ContactCTA />
      {/* Other future sections like Services, Industries will go here */}
    </>
  );
}