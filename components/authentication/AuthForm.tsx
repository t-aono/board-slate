"use client";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import Alert from "../common/elements/Alert";

export default function AuthForm({
  buttonLabel,
  onRequest,
}: {
  buttonLabel: string;
  onRequest: ({ email, password }: { email: string; password: string }) => Promise<void>;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="w-full max-w-xs mx-auto">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-bold mb-2">メールアドレス</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-600 text-sm font-bold mb-2">パスワード</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="button"
            onClick={() => onRequest({ email, password })}
          >
            {buttonLabel}
          </button>
        </div>
      </form>
    </div>
  );
}
