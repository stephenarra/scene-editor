import { useState } from "react";
import { useCursor, Html, Edges } from "@react-three/drei";
import * as THREE from "three";
import { useStore } from "../utils/useStore";

interface Props {
  name: string;
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale: THREE.Vector3;
  color: string;
}

const Box = ({ name, color, ...props }: Props) => {
  const { target, setTarget } = useStore();
  const [hovered, setHovered] = useState(false);

  const isSelected = target === name;
  useCursor(hovered);

  return (
    <mesh
      {...props}
      name={name}
      onClick={(e) => setTarget(e.object.name)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry />
      <meshPhysicalMaterial
        color={color}
        roughness={0.65}
        thickness={2}
        envMapIntensity={1}
        transmission={0}
        metalness={0}
      />
      {isSelected && (
        <>
          {/* <Html position={[0.6, 0.5, 0.5]}>
            <div>First</div>
          </Html> */}
          <Edges visible={true} scale={1} threshold={15} renderOrder={1000}>
            <meshBasicMaterial
              transparent
              color="#333"
              side={THREE.DoubleSide}
            />
          </Edges>
        </>
      )}
    </mesh>
  );
};

export default Box;
