import { AdjustmentsHorizontalIcon, ArrowLeftOnRectangleIcon, TableCellsIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import BaseIcon from "../elements/BaseIcon";
import { useState } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import LoggedInUserIcon from "../elements/LoggedInUserIcon";
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/firebase";
import UserInfo from "../elements/UserInfo";

export default function Header() {
  const [viewItem, setViewItem] = useState(0);
  const auth = getAuth(app);

  function LogoutButton() {
    return (
      <div className="absolute top-10 right-0 bg-gray-200 px-4 py-2" onMouseLeave={() => setViewItem(0)}>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleLogout}
        >
          ログアウト
        </button>
      </div>
    );
  }

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
            <div className="flex gap-x-4">
              <LoggedInUserIcon onMouseEnter={() => setViewItem(1)} />
              {viewItem === 1 && <UserInfo onMouseLeave={() => setViewItem(0)} />}
              <BaseIcon onMouseEnter={() => setViewItem(2)}>
                <ArrowLeftOnRectangleIcon />
              </BaseIcon>
              {viewItem === 2 && <LogoutButton />}
            </div>
          </div>
        </div>
      </AuthProvider>
    </header>
  );
}
