import { useStore } from "../utils/useStore";

const Header = () => {
  // const name = useStore((state) => state.id);

  return (
    <div className="flex items-center justify-between h-full px-4">
      <div>Untitled Scene</div>
      <div className="avatar placeholder">
        <div className="w-8 rounded-full bg-neutral-focus text-neutral-content">
          {/* <span>K</span> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
