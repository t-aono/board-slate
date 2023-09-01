"use client";

import AuthForm from "./AuthForm";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { app } from "@/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Alert from "../common/elements/Alert";

export default function Login() {
  const router = useRouter();
  const [alert, setAlert] = useState("");

  function loginRequest({ email, password }: { email: string; password: string }) {
    const auth = getAuth(app);
    return signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        if (user.uid) router.push("/");
      })
      .catch((error) => {
        // console.log(error.code);
        switch (error.code) {
          case "auth/invalid-email": {
            setAlert("不正なメールアドレスです");
            break;
          }
          case "auth/user-not-found": {
            setAlert("ユーザーが見つかりません");
            break;
          }
          case "auth/wrong-password": {
            setAlert("不正なパスワードです");
            break;
          }
          default: {
            setAlert("ログインに失敗しました");
            break;
          }
        }
      });
  }

  return (
    <>
      <AuthForm buttonLabel="ログイン" onRequest={loginRequest} />;
      <div className="w-1/3 mx-auto">
        <Alert message={alert} onClose={() => setAlert("")} />
      </div>
    </>
  );
}
