"use client";

import AuthForm from "./AuthForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Alert from "../common/elements/Alert";

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

  return (
    <>
      <AuthForm buttonLabel="サインアップ" onRequest={signUpRequest} />;
      <div className="w-1/2 mx-auto">
        <Alert message={alert} onClose={() => setAlert("")} />
      </div>
    </>
  );
}
