"use client";

import Header from "@/components/common/layouts/Header";
import MainContent from "@/components/common/layouts/MainContent";
import MonthlySchedule from "@/components/schedule/MonthlySchedule";

export default function Home() {
  return (
    <>
      <Header />
      <MainContent>
        <MonthlySchedule />
      </MainContent>
    </>
  );
}
