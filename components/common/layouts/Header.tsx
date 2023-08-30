import { AdjustmentsHorizontalIcon, TableCellsIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import BaseIcon from "../elements/BaseIcon";

export default function Header() {
  return (
    <header className="bg-gray-200 h-10">
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
        </div>
      </div>
    </header>
  );
}
