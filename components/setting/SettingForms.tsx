import { SectionsProvider } from "@/contexts/SectionsContext";
import SectionsForm from "./SectionsForm";

export default function SettingForms() {
  return (
    <SectionsProvider>
      <SectionsForm />
    </SectionsProvider>
  );
}
