import { PlusCircleIcon } from "@heroicons/react/24/outline";
import BaseIcon from "../common/elements/BaseIcon";
import { ReactNode } from "react";

export default function MultiRowLayout({ title, handleAdd, children }: { title: string; handleAdd: () => void; children: ReactNode }) {
  return (
    <div className="w-1/2 mx-auto text-gray-600 mt-10">
      <label className="text-lg font-bold">{title}</label>
      <div className="mt-3 px-2">
        {children}
        <div className="mt-6">
          <button onClick={handleAdd}>
            <BaseIcon icon={<PlusCircleIcon />} />
          </button>
        </div>
      </div>
    </div>
  );
}
