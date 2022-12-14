import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

import ReconnectingWebSocket from "reconnecting-websocket";
import * as Client from "sharedb/lib/client";
import * as json1 from "ot-json1";

// using json1 on server and client since it's immutable
Client.types.register(json1.type);

interface ClientContextInterface {
  socket: ReconnectingWebSocket;
  connection: Client.Connection;
}

const ClientContext = createContext<ClientContextInterface>(
  {} as ClientContextInterface
);

export const ClientProvider = ({ children }: { children: ReactNode }) => {
  const [value, setValue] = useState<ClientContextInterface>();

  useEffect(() => {
    let mounted = true;
    let res: ClientContextInterface;

    (async () => {
      res = await socketInitializer();
      if (!mounted) {
        res?.socket.close();
        return;
      }
      setValue(res);
    })();

    return () => {
      mounted = false;
      res?.connection.close();
      res?.socket.close();
    };
  }, []);

  const socketInitializer = async () => {
    // initialize socket in next.js
    await fetch("/api/share");
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const socket = new ReconnectingWebSocket(
      `${protocol}//${window.location.host}`
    );
    const connection = new Client.Connection(socket as any);
    return { connection, socket };
  };

  if (!value) return null;

  return (
    <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
  );
};

export const useClient = () => useContext(ClientContext);
