import React from "react";
import cx from "classnames";
import { useStore } from "../utils/useStore";

const Layers = () => {
  const [target, setTarget] = useStore((state) => [
    state.target,
    state.setTarget,
  ]);
  const instances = useStore((state) => state.instances);

  return (
    <div>
      <div className="px-3 py-1 font-semibold">Layers</div>
      {Object.keys(instances).map((id) => {
        const instance = instances[id];
        return (
          <div
            key={id}
            className={cx("px-3 py-1", {
              "bg-blue-100": target === id,
            })}
            onClick={() => {
              setTarget(id);
            }}
          >
            <div>{instance.displayName}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Layers;
