import { QueryDocumentSnapshot, QuerySnapshot } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";
const { cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("../../../board-slate-firebase-adminsdk-p15gz-350b19a43a.json");
const admin = require("firebase-admin");
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: cert(serviceAccount),
  });
}
const db = getFirestore();

const COLLECTION_NAME = "plans";
const docRef = db.collection(COLLECTION_NAME).doc();

export async function POST(request: NextRequest) {
  const insertData = await request.json();
  docRef.set(insertData);
  return NextResponse.json(insertData);
}

export async function GET(request: NextRequest) {
  const snapshot: QuerySnapshot = await db.collection(COLLECTION_NAME).get();
  const data = snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return NextResponse.json(data);
}
