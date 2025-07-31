import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import Technology from './components/Technology';
import Footer from './components/Footer';
import { Navigation } from './components/Navigation';
import { Banner } from './components/Banner';

function App() {
  return (
    <main className="w-full flex flex-col items-center justify-center">
      <Navigation />
      
      {/* Hero section with custom background */}
      <div className="w-full relative bg-black/30">
        <Hero />
      </div>
      
      {/* Tech section with black background */}
      <div className="w-full bg-black">
        <Technology />
      </div>

      {/* Self-hosted Server Info banner */}
      <Banner />
      
      {/* Projects section with black background */}
      <div className="w-full bg-black">
        <Projects />
      </div>
      
      {/* Footer with black background */}
      <div className="w-full bg-black">
        <Footer />
      </div>
    </main>
  );
}

export default App;
