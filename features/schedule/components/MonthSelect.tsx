import { useContext } from "react";
import { Action, MonthContext, MonthDispatchContext } from "../contexts/MonthContext";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import BaseIcon from "@/components/elements/BaseIcon";

export default function MonthSelect() {
  const month = useContext(MonthContext);
  const dispatch = useContext(MonthDispatchContext);

  if (month === null || dispatch === null) {
    return null;
  }

  return (
    <div className="flex items-middle text-gray-600">
      <button className="font-bold m-2" onClick={() => dispatch({ type: Action.CHANGE_PREVIOUS, value: "" })}>
        <BaseIcon>
          <ChevronDoubleLeftIcon />
        </BaseIcon>
      </button>
      <input
        type="month"
        className="text-xl rounded-md px-2 shadow-sm border"
        value={month.displayMonth}
        onChange={(e) => dispatch({ type: Action.CHANGE_VALUE, value: e.target.value })}
      />
      <button className="font-bold m-2" onClick={() => dispatch({ type: Action.CHANGE_NEXT, value: "" })}>
        <BaseIcon>
          <ChevronDoubleRightIcon />
        </BaseIcon>
      </button>
    </div>
  );
}
