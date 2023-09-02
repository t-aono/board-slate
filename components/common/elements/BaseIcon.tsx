import { ReactNode } from "react";

export default function BaseIcon({ icon, onClick }: { icon: ReactNode; onClick?: () => void }) {
  return (
    <div onClick={onClick} className="h-6 w-6 text-gray-600 ">
      {icon}
    </div>
  );
}
