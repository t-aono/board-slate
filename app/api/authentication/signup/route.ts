import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../firebase";

export async function POST(request: NextRequest) {
  const param = await request.json();
  const user = await auth
    .createUser({
      email: param.email,
      password: param.password,
    })
    .catch((error) => error);

  return NextResponse.json(user);
}
