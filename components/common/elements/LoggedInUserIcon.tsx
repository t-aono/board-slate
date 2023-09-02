import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export default function LoggedInUserIcon({ onClick }: { onClick?: () => void }) {
  const user = useContext(AuthContext);
  const firstChar = user?.email?.slice(0, 1);
  return (
    <div onClick={onClick} className="bg-white rounded-full text-center w-6 h-6">
      <div>{firstChar}</div>
    </div>
  );
}
