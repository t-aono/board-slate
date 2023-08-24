import { useContext } from "react";
import { Action, MonthContext, MonthDispatchContext } from "../modules/MonthContext";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/outline";

export default function MonthSelect() {
  const month = useContext(MonthContext);
  const dispatch = useContext(MonthDispatchContext);

  if (month === null || dispatch === null) {
    return null;
  }

  return (
    <div className="flex items-middle">
      <button className="font-bold m-2" onClick={() => dispatch({ type: Action.CHANGE_PREVIOUS, value: "" })}>
        <ChevronDoubleLeftIcon className="h-6 w-6" />
      </button>
      <input
        type="month"
        className="text-2xl rounded-md px-2 shadow-sm border"
        value={month.displayMonth}
        onChange={(e) => dispatch({ type: Action.CHANGE_VALUE, value: e.target.value })}
      />
      <button className="font-bold m-2" onClick={() => dispatch({ type: Action.CHANGE_NEXT, value: "" })}>
        <ChevronDoubleRightIcon className="h-6 w-6" />
      </button>
    </div>
  );
}
