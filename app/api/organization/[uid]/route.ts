import { QuerySnapshot } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../firebase";

const COLLECTION_NAME = "organizations";

export async function GET(request: NextRequest, { params }: { params: { uid: string } }) {
  const uid = params.uid;
  const snapshot: QuerySnapshot = await db.collection(COLLECTION_NAME).where("admin_uid", "==", uid).limit(1).get();
  const doc = snapshot.docs[0];
  if (!doc) {
    return NextResponse.json(null);
  }
  const data = { ...doc.data(), id: doc.id };
  return NextResponse.json(data);
}
