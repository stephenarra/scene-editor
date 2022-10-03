import type { Doc } from "sharedb/lib/client";
import { uniqueId } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { submitOp } from "../utils/share/api";
import { set } from "../utils/share/utils";

const actions = (doc: Doc) => ({
  update: (path: string[], value: any) => {
    console.log("RUN UPDATE:", path, value);
    return submitOp(doc, set({ doc, path, value }));
  },
  add: () =>
    submitOp(
      doc,
      set({
        doc,
        path: ["instances", uuidv4()],
        value: {
          displayName: uniqueId("Box"),
          position: [0, 0, Math.random()],
          rotation: [0, 0, 0],
          scale: [1.0, 1.0, 1.0],
          color: "#3C82F6",
        },
      })
    ),
});

export default actions;
