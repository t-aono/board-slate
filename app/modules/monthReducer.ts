import dayjs from "dayjs";

export const initialState = {
  displayMonth: dayjs().format("YYYY-MM"),
  dates: [...Array(Number(dayjs().endOf("month").format("D")))].map((_, i) => i + 1),
};

export enum Action {
  CHANGE_NEXT,
  CHANGE_PREVIOUS,
}

export function monthReducer(state: typeof initialState, action: { type: Action }) {
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
  }
}
