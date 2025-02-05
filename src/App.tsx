import "./App.css";
import { Projects } from "./components/Projects";

import { SmoothScrollHero } from "./components/SmoothScrollHero";

function App() {
  return (
    <div className="bg-zinc-950">
      <SmoothScrollHero />
      <Projects />
    </div>
  );
}

export default App;
