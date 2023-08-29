"use client";

import Header from "@/components/layouts/Header";
import MainContent from "@/components/layouts/MainContent";
import PlanList from "@/features/schedule/components/PlanList";

export default function Home() {
  return (
    <>
      <Header />
      <MainContent>
        <PlanList />
      </MainContent>
    </>
  );
}
