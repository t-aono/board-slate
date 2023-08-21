"use client";

import Calendar from "./components/Calendar";
import MonthSelect from "./components/MonthSelect";
import { MonthProvider } from "./modules/MonthContext";

export default function Home() {
  return (
    <MonthProvider>
      <header className="flex gap-8">
        <div className="text-2xl">予定表</div>
        <MonthSelect />
      </header>
      <main>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-4 calendar-warp">
          <Calendar />
          {/* <Calendar dates={lastHalfDates} {plans} /> */}
        </div>
        {/* <PlanForm /> */}
      </main>
    </MonthProvider>
  );
}
