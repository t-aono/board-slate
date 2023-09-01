import { AdjustmentsHorizontalIcon, ArrowLeftOnRectangleIcon, TableCellsIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import BaseIcon from "../elements/BaseIcon";
import { useState } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import LoggedInUser from "../elements/LoggedInUser";
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/firebase";

export default function Header() {
  const [viewLogout, setViewLogout] = useState(false);
  const auth = getAuth(app);

  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <header className="bg-gray-200 h-10">
      <AuthProvider>
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <h1 className="py-2 px-4">Board Slate</h1>
          </Link>
          <div className="py-2 px-4 flex gap-8">
            <Link href="/">
              <BaseIcon>
                <TableCellsIcon />
              </BaseIcon>
            </Link>
            <Link href="/setting">
              <BaseIcon>
                <AdjustmentsHorizontalIcon />
              </BaseIcon>
            </Link>
            <BaseIcon onMouseEnter={() => setViewLogout(true)}>
              <ArrowLeftOnRectangleIcon />
            </BaseIcon>
            {viewLogout && (
              <div className="absolute top-10 right-0 bg-gray-200 px-4 py-2" onMouseLeave={() => setViewLogout(false)}>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleLogout}
                >
                  ログアウト
                </button>
              </div>
            )}
            <LoggedInUser />
          </div>
        </div>
      </AuthProvider>
    </header>
  );
}
