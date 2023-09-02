import { ReactNode } from "react";

export default function MultiRowLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="w-1/2 mx-auto text-gray-600 mt-10">
      <label className="text-lg font-bold">{title}</label>
      <div className="mt-3 px-2">{children}</div>
    </div>
  );
}
