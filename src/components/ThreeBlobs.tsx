import { useEffect, useRef } from 'react';
import { MotionValue } from 'framer-motion';
import * as THREE from 'three';

interface ThreeBlobsProps {
  scrollProgress: MotionValue<number>;
}

export const ThreeBlobs = ({ scrollProgress }: ThreeBlobsProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const blobsRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create blobs with dynamic resolution based on screen size
    const blobs: THREE.Mesh[] = [];
    
    // Adjust resolution based on screen size for better performance
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth < 1024;
    
    let segments = 64; // Default for desktop
    if (isMobile) {
      segments = 24; // Lower resolution for mobile
    } else if (isTablet) {
      segments = 40; // Medium resolution for tablet
    }
    
    for (let i = 0; i < 1000; i++) {
      // Create blob geometry using sphere with noise
      const geometry = new THREE.SphereGeometry(0.1 + Math.random() * 1.5, segments, segments);
      
      // Add some noise to make it more organic
      const positions = geometry.attributes.position;
      for (let j = 0; j < positions.count; j++) {
        const x = positions.getX(j);
        const y = positions.getY(j);
        const z = positions.getZ(j);
        
        const noise = Math.sin(x * 3) * Math.cos(y * 3) * Math.sin(z * 3) * 0.15;
        positions.setXYZ(j, x + noise, y + noise, z + noise);
      }
      
      const material = new THREE.MeshPhongMaterial({
        color: 0x1d4ed8,
        emissive: 0x1d4ed8,
        transparent: true,
        dithering: true,
        opacity: 0.9,
        shininess: 100,
        specular: 0x1d4ed8,
        side: THREE.DoubleSide
      });
      
      const blob = new THREE.Mesh(geometry, material);
      blob.position.x = (Math.random() - 0.5) * 10; // Much wider spread - spawn off-screen on both sides
      blob.position.y = 15 + Math.random() * 15; // Start off-screen above
      blob.position.z = (Math.random() - 0.5) * 3;
      
      scene.add(blob);
      blobs.push(blob);
    }
    blobsRef.current = blobs;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Smooth interpolation for all blobs
      blobs.forEach((blob) => {
        if (blob.userData.targetY !== undefined) {
          blob.position.y += (blob.userData.targetY - blob.position.y) * 0.05;
        }
        if (blob.userData.targetRotX !== undefined) {
          blob.rotation.x += (blob.userData.targetRotX - blob.rotation.x) * 0.05;
        }
        if (blob.userData.targetRotY !== undefined) {
          blob.rotation.y += (blob.userData.targetRotY - blob.rotation.y) * 0.05;
        }
        if (blob.userData.targetRotZ !== undefined) {
          blob.rotation.z += (blob.userData.targetRotZ - blob.rotation.z) * 0.05;
        }
      });
      
      renderer.render(scene, camera);
    };
    
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update blob positions when scroll changes
  useEffect(() => {
    if (!blobsRef.current.length) return;
    
    const unsubscribe = scrollProgress.on('change', (value) => {
              blobsRef.current.forEach((blob, index) => {
          // Store target values for smooth interpolation
          const startY = 15 + (index * 0.5);
          
          // Make blobs fall down when scrolling down, and return up when scrolling back up
          const targetY = startY - (value * 60);
          
          // Store targets on the blob object for interpolation
          if (!blob.userData.startY) blob.userData.startY = startY;
          if (!blob.userData.targetRotX) blob.userData.targetRotX = 0;
          if (!blob.userData.targetRotY) blob.userData.targetRotY = 0;
          if (!blob.userData.targetRotZ) blob.userData.targetRotZ = 0;
          
          blob.userData.targetY = targetY;
          blob.userData.targetRotX = value * Math.PI * 2;
          blob.userData.targetRotY = value * Math.PI * 1.5;
          blob.userData.targetRotZ = value * Math.PI * 0.8;
        });
    });
    
    return unsubscribe;
  }, [scrollProgress]);



  return (
    <div ref={mountRef} className="absolute inset-0 pointer-events-none" />
  );
};
