import { ReactNode } from "react";

export default function BaseIcon({ children }: { children: ReactNode }) {
  return <div className="h-6 w-6 text-gray-600">{children}</div>;
}
