"use client";

import Calendar from "./components/Calendar";
import MonthSelect from "./components/MonthSelect";
import { MonthProvider } from "./modules/MonthContext";

export default function Home() {
  return (
    <MonthProvider>
      <div className="container mx-auto px-4 my-4">
        <header className="flex gap-8">
          <MonthSelect />
        </header>
        <main>
          <div className="mt-4">
            <Calendar />
          </div>
          {/* <PlanForm /> */}
        </main>
      </div>
    </MonthProvider>
  );
}
