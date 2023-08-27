"use client";

import { PlansProvider } from "@/modules/PlansContext";
import Calendar from "../components/Calendar";
import MonthSelect from "../components/MonthSelect";
import { MonthProvider } from "../modules/MonthContext";
import { TeamsProvider } from "@/modules/TeamsContext";

export default function Home() {
  return (
    <MonthProvider>
      <PlansProvider>
        <TeamsProvider>
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
        </TeamsProvider>
      </PlansProvider>
    </MonthProvider>
  );
}
