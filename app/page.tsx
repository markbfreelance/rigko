import Header from "./components/Header";
import HeaderAuth from "./components/header-auth";
import Footer from "./components/Footer";
import HeroHome from "./home/hero-home";
import SuggestedBuildsHome from "./home/suggested-builds-home";
import GettingStartedHome from "./home/getting-started-home";
import BackgroundTerminalText from "./components/background-terminal-text";

export default function Home() {
  return (
    <>
      <Header>
        <HeaderAuth />
      </Header>
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
