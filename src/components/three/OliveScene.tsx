"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";

/**
 * Scène d'ambiance du hero : une branche d'olivier suspendue dans le noir,
 * quelques olives en lévitation et une poussière d'or.
 *
 * Contraintes retenues : lourdement mobile-first (densité et DPR réduits sur
 * petit écran), aucune texture externe (tout est procédural), et arrêt complet
 * du rendu si l'utilisateur a demandé moins de mouvement.
 */

const GOLD = new THREE.Color("#c19749");
const GOLD_LIGHT = new THREE.Color("#e9d5a5");
const OLIVE_DARK = new THREE.Color("#3d5423");
const LEAF = new THREE.Color("#5c7539");

/* ------------------------------------------------------------------ */
/* Géométries partagées — créées une seule fois pour tout l'arbre       */
/* ------------------------------------------------------------------ */

function useLeafGeometry() {
  return useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.17, 0.24, 0.17, 0.76, 0, 1);
    shape.bezierCurveTo(-0.17, 0.76, -0.17, 0.24, 0, 0);
    return new THREE.ShapeGeometry(shape, 14);
  }, []);
}

function useOliveGeometry() {
  return useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 28, 20);
    geo.scale(0.66, 0.9, 0.66);
    return geo;
  }, []);
}

/* ------------------------------------------------------------------ */
/* Olive                                                               */
/* ------------------------------------------------------------------ */

function Olive({
  position,
  scale = 1,
  phase = 0,
  tilt = 0,
}: {
  position: [number, number, number];
  scale?: number;
  phase?: number;
  tilt?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const geometry = useOliveGeometry();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() + phase;
    ref.current.position.y = position[1] + Math.sin(t * 0.55) * 0.16;
    ref.current.rotation.y = t * 0.22;
    ref.current.rotation.z = tilt + Math.sin(t * 0.4) * 0.09;
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh geometry={geometry} castShadow={false}>
        <meshPhysicalMaterial
          color={OLIVE_DARK}
          roughness={0.22}
          metalness={0.05}
          clearcoat={0.85}
          clearcoatRoughness={0.16}
          sheen={0.4}
          sheenColor={GOLD}
        />
      </mesh>
      {/* Pédoncule */}
      <mesh position={[0, 0.92, 0]} rotation={[0, 0, 0.16]}>
        <cylinderGeometry args={[0.028, 0.038, 0.3, 6]} />
        <meshStandardMaterial color="#6b6a4a" roughness={0.85} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Branche d'olivier                                                   */
/* ------------------------------------------------------------------ */

function Branch({
  position,
  rotation,
  scale = 1,
  leafCount = 9,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
  leafCount?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const leafGeometry = useLeafGeometry();

  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-2.4, -0.35, 0),
        new THREE.Vector3(-1.1, 0.16, 0.18),
        new THREE.Vector3(0.3, 0.3, -0.1),
        new THREE.Vector3(1.7, 0.05, 0.12),
        new THREE.Vector3(2.6, -0.3, 0),
      ]),
    [],
  );

  const tube = useMemo(
    () => new THREE.TubeGeometry(curve, 48, 0.028, 6, false),
    [curve],
  );

  /** Feuilles réparties le long de la courbe, alternées de part et d'autre. */
  const leaves = useMemo(() => {
    return Array.from({ length: leafCount }, (_, i) => {
      const u = 0.08 + (i / (leafCount - 1)) * 0.86;
      const point = curve.getPointAt(u);
      const side = i % 2 === 0 ? 1 : -1;
      return {
        key: i,
        position: [point.x, point.y, point.z] as [number, number, number],
        rotation: [
          Math.PI / 2 + side * 0.35,
          (i * 0.7) % Math.PI,
          side * (0.7 + (i % 3) * 0.18),
        ] as [number, number, number],
        scale: 0.42 + ((i * 37) % 11) / 55,
      };
    });
  }, [curve, leafCount]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.z = rotation[2] + Math.sin(t * 0.3) * 0.035;
    ref.current.position.y = position[1] + Math.sin(t * 0.42) * 0.07;
  });

  return (
    <group ref={ref} position={position} rotation={rotation} scale={scale}>
      <mesh geometry={tube}>
        <meshStandardMaterial color="#544c38" roughness={0.9} metalness={0.05} />
      </mesh>

      {leaves.map((leaf) => (
        <mesh
          key={leaf.key}
          geometry={leafGeometry}
          position={leaf.position}
          rotation={leaf.rotation}
          scale={leaf.scale}
        >
          <meshStandardMaterial
            color={LEAF}
            roughness={0.55}
            metalness={0.15}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Deux olives accrochées à la branche */}
      <Olive position={[-0.7, -0.16, 0.1]} scale={0.15} phase={1.4} />
      <Olive position={[1.15, -0.2, -0.05]} scale={0.13} phase={2.7} tilt={0.3} />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Poussière d'or                                                      */
/* ------------------------------------------------------------------ */

function GoldDust({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);

  const { geometry, material } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
      scales[i] = Math.random();
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));

    const mat = new THREE.PointsMaterial({
      size: 0.032,
      color: GOLD_LIGHT,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    return { geometry: geo, material: mat };
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.018;
    const positions = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = positions.array as Float32Array;
    // Dérive verticale très lente, avec rebouclage en bas de scène.
    for (let i = 0; i < count; i++) {
      array[i * 3 + 1] += 0.0016 + (i % 5) * 0.00035;
      if (array[i * 3 + 1] > 3.6) array[i * 3 + 1] = -3.6;
    }
    positions.needsUpdate = true;
  });

  return <points ref={ref} geometry={geometry} material={material} />;
}

/* ------------------------------------------------------------------ */
/* Parallaxe pointeur                                                  */
/* ------------------------------------------------------------------ */

function ParallaxRig({ children, strength = 0.14 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!ref.current) return;
    // Amortissement : la scène suit le pointeur avec une belle inertie.
    ref.current.rotation.y += (pointer.x * strength - ref.current.rotation.y) * 0.03;
    ref.current.rotation.x += (-pointer.y * strength * 0.6 - ref.current.rotation.x) * 0.03;
  });

  return <group ref={ref}>{children}</group>;
}

/* ------------------------------------------------------------------ */
/* Scène                                                               */
/* ------------------------------------------------------------------ */

function Scene({ dense }: { dense: boolean }) {
  return (
    <>
      <ambientLight intensity={0.28} />
      {/* Clé chaude en haut à droite : c'est elle qui « dore » les arêtes. */}
      <directionalLight position={[4, 6, 4]} intensity={1.5} color={GOLD_LIGHT} />
      {/* Contre-jour froid pour détacher les silhouettes du fond noir. */}
      <directionalLight position={[-5, -2, -3]} intensity={0.5} color="#7d8f6a" />
      <pointLight position={[0, 0, 3]} intensity={12} distance={9} color={GOLD} />

      <ParallaxRig>
        <Branch position={[-0.6, 1.7, -1.2]} rotation={[0.2, 0.25, -0.14]} scale={dense ? 1 : 0.82} />
        <Branch
          position={[1.4, -1.9, -2.2]}
          rotation={[-0.25, -0.4, 2.95]}
          scale={dense ? 0.8 : 0.62}
          leafCount={7}
        />

        <Olive position={[-2.9, 0.4, -0.6]} scale={0.3} phase={0} tilt={-0.25} />
        <Olive position={[2.85, 1.15, -1.1]} scale={0.24} phase={2.1} tilt={0.4} />
        <Olive position={[-2.2, -1.5, -0.2]} scale={0.19} phase={3.6} tilt={0.12} />
        {dense && (
          <>
            <Olive position={[3.3, -0.9, -1.8]} scale={0.16} phase={4.9} tilt={-0.5} />
            <Olive position={[-3.6, 1.8, -2.4]} scale={0.13} phase={1.2} tilt={0.6} />
          </>
        )}

        <GoldDust count={dense ? 420 : 170} />
      </ParallaxRig>
    </>
  );
}

export default function OliveScene({ className = "" }: { className?: string }) {
  const [enabled, setEnabled] = useState(false);
  const [dense, setDense] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Sur les très petits écrans le hero est déjà chargé visuellement :
    // la 3D y apporte peu et coûte cher en batterie.
    const wide = window.matchMedia("(min-width: 768px)").matches;
    setEnabled(!reduced);
    setDense(wide);
  }, []);

  if (!enabled) return null;

  return (
    <div className={className} aria-hidden>
      <Canvas
        dpr={[1, dense ? 1.75 : 1.4]}
        camera={{ position: [0, 0, 6.2], fov: 42 }}
        gl={{ antialias: dense, alpha: true, powerPreference: "high-performance" }}
        frameloop="always"
      >
        <Scene dense={dense} />
      </Canvas>
    </div>
  );
}
