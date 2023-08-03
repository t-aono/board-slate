"use client";

import dayjs from "dayjs";
import { createContext, useEffect, useState } from "react";
import Calendar from "./components/Calendar";

export const MonthContext = createContext("");

export default function Home() {
  const [displayMonth, setDisplayMonth] = useState("");
  const [firstHalfDates, setFirstHalfDates] = useState<number[]>([]);
  const [plans, setPlans] = useState(null);

  useEffect(() => {
    setDisplayMonth(dayjs().format("YYYY-MM"));
    setFirstHalfDates([...Array(15)].map((_, i) => i + 1));
  }, []);

  function changePrevMonth() {
    const yearMonth = dayjs(displayMonth).add(-1, "month");
    setDisplayMonth(yearMonth.format("YYYY-MM"));
  }
  function changeNextMonth() {
    const yearMonth = dayjs(displayMonth).add(1, "month");
    setDisplayMonth(yearMonth.format("YYYY-MM"));
  }

  return (
    <MonthContext.Provider value={displayMonth}>
      <header className="flex gap-8">
        <div className="text-2xl">予定表</div>
        <div>
          <a href="#" className="font-bold m-2" onClick={changePrevMonth}>
            ＜
          </a>
          <input type="month" className="text-2xl rounded-md px-2 shadow-sm border" defaultValue={displayMonth} />
          <a href="#" className="font-bold m-2" onClick={changeNextMonth}>
            ＞
          </a>
        </div>
      </header>
      <main>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-4 calendar-warp">
          <Calendar dates={firstHalfDates} plans={plans} />
          {/* <Calendar dates={lastHalfDates} {plans} /> */}
        </div>
        {/* <PlanForm /> */}
      </main>
    </MonthContext.Provider>
  );
}
