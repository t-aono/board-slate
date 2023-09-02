import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../firebase";

export async function POST(request: NextRequest) {
  const { memberUids } = await request.json();
  const member = await auth.getUsers([...memberUids.map((uid: string) => ({ uid }))]).catch((error) => error);
  return NextResponse.json(member);
}
