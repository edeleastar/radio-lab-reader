// @ts-ignore
const apiKey = import.meta.env.VITE_firebase_apiKey
// @ts-ignore
const databaseUrl = import.meta.env.VITE_firebase_databaseUrl
// @ts-ignore
const projectId = import.meta.env.VITE_firebase_projectId


let keys = {
  firebase: {
    apiKey: apiKey,
    databaseURL: databaseUrl,
    projectId: projectId,
  }
};

export function getKeys() {
  return keys;
}
