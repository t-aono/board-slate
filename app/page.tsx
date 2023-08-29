"use client";

import Header from "@/components/layouts/Header";
import Main from "@/components/layouts/Content";
import PlanList from "@/features/schedule/components/PlanList";

export default function Home() {
  return (
    <>
      <Header />
      <Main>
        <PlanList />
      </Main>
    </>
  );
}
