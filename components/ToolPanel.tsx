import cx from "classnames";
import { useStore, Mode } from "../utils/useStore";
import { FaMousePointer } from "react-icons/fa";
import { BsArrowsMove, BsPlusSquare } from "react-icons/bs";
import { FiRotateCw } from "react-icons/fi";
import { GiResize } from "react-icons/gi";
import type { IconType } from "react-icons";

const MODES: { id: Mode; Icon: IconType; name: string }[] = [
  { id: "cursor", Icon: FaMousePointer, name: "Select" },
  { id: "translate", Icon: BsArrowsMove, name: "Translate" },
  { id: "rotate", Icon: FiRotateCw, name: "Rotate" },
  { id: "scale", Icon: GiResize, name: "Scale" },
];

const Panel = () => {
  const [activeMode, setActiveMode] = useStore((state) => [
    state.mode,
    state.setMode,
  ]);
  const add = useStore((state) => state.addBox);

  return (
    <div className="absolute z-50 flex flex-col bg-white rounded shadow left-2 top-4">
      {MODES.map(({ id, Icon, name }) => (
        <div className="tooltip tooltip-right" data-tip={name} key={id}>
          <button
            className={cx("btn btn-ghost rounded-none", {
              "bg-blue-300": activeMode === id,
            })}
            onClick={() => {
              setActiveMode(id);
            }}
          >
            <Icon />
          </button>
        </div>
      ))}
      <div className="tooltip tooltip-right" data-tip="Add Box">
        <button className="rounded-none btn btn-ghost" onClick={() => add()}>
          <BsPlusSquare />
        </button>
      </div>
    </div>
  );
};

export default Panel;
