import { useState, useEffect, useCallback } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";
import RoleCapabilitiesCarousel from "./components/RoleCapabilitiesCarousel";
import SelectedWorks from "./components/SelectedWorks";
// import Journal from "./components/Journal";
// import Explorations from "./components/Explorations";
import Stats from "./components/Stats";
import Ending from "./components/Ending";
import Contact from "./components/contact";
import OrbitalExperience from "./components/ExperienceFlowchart";
import SkunkworksTerminal from "./components/SkunkworksTerminal";
import CurrentlyExploring from "./components/CurrentlyExploring";

const SECTIONS = ["hero", "about", "capabilities", "work", "journal", "explorations", "stats", "contact"];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");

  /* ── Scroll spy ── */
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY + window.innerHeight / 3;

    for (let i = SECTIONS.length - 1; i >= 0; i--) {
      const el = document.getElementById(SECTIONS[i]);
      if (el && el.offsetTop <= scrollY) {
        setActiveSection(SECTIONS[i]);
        break;
      }
    }
  }, []);

  useEffect(() => {
    if (isLoading) return;
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, handleScroll]);

  return (
    <div className="bg-bg text-text-primary font-body">
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {!isLoading && (
        <>
          <Navbar activeSection={activeSection} />
          <Hero />
          <AboutMe />
          <RoleCapabilitiesCarousel />
          <SelectedWorks />
          <SkunkworksTerminal />
          <OrbitalExperience />
          <CurrentlyExploring />
          {/* <Journal />
          <Explorations /> */}
          <Stats />
          <Contact />
          <Ending />
        </>
      )}
    </div>
  );
}

export default App;
