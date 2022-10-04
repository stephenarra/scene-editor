import type { Doc } from "sharedb/lib/client";
import { submitOp } from "../utils/share/api";
import { set } from "../utils/share/utils";

const actions = (doc: Doc) => ({
  update: (path: string[], value: any) =>
    submitOp(doc, set({ doc, path, value })),
  create: (path: string[], value: any) =>
    submitOp(doc, set({ doc, path, value })),
});

export default actions;
