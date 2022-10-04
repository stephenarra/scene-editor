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
  const [hovered, setHovered] = useState(false);
  const [target, setTarget] = useStore((state) => [
    state.target,
    state.setTarget,
  ]);
  const presence = useStore((state) => state.presence);
  const otherUsers = Object.keys(presence)
    .map((id) => ({ ...presence[id], id }))
    .filter((d) => d.selected === name);

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
      {!!isSelected && (
        <Edges visible={true} scale={1} threshold={15} renderOrder={1000}>
          <meshBasicMaterial transparent color="#333" side={THREE.DoubleSide} />
        </Edges>
      )}
      {!!otherUsers.length && (
        <>
          <Html position={[0.6, 0.5, 0.5]}>
            {otherUsers.map((d) => (
              <div key={d.id}>{d.name}</div>
            ))}
          </Html>
          <Edges visible={true} scale={1.1} threshold={15} renderOrder={1000}>
            <meshBasicMaterial transparent color={otherUsers[0].color} />
          </Edges>
        </>
      )}
    </mesh>
  );
};

export default Box;
