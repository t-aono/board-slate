import { AuthContext } from "@/contexts/AuthContext";
import { OrganizationContext } from "@/contexts/OrganizationContext";
import { useContext } from "react";

export default function UserInfo() {
  const user = useContext(AuthContext);
  const organization = useContext(OrganizationContext);

  return (
    <div className="absolute top-10 right-0 bg-gray-200 text-gray-600 px-3 py-2">
      <div className="bg-white px-6 py-4">
        <label className="text-xs">組織名</label>
        <div className="px-2 mb-2">{organization.name}</div>
        <label className="text-xs">ログインユーザー</label>
        <div className="px-2 mb-2">{user?.email}</div>
      </div>
    </div>
  );
}
