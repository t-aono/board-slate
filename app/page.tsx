"use client";

import Calendar from "../components/Calendar";
import MonthSelect from "../components/MonthSelect";
import { MonthProvider } from "../modules/MonthContext";

export default function Home() {
  return (
    <MonthProvider>
      <div>
        <header className="h-10">
          <h1 className="bg-gray-200 py-2 px-8">Board Slate</h1>
        </header>
        <main className="container mx-auto px-4 my-4">
          <div className="flex gap-8">
            <MonthSelect />
          </div>
          <div className="mt-4">
            <Calendar />
          </div>
        </main>
      </div>
    </MonthProvider>
  );
}
