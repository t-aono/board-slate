const { cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("../../board-slate-firebase-adminsdk-p15gz-350b19a43a.json");
const admin = require("firebase-admin");
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: cert(serviceAccount),
  });
}

export const db = getFirestore();
