import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface ThreeOrigamiProps {
  className?: string;
}

export const ThreeOrigami = ({ className = "" }: ThreeOrigamiProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const frameRef = useRef<number>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const modelRef = useRef<THREE.Group>();
  const scrollTimeoutRef = useRef<number>();

  // Model position - single source of truth (accessible to all functions)

  const cameraRadius = 12;

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45, // Reduced field of view to fit model better in frame
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    // Set fixed camera position
    camera.position.set(0, -1, cameraRadius); // Fixed camera position, slightly lower for mobile
    camera.lookAt(0, 0, 0); // Look directly at model position
    cameraRef.current = camera;
    


    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    
    mountRef.current.appendChild(renderer.domElement);

    // No lighting for silhouette effect

    // Load GLTF running model
    const loader = new GLTFLoader();
    console.log('Starting to load running model...');
    
    loader.load(
      '/models/running/scene.gltf',
      (gltf) => {
        console.log('Running model loaded successfully:', gltf);
        
        const model = gltf.scene;
        
        // Scale and position the running model  
        model.scale.setScalar(4); // Larger scale
        model.position.set(0, -5, 0); // Centered horizontally, lowered vertically
        model.rotation.y = Math.PI / 4;
        

        
        // Create silhouette effect - apply white material to all meshes
        const silhouetteMaterial = new THREE.MeshBasicMaterial({ 
          color: 0xF54927 // Pure white for silhouette
        });
        
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = silhouetteMaterial; // Apply white silhouette material
            child.castShadow = false;
            child.receiveShadow = false;
          }
        });

        // Play animation if it exists
        let mixer: THREE.AnimationMixer | null = null;
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);
          const action = mixer.clipAction(gltf.animations[0]);
          action.play();
        }

        scene.add(model);
        modelRef.current = model; // Store reference for rotation
        console.log('Running model added to scene');

        // Animation loop with scroll-based animation
        let lastTime = 0;
        const targetFPS = 30;
        const frameInterval = 1000 / targetFPS;
        
        const animate = (currentTime: number) => {
          frameRef.current = requestAnimationFrame(animate);
          
          if (currentTime - lastTime >= frameInterval) {
            
            // Update animation mixer based on scroll progress
            if (mixer) {
              const scrollY = window.scrollY;
              const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
              const scrollProgress = Math.min(scrollY / maxScroll, 1);
              
              // Set animation to specific frame based on scroll position
              // Multiply by 3 to get 3 full running cycles across the page
              const action = mixer.clipAction(gltf.animations[0]);
              const animationDuration = action.getClip().duration;
              const targetTime = (scrollProgress * 3) % 1 * animationDuration;
              mixer.setTime(targetTime);
            }
            
            renderer.render(scene, camera);
            lastTime = currentTime;
          }
        };
        
        // Start animation loop
        animate(0);
      },
      (progress) => {
        console.log('Running model loading progress:', (progress.loaded / progress.total * 100) + '%');
      },
      (error) => {
        console.error('Error loading running model:', error);
        console.error('Full error details:', error);
      }
    );

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    // Handle scroll for model scaling
    const handleScroll = () => {
      if (!cameraRef.current || !modelRef.current) return;
      
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight; // Assume hero section is one viewport height
      
      // Calculate scale based on hero scroll progress
      const heroScrollProgress = Math.min(scrollY / heroHeight, 1);
      
      // Scale from 4 to 8 during hero section, then maintain at 8
      const baseScale = 5;
      const maxScale = 5;
      const currentScale = baseScale + (heroScrollProgress * (maxScale - baseScale));
      const finalScale = scrollY >= heroHeight ? maxScale : currentScale;
      
      modelRef.current.scale.setScalar(finalScale);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    // Initialize camera position based on current scroll
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      if (renderer) {
        renderer.dispose();
      }
      
      if (scene) {
        scene.clear();
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className={`w-full h-full ${className}`}
      style={{ minHeight: '400px' }}
    />
  );
};
