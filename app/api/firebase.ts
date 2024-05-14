import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const { cert } = require("firebase-admin/app");
const serviceAccount = require("../../board-slate-firebase-adminsdk-p15gz-350b19a43a.json");
const admin = require("firebase-admin");
if (admin.apps.length === 0) {
  if (process.env.NEXT_PUBLIC_ENVIRONMENT_ID === "local") {
    process.env.FIREBASE_AUTH_EMULATOR_HOST = "127.0.0.1:9099";
    process.env.FIRESTORE_EMULATOR_HOST = "127.0.0.1:8080";
    admin.initializeApp({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
  } else {
    admin.initializeApp({
      credential: cert(serviceAccount),
    });
  }
}

export const auth = getAuth();

export const db = getFirestore();
