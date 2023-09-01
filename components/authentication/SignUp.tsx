"use client";

import AuthForm from "./AuthForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Alert from "../common/elements/Alert";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "@/firebase";

export default function SingUp() {
  const router = useRouter();
  const [alert, setAlert] = useState("");
  const auth = getAuth(app);

  async function signUpRequest({ email, password, organization }: { email: string; password: string; organization?: string }) {
    if (organization) {
      const { data: organizationData } = await axios.get(`/api/organization?name=${organization}`);
      if (organizationData) {
        setAlert("この組織名は使用済みです");
        return;
      }
    } else {
      setAlert("組織名を入力してください");
      return;
    }

    const { data: userData } = await axios.post(`/api/authentication/signup`, { email, password });
    if (userData.uid) {
      const { data: newOrganization } = await axios.post(`/api/organization`, { name: organization, admin_uid: userData.uid });
      if (newOrganization) {
        signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
          if (user.uid) router.push("/");
        });
      }
    } else {
      setAlert(userData.message);
    }
  }

  return (
    <>
      <AuthForm buttonLabel="サインアップ" onRequest={signUpRequest} organizationInput={true} />;
      <div className="w-1/2 mx-auto">
        <Alert message={alert} onClose={() => setAlert("")} />
      </div>
    </>
  );
}
