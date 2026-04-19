import Header from "./components/header";
import HeaderAuth from "./components/header-auth";
import Footer from "./components/footer";
import HeroHome from "./home/hero-home";
import SuggestedBuildsHome from "./home/suggested-builds-home";
import GettingStartedHome from "./home/getting-started-home";
import BackgroundTerminalText from "./components/background-terminal-text";

export default function Home() {
  return (
    <div className="pt-16 md:pt-20 w-full min-h-full flex flex-col">
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
    </div>
  );
}
