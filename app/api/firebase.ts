const { cert } = require("firebase-admin/app");
const serviceAccount = require("../../board-slate-firebase-adminsdk-p15gz-350b19a43a.json");
const admin = require("firebase-admin");
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: cert(serviceAccount),
  });
}

const { getAuth } = require("firebase-admin/auth");
export const auth = getAuth();

const { getFirestore } = require("firebase-admin/firestore");
export const db = getFirestore();
