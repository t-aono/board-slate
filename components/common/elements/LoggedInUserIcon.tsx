import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export default function LoggedInUserIcon(props: any) {
  const { user } = useContext(AuthContext);
  const firstChar = user?.email?.slice(0, 1);
  return (
    <div {...props} className="bg-white rounded-full text-center w-6 h-6">
      <div>{firstChar}</div>
    </div>
  );
}
