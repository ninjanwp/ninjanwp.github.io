import "./App.css";
import { Projects } from "./components/Projects";
import { Navigation } from "./components/Navigation";
import Footer from "./components/Footer";
import { Hero } from "./components/Hero";
import Technology from "./components/Technology";

function App() {
  return (
    <>
      <div className="fixed inset-0 -z-20 bg-stone-950" />
      <main className="relative">
        <Navigation />
        <section id="hero" className="relative h-screen">
          <Hero />
        </section>
        <section id="tech" className="relative w-full min-h-screen">
          <Technology />
        </section>
        <section id="projects" className="relative w-full min-h-screen">
          <Projects />
        </section>
        <Footer />
      </main>
    </>
  );
}

export default App;
