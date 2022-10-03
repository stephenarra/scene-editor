// promise wrapper for sharedb
import { difference } from "lodash";
import type ShareDB from "sharedb";
import type { Connection } from "sharedb/lib/client";

export const submitOp = (doc: ShareDB.Doc, data: any) =>
  new Promise((resolve, reject) => {
    const callback = (error: any) => (error ? reject(error) : resolve(null));
    doc.submitOp(data, undefined, callback);
  });

export const fetchDoc = (
  collectionName: string,
  id: string,
  shareDBConnection: Connection
): Promise<ShareDB.Doc> =>
  new Promise((resolve, reject) => {
    const shareDBDoc = shareDBConnection.get(collectionName, id);
    shareDBDoc.fetch((error) => {
      error ? reject(error) : resolve(shareDBDoc);
    });
  });

export const createDoc = async (
  collectionName: string,
  id: string,
  share: ShareDB
) => {
  var connection = share.connect();
  const doc = await fetchDoc(collectionName, id, connection);
  if (!doc.type) {
    await saveDoc(doc, { instances: {} }, "json1");
  }
  return doc;
};

// Saves a fetched ShareDB doc (upsert).
export const saveDoc = (doc: ShareDB.Doc, data: any, type: string) =>
  new Promise((resolve, reject) => {
    const callback = (error: any) => (error ? reject(error) : resolve(null));
    if (!doc.type) {
      doc.create(data, type, callback);
    } else {
      doc.submitOp(difference(doc.data, data), undefined, callback);
    }
  });

// Deletes a fetched ShareDB doc.
export const deleteDoc = (doc: ShareDB.Doc) =>
  new Promise((resolve, reject) => {
    doc.del({}, (error: any) => (error ? reject(error) : resolve(null)));
  });
