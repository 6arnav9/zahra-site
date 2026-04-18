import Hero from "./components/Hero";
import HomeAbout from "./components/HomeAbout";
import WhyChooseUs from "./components/WhyChooseUs"
export default function Home() {
  return (
    <>
      <Hero />
      <HomeAbout />
      <WhyChooseUs />
      {/* Other future sections like Services, Industries will go here */}
    </>
  );
}