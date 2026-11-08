import { lazy, Suspense, useEffect, useState } from "react";
import BootScreen from "@/components/BootScreen";
import { ScrollProgressBar } from "@/components/HUD";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Deployments from "@/components/Deployments";
import Projects from "@/components/Projects";
import Certificates from "@/components/Certificates";
import AmbassadorRoles from "@/components/AmbassadorRoles";
import Hackathons from "@/components/Hackathons";
import Internships from "@/components/Internships";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Terminal = lazy(() => import("@/components/Terminal"));

const isBrowser = typeof window !== "undefined";

export default function App() {
  // During prerendering there is no browser, so skip the boot animation and
  // render the full page into the static HTML snapshot.
  const [booted, setBooted] = useState(() => !isBrowser);
  const [isDay, setIsDay] = useState(
    () => isBrowser && localStorage.getItem("aditya-theme") === "day",
  );
  const [accent, setAccent] = useState(
    () => (isBrowser && localStorage.getItem("aditya-accent")) || "gold",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = isDay ? "day" : "night";
    document.documentElement.dataset.accent = accent;
    localStorage.setItem("aditya-theme", isDay ? "day" : "night");
    localStorage.setItem("aditya-accent", accent);
  }, [accent, isDay]);

  useEffect(() => {
    let frame = 0;
    let nextX = 0;
    let nextY = 0;

    const applyGlow = () => {
      frame = 0;
      document.documentElement.style.setProperty("--pointer-x", `${nextX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${nextY}px`);
    };

    const queueGlow = (x: number, y: number) => {
      nextX = x;
      nextY = y;
      if (frame === 0) frame = window.requestAnimationFrame(applyGlow);
    };

    const onPointerMove = (event: PointerEvent) => queueGlow(event.clientX, event.clientY);
    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) queueGlow(touch.clientX, touch.clientY);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    return () => {
      if (frame !== 0) window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchstart", onTouchStart);
    };
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {!booted && <BootScreen onDone={() => setBooted(true)} />}

      <div className="grain" aria-hidden="true" />
      <div className="neon-field" aria-hidden="true" />
      <ScrollProgressBar />
      <div className="touch-glow" aria-hidden="true" />
      <Nav
        isDay={isDay}
        onThemeToggle={() => setIsDay((current) => !current)}
        accent={accent}
        onAccentChange={setAccent}
      />

      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
        <Skills />
        <Deployments />
        <Projects />
        <Certificates />
        <AmbassadorRoles />
        <Hackathons />
        <Internships />
        <Contact />
      </main>

      <Footer />
      {isBrowser && (
        <Suspense fallback={null}>
          <Terminal />
        </Suspense>
      )}
    </>
  );
}
