import { Hero } from './components/Hero';
import Portfolio from './components/Portfolio';
import Footer from './components/Footer';
import { Navigation } from './components/Navigation';
import { ReactLenis } from '@studio-freight/react-lenis';
// import { Banner } from './components/Banner';

function App() {
  return (
    <ReactLenis root options={{ 
      lerp: 0.08,
      duration: 1.2,
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    }}>
      <main className="w-full flex flex-col items-center justify-center bg-black">
      <Navigation />
      
      {/* Hero section with custom background */}
      <div className="w-full relative">
        <Hero />
      </div>
      
      {/* Portfolio section combining skills and projects */}
      <div className="w-full">
        <Portfolio />
      </div>

      {/* Self-hosted Server Info banner
      <Banner /> */}
      
      {/* Footer with black background */}
      <div className="w-full">
        <Footer />
      </div>
    </main>
    </ReactLenis>
  );
}

export default App;
