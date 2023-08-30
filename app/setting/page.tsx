"use client";

import Header from "@/components/common/layouts/Header";
import MainContent from "@/components/common/layouts/MainContent";
import SettingForms from "@/components/setting/SettingForms";

export default function Setting() {
  return (
    <>
      <Header />
      <MainContent>
        <SettingForms />
      </MainContent>
    </>
  );
}
