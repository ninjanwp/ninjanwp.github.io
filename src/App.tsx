import "./App.css";
import { Projects } from "./components/Projects";
import { SmoothScrollHero } from "./components/SmoothScrollHero";
import { GlowCursor } from "./components/GlowCursor";

function App() {
  return (
    <>
      {/* Dark background layer */}
      <div className="fixed inset-0 -z-20 bg-stone-900"/>
      <main className="relative">
        <SmoothScrollHero />
        <div className="relative z-10">
          <Projects />
        </div>
      </main>
      <GlowCursor />
    </>
  );
}

export default App;
