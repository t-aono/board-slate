import { AuthProvider } from "@/contexts/AuthContext";
import { OrganizationProvider } from "@/contexts/OrganizationContext";
import { SectionsProvider } from "@/contexts/SectionsContext";
import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <SectionsProvider>
        <OrganizationProvider>{children}</OrganizationProvider>
      </SectionsProvider>
    </AuthProvider>
  );
}
