import { UserType } from "@/contexts/AuthContext";
import MultiRowLayout from "./MultiRowLayout";
import { User } from "firebase/auth";
import BaseIcon from "../common/elements/BaseIcon";
import { LockOpenIcon } from "@heroicons/react/24/outline";

export default function MembersForm() {
  const members: Partial<User>[] = [
    { uid: "1", email: "user1@ne.jp" },
    { uid: "2", email: "user2@ne.jp" },
    { uid: "3", email: "user3@ne.jp" },
  ];

  return (
    <MultiRowLayout title="メンバー" handleAdd={() => {}}>
      {members &&
        members.map(({ uid, email }) => (
          <div key={uid} className="flex justify-between border-b-2 mt-6 gap-6">
            {email}
            <div className="flex justify-end gap-4">
              <button onClick={() => {}}>
                <BaseIcon icon={<LockOpenIcon />} />
              </button>
            </div>
          </div>
        ))}
    </MultiRowLayout>
  );
}
