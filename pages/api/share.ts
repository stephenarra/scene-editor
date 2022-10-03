import { WebSocketServer } from "ws";
import ShareDB from "sharedb";
import WebSocketJSONStream from "@teamwork/websocket-json-stream"; // eslint-disable-line

// use json1 since it's immutable
import * as json1 from "ot-json1";
import { createDoc } from "../../utils/share/api";
import type { NextApiRequest } from "next";
ShareDB.types.register(json1.type);

const SocketHandler = async (req: NextApiRequest, res: any) => {
  if (res.socket.server.wss) {
    console.log("Socket is already running");
    res.end();
  } else {
    console.log("Socket is initializing");

    const share = new ShareDB({ presence: true });
    // create hardcoded document
    await createDoc("documents", "1", share);

    const server = res.socket.server;
    const wss = new WebSocketServer({ noServer: true });
    res.socket.server.wss = wss;

    server.on("upgrade", (req: any, socket: any, head: any) => {
      console.log("upgrade", req.url);

      if (!req.url.includes("/_next/webpack-hmr")) {
        wss.handleUpgrade(req, socket, head, (ws) => {
          wss.emit("connection", ws, req);
        });
      }
    });

    wss.on("connection", (ws) => {
      var stream = new WebSocketJSONStream(ws);
      share.listen(stream);
    });

    res.end();
  }
};

export default SocketHandler;
