import MultiRowLayout from "./MultiRowLayout";
import { User } from "firebase/auth";
import BaseIcon from "../common/elements/BaseIcon";
import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";
import AuthForm from "../authentication/AuthForm";
import axios from "axios";
import Alert from "../common/elements/Alert";
import { IOrganization, OrganizationContext } from "@/contexts/OrganizationContext";

export default function MembersForm() {
  const initialState: Partial<User>[] = [];
  const [members, setMembers] = useState(initialState);
  const [addUser, setAddUser] = useState(false);
  const [alert, setAlert] = useState("");
  const organization = useContext(OrganizationContext);
  const memberUids = organization.member_uids;

  useEffect(() => {
    if (memberUids && memberUids.length > 0) {
      (async () => {
        const { data } = await axios.post(`/api/authentication/member`, { memberUids });
        console.log("$ post member uids", data);
        setMembers(data.users);
      })();
    }
  }, [memberUids]);

  async function addUserRequest({ email, password }: { email: string; password: string }) {
    const { data: userData }: { data: User & { code: string; message: string } } = await axios.post(`/api/authentication/signup`, { email, password });
    if (userData.uid && organization.id) {
      const newMembers = organization.member_uids ? [...organization.member_uids, userData.uid] : [userData.uid];
      const { data: updatedOrganization }: { data: IOrganization & { code: string; message: string } } = await axios.patch(`/api/organization`, {
        ...organization,
        member_uids: newMembers,
      });
      if (updatedOrganization) {
        setAddUser(false);
        setMembers([...members, userData]);
      }
    } else {
      setAlert(userData.message);
    }
  }

  return (
    <MultiRowLayout title="メンバー">
      {members &&
        members.map(({ uid, email }) => (
          <div key={uid} className="flex justify-between border-b-2 mt-6 gap-6">
            {email}
          </div>
        ))}
      <div className="mt-6">
        {addUser ? (
          <>
            <button onClick={() => setAddUser(false)}>
              <BaseIcon icon={<XCircleIcon />} />
            </button>
            <AuthForm buttonLabel="追加" onRequest={addUserRequest} />
            <div className="w-1/2 mx-auto">
              <Alert message={alert} onClose={() => setAlert("")} />
            </div>
          </>
        ) : (
          <button onClick={() => setAddUser(true)}>
            <BaseIcon icon={<PlusCircleIcon />} />
          </button>
        )}
      </div>
    </MultiRowLayout>
  );
}
