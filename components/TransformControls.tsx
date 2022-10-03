import React from "react";
import { useThree } from "@react-three/fiber";
import { TransformControls } from "@react-three/drei";
import { useStore } from "../utils/useStore";
import { has } from "lodash";

const MODES = {
  translate: {
    property: "position",
    getValue: (target: THREE.Mesh) => target.position.toArray(),
  },
  rotate: {
    property: "rotation",
    getValue: (target: THREE.Mesh) => target.rotation.toArray().slice(0, 3), // hack: remove 4 dimensions of euler
  },
  scale: {
    property: "scale",
    getValue: (target: THREE.Mesh) => target.scale.toArray(),
  },
};

const Controls = () => {
  const { target, mode, update } = useStore();
  const { scene } = useThree();

  if (!target || !has(MODES, mode)) return null;
  return (
    <TransformControls
      object={scene.getObjectByName(target)}
      mode={mode}
      onObjectChange={(e) => {
        if (!e || mode === "cursor") return;
        const target = e.target.object;
        const value = MODES[mode].getValue(target);
        const property = MODES[mode].property;
        update(["instances", target.name, property], value);
      }}
    />
  );
};

export default Controls;
