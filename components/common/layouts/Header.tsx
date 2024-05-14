import { AdjustmentsHorizontalIcon, ArrowLeftOnRectangleIcon, TableCellsIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import BaseIcon from "../elements/BaseIcon";
import { useContext, useState } from "react";
import LoggedInUserIcon from "../elements/LoggedInUserIcon";
import { signOut } from "firebase/auth";
import UserInfo from "../elements/UserInfo";
import { AuthContext } from "@/contexts/AuthContext";

export default function Header() {
  const [viewItem, setViewItem] = useState(0);
  const { auth } = useContext(AuthContext);

  function LogoutButton() {
    return (
      <div className="absolute top-10 right-0 bg-gray-200 px-4 py-2">
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
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="py-2 px-4">Board Slate</h1>
        </Link>
        <div className="py-2 px-4 flex gap-8">
          <Link href="/">
            <BaseIcon icon={<TableCellsIcon />} />
          </Link>
          <Link href="/setting">
            <BaseIcon icon={<AdjustmentsHorizontalIcon />} />
          </Link>
          <div className="flex gap-x-4 cursor-pointer">
            <LoggedInUserIcon onClick={() => setViewItem(viewItem ? 0 : 1)} />
            {viewItem === 1 && <UserInfo />}
            <BaseIcon icon={<ArrowLeftOnRectangleIcon />} onClick={() => setViewItem(viewItem ? 0 : 2)} />
            {viewItem === 2 && <LogoutButton />}
          </div>
        </div>
      </div>
    </header>
  );
}
