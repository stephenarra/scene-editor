import React from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { useStore } from "../utils/useStore";
import Box from "./Box";
import Controls from "./TransformControls";

const DataCanvas = () => {
  const { instances, setTarget } = useStore();

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [-10, 10, 10] }}
      onPointerMissed={() => setTarget(null)}
    >
      <ambientLight intensity={0.7} />
      <spotLight
        intensity={0.5}
        angle={0.1}
        penumbra={1}
        position={[10, 15, 10]}
      />
      <React.Suspense fallback={null}>
        {Object.keys(instances).map((id: string) => (
          <Box key={id} name={id} {...instances[id]} />
        ))}
        <Environment preset="city" />
      </React.Suspense>
      <Controls />
      <OrbitControls makeDefault />
    </Canvas>
  );
};

export default DataCanvas;
