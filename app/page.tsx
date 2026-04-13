import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroHome from "./home/hero_home";
import SuggestedBuildsHome from "./home/suggestedBuilds_home";
import GettingStartedHome from "./home/gettingStarted_home";
import PopularBuildsHome from "./home/popularBuilds_home";
import Cta from "./components/Cta";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroHome />
        <SuggestedBuildsHome />
        <GettingStartedHome />
        <PopularBuildsHome />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
