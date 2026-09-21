import { initializeApp } from "firebase/app";
import { getFirestore, Firestore, connectFirestoreEmulator } from "firebase/firestore";
import { ENV } from "@/main";

const firebaseConfig = {
  apiKey: ENV.VITE_FIREBASE_API_KEY,
  authDomain: ENV.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: ENV.VITE_FIREBASE_PROJECT_ID,
  storageBucket: ENV.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: ENV.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: ENV.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// DB Name: Use 'default' for local development
const dbName = !ENV.PROD ? "default" : "slice-of-life-poems";

// DB Instance
const documentDb: Firestore = getFirestore(app, dbName);

// Ensure Firestore connects to the local emulator for local development
if (!ENV.PROD) {
  connectFirestoreEmulator(documentDb, "127.0.0.1", 60000);
  console.debug("Connecting to local DB firestore instance");
}

export default documentDb;
