"use client";

import Header from "@/components/common/layouts/Header";
import MainContent from "@/components/common/layouts/MainContent";
import SectionsForm from "@/components/setting/SectionsForm";

export default function Setting() {
  return (
    <>
      <Header />
      <MainContent>
        <SectionsForm />
      </MainContent>
    </>
  );
}
