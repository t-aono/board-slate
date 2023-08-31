"use client";

import Link from "next/link";
import AuthForm from "./AuthForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SingUp() {
  const router = useRouter();
  const [alert, setAlert] = useState("");

  async function signUpRequest({ email, password }: { email: string; password: string }) {
    const { data } = await axios.post(`/api/authentication/signup`, { email, password });
    if (data.uid) {
      router.push("/");
    } else {
      setAlert(data.message);
    }
  }

  return <AuthForm buttonLabel="サインアップ" link={<Link href="/login">ログインへ</Link>} onRequest={signUpRequest} alert={alert} setAlert={setAlert} />;
}
