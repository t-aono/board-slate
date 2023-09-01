import { SectionsProvider } from "@/contexts/SectionsContext";
import SectionsForm from "./SectionsForm";
import MembersForm from "./MembersForm";

export default function SettingForms() {
  return (
    <SectionsProvider>
      <SectionsForm />
      <MembersForm />
    </SectionsProvider>
  );
}
