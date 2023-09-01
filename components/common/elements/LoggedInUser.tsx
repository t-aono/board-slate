import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export default function LoggedInUser() {
  const { user } = useContext(AuthContext);
  return <div>{user?.email}</div>;
}
