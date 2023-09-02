import { ReactNode } from "react";

export default function BaseIcon({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <div onClick={onClick} className="h-6 w-6 text-gray-600 ">
      {children}
    </div>
  );
}
