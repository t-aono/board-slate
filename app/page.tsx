"use client";

import MonthlySchedule from "@/components/MonthlySchedule";
import Header from "@/components/layouts/Header";
import MainContent from "@/components/layouts/MainContent";

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
