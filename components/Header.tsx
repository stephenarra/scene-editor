import { useStore } from "../utils/useStore";

const getInitials = (str: string) =>
  str
    .split(" ")
    .map((d) => d[0])
    .join("")
    .toUpperCase();

const Header = () => {
  const session = useStore((state) => state.session);
  const presence = useStore((state) => state.presence);
  const users = Object.keys(presence).map((id) => ({ ...presence[id], id }));

  return (
    <div className="flex items-center justify-between h-full px-4">
      <div>Untitled Scene</div>
      <div className="flex items-center">
        <div className="z-50 -space-x-2 overflow-visible avatar-group">
          {users.map((user) => (
            <div
              key={user.id}
              className="tooltip tooltip-bottom"
              data-tip={user.name}
            >
              <div className="avatar placeholder">
                <div
                  className="w-8 text-neutral-content"
                  style={{ background: user.color }}
                >
                  <span>{getInitials(user.name)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="border-r-[1px] border-gray-300 mx-3 h-6"></div>
        <div className="avatar placeholder">
          <div
            className="w-8 rounded-full text-neutral-content"
            style={{ background: session.color }}
          >
            <span>{getInitials(session.name)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
