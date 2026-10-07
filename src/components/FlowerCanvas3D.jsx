import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCcw, Sparkles } from 'lucide-react';

export default function FlowerCanvas3D() {
  const mountRef = useRef(null);
  const [bloomState, setBloomState] = useState(1); // 0 (bud) to 1 (full open)
  const [flowerType, setFlowerType] = useState('spider'); // 'spider' | 'rose' | 'peony' | 'lotus'
  const sceneRef = useRef(null);
  const petalsRef = useRef([]);
  const flowerGroupRef = useRef(null);
  const centerPistilRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = currentMount.clientWidth || 500;
    const height = currentMount.clientHeight || 550;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3.2, 7.5);
    camera.lookAt(0, 0, 0);

    // Renderer with luxury tone mapping and antialiasing
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    currentMount.appendChild(renderer.domElement);

    // Group for flower
    const flowerGroup = new THREE.Group();
    scene.add(flowerGroup);
    flowerGroupRef.current = flowerGroup;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xfff6ea, 1.2);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight(0xfff1d6, 3.2);
    mainKeyLight.position.set(5, 8, 6);
    scene.add(mainKeyLight);

    const goldFillLight = new THREE.DirectionalLight(0xd4af37, 2.0);
    goldFillLight.position.set(-6, -2, 4);
    scene.add(goldFillLight);

    const rimLight = new THREE.PointLight(0xff7766, 3.5, 15);
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);

    // Floating golden botanical spores / pollen particles
    const sporeCount = 65;
    const sporeGeometry = new THREE.SphereGeometry(0.025, 8, 8);
    const sporeMaterial = new THREE.MeshBasicMaterial({
      color: 0xedd68a,
      transparent: true,
      opacity: 0.85
    });
    const sporeGroup = new THREE.Group();
    for (let i = 0; i < sporeCount; i++) {
      const spore = new THREE.Mesh(sporeGeometry, sporeMaterial);
      spore.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6
      );
      sporeGroup.add(spore);
    }
    scene.add(sporeGroup);

    // Builder function for curved organic petals
    const createCurvedPetalGeometry = (width = 1, length = 2, curvature = 0.45) => {
      const shape = new THREE.Shape();
      // Natural organic petal curve outline
      shape.moveTo(0, 0);
      shape.bezierCurveTo(width * 0.7, length * 0.2, width * 0.9, length * 0.7, 0, length);
      shape.bezierCurveTo(-width * 0.9, length * 0.7, -width * 0.7, length * 0.2, 0, 0);

      const geometry = new THREE.ShapeGeometry(shape, 18);
      const pos = geometry.attributes.position;

      // Displace vertices to form rich 3D concave hollow curve
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        // Cup shape curve
        const zDisplacement = -Math.sin((y / length) * Math.PI) * curvature * (1 - Math.abs(x / width) * 0.4);
        pos.setZ(i, zDisplacement);
      }
      geometry.computeVertexNormals();
      return geometry;
    };

    // Build the Flower Petals & Layers
    const buildFlower = (type = 'rose') => {
      // Clear existing petals
      while (flowerGroup.children.length > 0) {
        const obj = flowerGroup.children[0];
        flowerGroup.remove(obj);
        if (obj.geometry) obj.geometry.dispose();
      }
      petalsRef.current = [];

      // Color scheme based on type
      let petalColor = 0xb82638; // Royal Velvet Rose
      let petalRoughness = 0.35;
      let layerCount = 6;
      let petalsPerLayer = [3, 4, 6, 8, 10, 12];
      const isSpiderLily = type === 'spider';
      if (isSpiderLily) {
        petalColor = 0xa8102d;
        petalRoughness = 0.26;
        petalsPerLayer = [6];
      }

      if (type === 'peony') {
        petalColor = 0xe88a9c; // Pearl French Peony
        petalRoughness = 0.4;
        petalsPerLayer = [4, 6, 8, 10, 12, 14];
      } else if (type === 'lotus') {
        petalColor = 0xece3d4; // Ivory Royal Lotus
        petalRoughness = 0.25;
        petalsPerLayer = [3, 5, 7, 9, 11];
      }

      const petalMaterial = new THREE.MeshPhysicalMaterial({
        color: petalColor,
        roughness: petalRoughness,
        metalness: 0.08,
        clearcoat: 0.35,
        clearcoatRoughness: 0.2,
        transmission: 0.12, // light shines slightly through thin petals
        thickness: 0.3,
        side: THREE.DoubleSide
      });

      // Stem
      const stemCurve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(0, -0.2, 0),
        new THREE.Vector3(0.1, -1.2, 0),
        new THREE.Vector3(-0.15, -2.2, 0.1),
        new THREE.Vector3(0, -3.2, 0)
      );
      const stemGeometry = new THREE.TubeGeometry(stemCurve, 24, 0.09, 10, false);
      const stemMaterial = new THREE.MeshStandardMaterial({
        color: 0x273b2a,
        roughness: 0.6
      });
      const stemMesh = new THREE.Mesh(stemGeometry, stemMaterial);
      flowerGroup.add(stemMesh);

      // Calyx Leaves
      const sepalGeo = createCurvedPetalGeometry(0.35, 1.2, 0.25);
      const sepalMat = new THREE.MeshStandardMaterial({ color: 0x2e4632, side: THREE.DoubleSide });
      for (let s = 0; s < 5; s++) {
        const sepal = new THREE.Mesh(sepalGeo, sepalMat);
        const sAngle = (s / 5) * Math.PI * 2;
        sepal.rotation.z = Math.PI * 0.85;
        sepal.rotation.y = sAngle;
        sepal.position.set(0, -0.1, 0);
        flowerGroup.add(sepal);
      }

      // Golden Center Core / Pistil
      const centerGeo = new THREE.SphereGeometry(0.25, 20, 20);
      const centerMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        roughness: 0.3,
        metalness: 0.7
      });
      const centerPistil = new THREE.Mesh(centerGeo, centerMat);
      centerPistil.position.set(0, 0.2, 0);
      flowerGroup.add(centerPistil);
      centerPistilRef.current = centerPistil;

      // Lycoris has long, arcing filaments with gold anthers; other blooms use a dense pollen crown.
      if (isSpiderLily) {
        for (let st = 0; st < 8; st++) {
          const theta = (st / 8) * Math.PI * 2;
          const start = new THREE.Vector3(Math.cos(theta) * 0.08, 0.28, Math.sin(theta) * 0.08);
          const end = new THREE.Vector3(Math.cos(theta) * (0.85 + (st % 2) * 0.22), 1.65 + (st % 3) * 0.12, Math.sin(theta) * (0.85 + (st % 2) * 0.22));
          const mid = start.clone().lerp(end, 0.55).add(new THREE.Vector3(Math.cos(theta) * 0.16, 0.24, Math.sin(theta) * 0.16));
          const filamentCurve = new THREE.QuadraticBezierCurve3(start, mid, end);
          flowerGroup.add(new THREE.Mesh(new THREE.TubeGeometry(filamentCurve, 18, 0.018, 6, false), new THREE.MeshStandardMaterial({ color: 0xe5b84b, roughness: 0.38, metalness: 0.35 })));
          const anther = new THREE.Mesh(new THREE.SphereGeometry(0.055, 12, 10), centerMat);
          anther.scale.set(0.75, 1.7, 0.75);
          anther.position.copy(end);
          flowerGroup.add(anther);
        }
      } else for (let st = 0; st < 32; st++) {
        const stGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.35);
        const stMesh = new THREE.Mesh(stGeo, centerMat);
        const stTheta = Math.random() * Math.PI * 2;
        const stPhi = (Math.PI / 4) + Math.random() * 0.4;
        stMesh.position.set(
          Math.sin(stPhi) * Math.cos(stTheta) * 0.25,
          0.28 + Math.cos(stPhi) * 0.15,
          Math.sin(stPhi) * Math.sin(stTheta) * 0.25
        );
        stMesh.rotation.x = Math.sin(stTheta) * 0.6;
        stMesh.rotation.z = Math.cos(stTheta) * 0.6;
        flowerGroup.add(stMesh);
      }

      // Layered Petals
      const allPetalNodes = [];

      petalsPerLayer.forEach((count, layerIndex) => {
        const layerProgress = layerIndex / (petalsPerLayer.length - 1);
        const pWidth = isSpiderLily ? 0.22 : 0.55 + layerProgress * 0.85;
        const pLength = isSpiderLily ? 2.15 : 0.95 + layerProgress * 1.35;
        const pCurve = isSpiderLily ? 0.14 : 0.55 - layerProgress * 0.25;

        const petalGeo = createCurvedPetalGeometry(pWidth, pLength, pCurve);

        for (let i = 0; i < count; i++) {
          const petalMesh = new THREE.Mesh(petalGeo, petalMaterial);
          const angle = (i / count) * Math.PI * 2 + (layerIndex * 0.6); // spiral offset

          // Initial bud angle vs full bloom target angle
          const closedTilt = isSpiderLily ? 0.08 : 0.25 + layerProgress * 0.45;
          const openTilt = isSpiderLily ? 1.38 : 0.55 + layerProgress * 0.9;

          const pivotGroup = new THREE.Group();
          pivotGroup.position.set(0, 0.15 + layerIndex * 0.06, 0);
          pivotGroup.rotation.y = angle;

          petalMesh.rotation.x = closedTilt;
          petalMesh.position.y = 0;

          pivotGroup.add(petalMesh);
          flowerGroup.add(pivotGroup);

          allPetalNodes.push({
            mesh: petalMesh,
            layerIndex,
            closedTilt,
            openTilt
          });
        }
      });

      petalsRef.current = allPetalNodes;
    };

    buildFlower(flowerType);

    // Mouse / Touch Interaction Controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationX = 0.35;
    let targetRotationY = -0.5;

    const onMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging) {
        // Subtle organic parallax hover
        const rect = currentMount.getBoundingClientRect();
        const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        targetRotationY = normX * 0.6;
        targetRotationX = 0.35 - normY * 0.4;
        return;
      }

      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      targetRotationY += deltaX * 0.009;
      targetRotationX += deltaY * 0.009;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Touch events for mobile
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;
      targetRotationY += deltaX * 0.009;
      targetRotationX += deltaY * 0.009;
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd = () => {
      isDragging = false;
    };

    currentMount.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    currentMount.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth damping rotation
      flowerGroup.rotation.y += (targetRotationY - flowerGroup.rotation.y) * 0.05 + 0.002;
      flowerGroup.rotation.x += (targetRotationX - flowerGroup.rotation.x) * 0.05;

      // Subtle breathing float motion
      flowerGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.12;

      // Animate floating pollen spores
      sporeGroup.children.forEach((spore, index) => {
        spore.position.y += Math.sin(elapsedTime + index) * 0.003;
        spore.position.x += Math.cos(elapsedTime * 0.5 + index) * 0.002;
      });

      // Update petal bloom state
      petalsRef.current.forEach((p) => {
        const currentTargetTilt = p.closedTilt + (p.openTilt - p.closedTilt) * bloomState;
        p.mesh.rotation.x += (currentTargetTilt - p.mesh.rotation.x) * 0.08;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Window Resize Handler
    const handleResize = () => {
      if (!currentMount) return;
      const newWidth = currentMount.clientWidth;
      const newHeight = currentMount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      currentMount.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      currentMount.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);

      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [flowerType, bloomState]);

  return (
    <div className="relative w-full h-[420px] sm:h-[500px] lg:h-[560px] flex items-center justify-center select-none">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        title="Click & Drag to rotate flower in 3D"
      />

      {/* Floating 3D Control Pill */}
      <div className="absolute bottom-3 inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-20 flex flex-wrap items-center justify-center gap-2 bg-[#172118]/85 backdrop-blur-md px-4 py-2.5 rounded-full border border-[#D4AF37]/30 shadow-2xl text-xs">
        
        {/* Flower selector */}
        <div className="flex items-center gap-1 border-r border-white/20 pr-2 sm:gap-1.5 sm:pr-3">
          <button onClick={() => setFlowerType('spider')} className={`px-2 py-1 rounded-full text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold transition-all ${flowerType === 'spider' ? 'bg-[#A8102D] text-white shadow' : 'text-[#DDD7CB] hover:text-white'}`}>Spider Lily</button>
          <button
            onClick={() => setFlowerType('rose')}
            className={`px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold transition-all ${
              flowerType === 'rose'
                ? 'bg-[#A32A38] text-white shadow'
                : 'text-[#DDD7CB] hover:text-white'
            }`}
          >
            Velvet Rose
          </button>
          <button
            onClick={() => setFlowerType('peony')}
            className={`px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold transition-all ${
              flowerType === 'peony'
                ? 'bg-[#E08398] text-[#19221A] shadow font-bold'
                : 'text-[#DDD7CB] hover:text-white'
            }`}
          >
            Peony
          </button>
          <button
            onClick={() => setFlowerType('lotus')}
            className={`px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold transition-all ${
              flowerType === 'lotus'
                ? 'bg-[#EAE4D5] text-[#19221A] shadow font-bold'
                : 'text-[#DDD7CB] hover:text-white'
            }`}
          >
            Lotus
          </button>
        </div>

        {/* Bloom / Close Slider */}
        <div className="flex items-center gap-2 text-[#E7E2D6] text-[11px] pl-1">
          <span className="text-[10px] uppercase tracking-wider text-[#C49B5C]">Bud</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={bloomState}
            onChange={(e) => setBloomState(parseFloat(e.target.value))}
            className="w-20 sm:w-24 accent-[#C49B5C] cursor-pointer"
            title="Bloom flower"
          />
          <span className="text-[10px] uppercase tracking-wider text-[#C49B5C]">Bloom</span>
        </div>

        {/* Reset / Drag hint */}
        <div className="hidden sm:flex items-center gap-1 text-[10px] text-[#A8AFA3] pl-2 border-l border-white/20">
          <Sparkles className="w-3 h-3 text-[#D4AF37]" />
          <span>Interactive 3D · Drag to Rotate</span>
        </div>

      </div>
    </div>
  );
}
