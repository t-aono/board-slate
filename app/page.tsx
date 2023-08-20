"use client";

import { Dispatch, createContext, useReducer, useState } from "react";
import Calendar from "./components/Calendar";
import { Action, initialState, monthReducer } from "./modules/monthReducer";
import MonthSelect from "./components/MonthSelect";

export const MonthContext = createContext<typeof initialState | null>(null);
export const MonthDispatchContext = createContext<Dispatch<{ type: Action }> | null>(null);

export default function Home() {
  const [month, dispatch] = useReducer(monthReducer, initialState);
  const [plans, setPlans] = useState(null);

  return (
    <MonthContext.Provider value={month}>
      <MonthDispatchContext.Provider value={dispatch}>
        <header className="flex gap-8">
          <div className="text-2xl">予定表</div>
          <MonthSelect />
        </header>
        <main>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-4 calendar-warp">
            <Calendar dates={month.dates} plans={plans} />
            {/* <Calendar dates={lastHalfDates} {plans} /> */}
          </div>
          {/* <PlanForm /> */}
        </main>
      </MonthDispatchContext.Provider>
    </MonthContext.Provider>
  );
}
