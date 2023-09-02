"use client";

import Container from "@/components/common/layouts/Container";
import Header from "@/components/common/layouts/Header";
import MainContent from "@/components/common/layouts/MainContent";
import MonthlySchedule from "@/components/schedule/MonthlySchedule";

export default function Home() {
  return (
    <Container>
      <Header />
      <MainContent>
        <MonthlySchedule />
      </MainContent>
    </Container>
  );
}
