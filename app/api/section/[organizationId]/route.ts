import { QueryDocumentSnapshot, QuerySnapshot } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { db } from "../../firebase";

const COLLECTION_NAME = "sections";

export async function GET(request: Request, { params }: { params: { organizationId: string } }) {
  const organizationId = params.organizationId;
  const snapshot: QuerySnapshot = await db.collection(COLLECTION_NAME).where("organization_id", "==", organizationId).orderBy("created_at").get();
  const data = snapshot.docs.map((doc: QueryDocumentSnapshot) => ({ ...doc.data(), id: doc.id }));
  return NextResponse.json(data);
}
