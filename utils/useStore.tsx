import { createStore, useStore as useZustandStore, StoreApi } from "zustand";
import { useContext, createContext, useMemo } from "react";
import { useClient } from "./useShare";
import actions from "./actions";

export type Mode = "cursor" | "translate" | "rotate" | "scale";
interface DocState extends ReturnType<typeof actions> {
  id: string;
  target: any;
  mode: Mode;
  setTarget: (target: any) => void;
  setMode: (mode: Mode) => void;

  // document data
  instances: any;
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

  if (!connection) return null;

  const useStore = useMemo(() => {
    const doc = connection.get("documents", id);

    const store = createStore<DocState>()((set, get) => ({
      id,
      target: null,
      setTarget: (target) => set({ target }),
      mode: "translate",
      setMode: (mode) => set({ mode }),
      instances: {},
      ...actions(doc),
    }));

    // Get initial value of document and subscribe to changes
    doc.subscribe((error) => {
      if (error) return console.error(error);
      console.log("SUBSCRIPTION", doc.data, doc.subscribed);
      if (!doc.data) return;
      store.setState(doc.data);
    });

    // When document changes (by this client or any other, or the server)
    doc.on("op", (op) => {
      console.log("OP:", op, doc.data);
      store.setState(doc.data);
    });

    return store;
  }, [connection, id]);

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
