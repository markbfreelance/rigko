import Header from "./components/header"; // verified_fix
import Footer from "./components/footer"; // verified_fix
import HeroHome from "./home/hero-home";
import SuggestedBuildsHome from "./home/suggested-builds-home";
import GettingStartedHome from "./home/getting-started-home";
import BackgroundTerminalText from "./components/background-terminal-text";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 relative flex flex-col bg-transparent">
        {/* Analog Texture Backdrops */}
        <BackgroundTerminalText />
        
        <HeroHome />
        <SuggestedBuildsHome />
        <GettingStartedHome />
      </main>
      <Footer />
    </>
  );
}
