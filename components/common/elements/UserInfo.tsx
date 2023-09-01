import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export default function UserInfo(props: any) {
  const { user } = useContext(AuthContext);
  return (
    <div {...props} className="absolute top-10 right-0 bg-gray-200 px-8 py-6">
      <div className="bg-white px-6 py-4">{user?.email}</div>
    </div>
  );
}
