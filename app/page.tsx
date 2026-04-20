import Hero from "./components/Hero";
import HomeAbout from "./components/HomeAbout";
import WhyChooseUs from "./components/WhyChooseUs"
import HomeIndustries from "./components/HomeIndustries"
export default function Home() {
  return (
    <>
      <Hero />
      <HomeAbout />
      <HomeIndustries />
      <WhyChooseUs />
      {/* Other future sections like Services, Industries will go here */}
    </>
  );
}