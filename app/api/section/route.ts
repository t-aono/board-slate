import { QueryDocumentSnapshot, QuerySnapshot } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../firebase";
import { firestore } from "firebase-admin";

const COLLECTION_NAME = "sections";

export async function POST(request: NextRequest) {
  const insertData = await request.json();
  const docRef = await db.collection(COLLECTION_NAME).add({ ...insertData, created_at: firestore.FieldValue.serverTimestamp() });
  return NextResponse.json({ ...insertData, id: docRef.id });
}

export async function PATCH(request: NextRequest) {
  const updateData = await request.json();
  db.collection(COLLECTION_NAME).doc(updateData.id).update(updateData);
  return NextResponse.json(updateData);
}

export async function GET() {
  const snapshot: QuerySnapshot = await db.collection(COLLECTION_NAME).orderBy("created_at").get();
  const data = snapshot.docs.map((doc: QueryDocumentSnapshot) => ({ ...doc.data(), id: doc.id }));
  return NextResponse.json(data);
}
