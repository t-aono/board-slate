"use client";

import Header from "@/components/common/layouts/Header";
import MainContent from "@/components/common/layouts/MainContent";
import { AuthProvider } from "@/contexts/AuthContext";
import { OrganizationProvider } from "@/contexts/OrganizationContext";
import { SectionsProvider } from "@/contexts/SectionsContext";
import { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  return (
    <div>
      <AuthProvider>
        <SectionsProvider>
          <OrganizationProvider>
            <Header />
            <MainContent>{children}</MainContent>
          </OrganizationProvider>
        </SectionsProvider>
      </AuthProvider>
    </div>
  );
}
