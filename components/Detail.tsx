import React from "react";
import { useStore } from "../utils/useStore";
import Vector3 from "./Vector3Input";

const Detail = () => {
  const target = useStore((state) => state.target);
  const instance = useStore(
    (state) => state.target && state.instances[state.target]
  );
  const update = useStore((state) => state.update);
  if (!instance) return null;

  return (
    <div className="px-3">
      <div className="py-1 font-semibold">{instance.displayName}</div>
      <div className="mb-2">
        <div>Position</div>
        <Vector3
          value={instance.position}
          onChange={(val) => {
            update(["instances", target, "position"], val);
          }}
        />
      </div>
      <div className="mb-2">
        <div>Rotation</div>
        <Vector3
          value={instance.rotation}
          onChange={(val) => {
            update(["instances", target, "rotation"], val);
          }}
        />
      </div>
      <div className="mb-2">
        <div>Scale</div>
        <Vector3
          value={instance.scale}
          onChange={(val) => {
            update(["instances", target, "scale"], val);
          }}
        />
      </div>
      <div>
        <div>Color</div>
        <div>{instance.color}</div>
      </div>
    </div>
  );
};

export default Detail;
