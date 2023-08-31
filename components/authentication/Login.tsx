import Link from "next/link";
import AuthForm from "./AuthForm";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [alert, setAlert] = useState("");

  async function loginRequest() {}

  return <AuthForm buttonLabel="ログイン" link={<Link href="/signup">サインアップへ</Link>} onRequest={loginRequest} alert={alert} setAlert={setAlert} />;
}
