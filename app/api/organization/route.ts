import { QuerySnapshot } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../firebase";

const COLLECTION_NAME = "organizations";

export async function POST(request: NextRequest) {
  const insertData = await request.json();
  const docRef = await db.collection(COLLECTION_NAME).add(insertData);
  return NextResponse.json({ ...insertData, id: docRef.id });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  const snapshot: QuerySnapshot = await db.collection(COLLECTION_NAME).where("name", "==", name).limit(1).get();
  const doc = snapshot.docs[0];
  if (!doc) {
    return NextResponse.json(null);
  }
  const data = { ...doc.data(), id: doc.id };
  return NextResponse.json(data);
}
