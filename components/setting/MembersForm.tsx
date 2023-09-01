import MultiRowLayout from "./MultiRowLayout";

export default function MembersForm() {
  const members = [
    { id: "1", name: "aaa" },
    { id: "2", name: "bbb" },
    { id: "3", name: "ccc" },
  ];

  return (
    <MultiRowLayout title="メンバー" handleAdd={() => {}}>
      {members &&
        members.map(({ id, name }) => (
          <div key={id} className="flex justify-between border-b-2 mt-6 gap-6">
            {name}
          </div>
        ))}
    </MultiRowLayout>
  );
}
