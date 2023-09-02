"use client";

import Container from "@/components/common/layouts/Container";
import Header from "@/components/common/layouts/Header";
import MainContent from "@/components/common/layouts/MainContent";
import SettingForms from "@/components/setting/SettingForms";

export default function Setting() {
  return (
    <Container>
      <Header />
      <MainContent>
        <SettingForms />
      </MainContent>
    </Container>
  );
}
