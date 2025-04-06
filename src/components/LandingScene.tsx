
import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

interface NodeProps {
  position: [number, number, number];
  color?: string;
  size?: number;
  isActive?: boolean;
  pulsing?: boolean;
}

const Node: React.FC<NodeProps> = ({ position, color = '#06b6d4', size = 0.2, isActive = false, pulsing = false }) => {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  
  const nodeColor = useMemo(() => new THREE.Color(color), [color]);
  const emissiveIntensity = isActive ? 0.8 : 0.4;

  useFrame((state) => {
    if (!ref.current) return;
    if (pulsing) {
      const t = state.clock.getElapsedTime();
      ref.current.scale.setScalar(size * (1 + Math.sin(t * 2) * 0.1));
    }
  });

  return (
    <mesh 
      ref={ref} 
      position={position}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial 
        color={nodeColor} 
        emissive={nodeColor} 
        emissiveIntensity={hovered ? 1 : emissiveIntensity} 
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
};

interface EdgeProps {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
  thickness?: number;
}

const Edge: React.FC<EdgeProps> = ({ start, end, color = '#3b82f6', thickness = 0.03 }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  const [startVec, endVec] = useMemo(() => {
    return [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  }, [start, end]);

  const edgeGeometry = useMemo(() => {
    const direction = new THREE.Vector3().subVectors(endVec, startVec);
    const center = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
    const length = direction.length();
    
    const cylinderGeometry = new THREE.CylinderGeometry(thickness, thickness, length, 8, 1);
    cylinderGeometry.translate(0, length / 2, 0);
    cylinderGeometry.rotateX(Math.PI / 2);
    return cylinderGeometry;
  }, [startVec, endVec, thickness]);

  useFrame(() => {
    if (!ref.current) return;
    const direction = new THREE.Vector3().subVectors(endVec, startVec);
    const center = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
    ref.current.position.copy(center);
    ref.current.lookAt(endVec);
    ref.current.rotateX(Math.PI / 2);
  });

  return (
    <mesh ref={ref} geometry={edgeGeometry}>
      <meshStandardMaterial 
        color={color} 
        emissive={color} 
        emissiveIntensity={0.3} 
        transparent
        opacity={0.7}
        roughness={0.4}
      />
    </mesh>
  );
};

interface NetworkData {
  nodes: {
    id: string;
    position: [number, number, number];
    category?: string;
    pulsing?: boolean;
  }[];
  edges: {
    source: string;
    target: string;
  }[];
}

const NeuralNetwork: React.FC<{ data: NetworkData }> = ({ data }) => {
  const nodePositions = useMemo(() => {
    return data.nodes.reduce((acc, node) => {
      acc[node.id] = node.position;
      return acc;
    }, {} as Record<string, [number, number, number]>);
  }, [data.nodes]);

  const getCategoryColor = (category?: string) => {
    switch(category) {
      case 'work': return '#06b6d4'; // cyan
      case 'wellness': return '#10b981'; // green
      case 'learning': return '#8b5cf6'; // purple
      case 'creativity': return '#f59e0b'; // amber
      default: return '#3b82f6'; // blue
    }
  };

  return (
    <group>
      {data.nodes.map((node) => (
        <Node 
          key={node.id} 
          position={node.position} 
          color={getCategoryColor(node.category)}
          pulsing={node.pulsing}
          isActive={node.category === 'work'}
        />
      ))}
      
      {data.edges.map((edge, i) => (
        <Edge 
          key={i}
          start={nodePositions[edge.source]}
          end={nodePositions[edge.target]}
        />
      ))}
    </group>
  );
};

// Animation for the entire network
const AnimatedNetwork: React.FC<{ data: NetworkData }> = ({ data }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime() * 0.1;
    groupRef.current.rotation.y = Math.sin(t) * 0.1;
    groupRef.current.rotation.x = Math.cos(t * 0.7) * 0.05;
  });
  
  return (
    <group ref={groupRef}>
      <NeuralNetwork data={data} />
    </group>
  );
};

export const LandingScene: React.FC = () => {
  // Sample network data
  const networkData: NetworkData = useMemo(() => ({
    nodes: [
      { id: '1', position: [0, 0, 0], category: 'work', pulsing: true },
      { id: '2', position: [1.5, 0.5, 1], category: 'wellness' },
      { id: '3', position: [-1, 1, 0.5], category: 'learning' },
      { id: '4', position: [0.5, -1, -0.5], category: 'creativity' },
      { id: '5', position: [-0.8, -0.5, 1.5] },
      { id: '6', position: [2, -0.3, -1] },
      { id: '7', position: [-1.5, 0.2, -1.2] },
      { id: '8', position: [1, 1.5, -0.5] },
      { id: '9', position: [-0.5, -1.5, -1] },
      { id: '10', position: [0.7, 0.7, 2] },
    ],
    edges: [
      { source: '1', target: '2' },
      { source: '1', target: '3' },
      { source: '1', target: '4' },
      { source: '1', target: '5' },
      { source: '2', target: '6' },
      { source: '3', target: '7' },
      { source: '4', target: '8' },
      { source: '5', target: '9' },
      { source: '3', target: '8' },
      { source: '2', target: '10' },
    ]
  }), []);

  return (
    <Canvas 
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: true }}
      className="!fixed inset-0 bg-neural-background bg-no-repeat"
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
      
      <AnimatedNetwork data={networkData} />
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        rotateSpeed={0.3}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
};
