import { Dispatch, ReactNode, createContext, useReducer } from "react";
import dayjs from "dayjs";

export const initialState = {
  displayMonth: dayjs().format("YYYY-MM"),
  dates: [...Array(Number(dayjs().endOf("month").format("D")))].map((_, i) => i + 1),
};

export const MonthContext = createContext(initialState);
export const MonthDispatchContext = createContext<Dispatch<{ type: Action; value: string }> | null>(null);

export enum Action {
  CHANGE_NEXT = "change_next",
  CHANGE_PREVIOUS = "change_previous",
  CHANGE_VALUE = "change_value",
}

export function MonthProvider({ children }: { children: ReactNode }) {
  const [month, dispatch] = useReducer(monthReducer, initialState);
  return (
    <MonthContext.Provider value={month}>
      <MonthDispatchContext.Provider value={dispatch}>{children}</MonthDispatchContext.Provider>
    </MonthContext.Provider>
  );
}

function monthReducer(state: typeof initialState, action: { type: Action; value: string }) {
  switch (action.type) {
    case Action.CHANGE_NEXT: {
      const nextMonth = dayjs(state.displayMonth).add(+1, "month");
      const dateCount = Number(nextMonth.endOf("month").format("D"));
      return {
        displayMonth: nextMonth.format("YYYY-MM"),
        dates: [...Array(dateCount)].map((_, i) => i + 1),
      };
    }
    case Action.CHANGE_PREVIOUS: {
      const previousMonth = dayjs(state.displayMonth).add(-1, "month");
      const dateCount = Number(previousMonth.endOf("month").format("D"));
      return {
        displayMonth: previousMonth.format("YYYY-MM"),
        dates: [...Array(dateCount)].map((_, i) => i + 1),
      };
    }
    case Action.CHANGE_VALUE: {
      const inputMonth = dayjs(action.value);
      const dateCount = Number(inputMonth.endOf("month").format("D"));
      return {
        displayMonth: inputMonth.format("YYYY-MM"),
        dates: [...Array(dateCount)].map((_, i) => i + 1),
      };
    }
  }
}
