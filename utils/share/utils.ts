import { get } from "lodash";
import type ShareDB from "sharedb";
import * as json1 from "ot-json1";

interface Props {
  doc: ShareDB.Doc;
  path: string[];
  value?: any;
}

// // function wrappers for json0 type https://github.com/ottypes/json0
// export const set = ({ doc, path, value }: Props) => [
//   { p: path, oi: value, od: get(doc.data, path) },
// ];

// // Adds the given numeric value to the given property.
// export const add = ({ doc, path, value }: Props) => [{ p: path, na: value }];

// export const remove = ({ doc, path }: Props) => [
//   { p: path, od: get(doc.data, path) },
// ];

// json1 wrappers https://github.com/ottypes/json1
export const set = ({ doc, path, value }: Props) => [
  json1.replaceOp(path, get(doc.data, path), value),
];

export const remove = ({ doc, path }: Props) => [
  json1.removeOp(path, get(doc.data, path)),
];
