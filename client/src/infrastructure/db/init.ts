import { openDB, type IDBPDatabase } from 'idb';

const DB_NAME = 'vessel-db';
const DB_VERSION = 1;

export const AUTH_STORE_NAME = 'auth';

export const REQUEST_STORE_NAME = 'requests';
const REQUEST_KEY_PATH = 'id';

let dbPromise: Promise<IDBPDatabase> | null = null;

export function getDatabase(): Promise<IDBPDatabase> {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(REQUEST_STORE_NAME)) {
          db.createObjectStore(REQUEST_STORE_NAME, { keyPath: REQUEST_KEY_PATH });
        }
        if (!db.objectStoreNames.contains(AUTH_STORE_NAME)) {
          db.createObjectStore(AUTH_STORE_NAME);
        }
      },
    });
  }
  return dbPromise;
}
