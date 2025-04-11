import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import Technology from './components/Technology';
import Footer from './components/Footer';
import { Navigation } from './components/Navigation';
import { motion } from 'framer-motion';

function App() {
  return (
    <main className="w-full flex flex-col items-center justify-center">
      <motion.div 
        className='fixed w-full h-full inset-0 -z-10 overflow-hidden'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover blur-3xl opacity-50"
          ref={(el) => {
            if (el) {
              el.playbackRate = 0.7; // Adjust this value to control speed (0.5 = half speed)
            }
          }}
        >
          <source src="/assets/test.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Grain overlay on top of the video */}
        <div 
          className="absolute inset-0 w-full h-full z-10 opacity-50"
          style={{ 
            background: "url(https://grainy-gradients.vercel.app/noise.svg)",
            backgroundRepeat: "repeat",
            mixBlendMode: "overlay"
          }}
        />
      </motion.div>
      
      <Navigation />
      
      <Hero />

      <Technology />

      <Projects />

      <Footer />
      
    </main>
  );
}

export default App;
