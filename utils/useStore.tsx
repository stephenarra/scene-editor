import { createStore, useStore as useZustandStore, StoreApi } from "zustand";
import { useContext, createContext, useEffect, useState } from "react";
import { useClient } from "./useShare";
import getActions from "./actions";
import { getRandomName, getUniqueValue, COLORS } from "./utils";
import { v4 as uuidv4 } from "uuid";
import { omit } from "lodash";
import type { Vector3, Euler } from "three";

export type Mode = "cursor" | "translate" | "rotate" | "scale";
interface Presence {
  name: string;
  color: string;
  selected: string | null;
}
interface Instance {
  displayName: string;
  position: Vector3;
  rotation: Euler;
  scale: Vector3;
  color: string;
}
interface DocState extends ReturnType<typeof getActions> {
  id: string;
  session: { name: string; color: string };
  target: any;
  mode: Mode;
  setTarget: (target: any) => void;
  setMode: (mode: Mode) => void;
  addBox: () => void;
  sendPresence: () => void;

  // document data
  instances: { [key: string]: Instance };
  presence: { [key: string]: Presence };
}

export const StoreContext = createContext<StoreApi<DocState> | null>(null);

export const StoreProvider = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const { connection } = useClient();
  const [useStore, setUseStore] = useState<StoreApi<DocState>>();

  useEffect(() => {
    if (!connection) return;

    let mounted = true;
    const doc = connection.get("documents", id);
    const presence = connection.getPresence("presence-channel");
    const localPresence = presence.create();
    const actions = getActions(doc);

    const store = createStore<DocState>()((set, get) => ({
      id,
      target: null,
      session: { name: "", color: "" },
      setTarget: (target) => {
        set({ target });
        store.getState().sendPresence();
      },
      sendPresence: () => {
        const state = get();
        localPresence.submit({
          selected: state.target,
          name: state.session.name,
          color: state.session.color,
        });
      },
      mode: "translate",
      setMode: (mode) => set({ mode }),
      instances: {},
      presence: {},

      ...actions,

      addBox: () => {
        const instances = get().instances;
        const displayName = getUniqueValue(
          Object.values(instances).map((d) => d.displayName),
          (i) => `Box${i}`
        );
        actions.create(["instances", uuidv4()], {
          displayName,
          position: [0, 0, Math.random()],
          rotation: [0, 0, 0],
          scale: [1.0, 1.0, 1.0],
          color: "#3C82F6",
        });
      },
    }));

    // Get initial value of document and subscribe to changes
    doc.subscribe((error) => {
      if (error) return console.error(error);
      store.setState(doc.data);
    });

    // When document changes (by this client or any other, or the server)
    doc.on("op", (op) => {
      console.log("OP:", op, doc.data);
      store.setState(doc.data);
    });

    /* PRESENCE */
    presence.subscribe(() => {
      if (mounted) {
        store.setState({
          session: {
            name: getRandomName(),
            color: getUniqueValue(
              Object.values(presence.remotePresences).map((d) => d.color),
              (i) => COLORS[i]
            ),
          },
        });
        store.getState().sendPresence();
      }
    });

    presence.on("receive", (presenceId, update) => {
      if (presenceId === localPresence.presenceId) return;

      const state = store.getState();
      if (update === null) {
        store.setState({
          ...state,
          presence: omit(state.presence, presenceId),
        });
      } else {
        store.setState({
          ...state,
          presence: {
            ...state.presence,
            [presenceId]: update,
          },
        });
      }
    });

    setUseStore(store);

    return () => {
      mounted = false;
    };
  }, [connection, id]);

  if (!useStore) return null;

  return (
    <StoreContext.Provider value={useStore}>{children}</StoreContext.Provider>
  );
};

export function useStore(): DocState;
export function useStore<T>(
  selector: (store: DocState) => T,
  equalityFn?: (left: T, right: T) => boolean
): T;
export function useStore<T>(
  selector?: (store: DocState) => T,
  equalityFn?: (left: T, right: T) => boolean
) {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error("StoreContext is not provided");
  }
  return useZustandStore(store, selector as any, equalityFn);
}
