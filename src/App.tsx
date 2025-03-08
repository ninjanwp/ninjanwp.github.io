import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import Technology from './components/Technology';
import Footer from './components/Footer';
import { Navigation } from './components/Navigation';

function App() {
  return (
    <main className="w-full flex flex-col items-center justify-center">
<Navigation />
      
      <Hero />

      <Technology />

      <Projects />

      <Footer />
    </main>
  );
}

export default App;
