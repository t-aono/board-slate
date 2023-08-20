import { useContext } from "react";
import { MonthContext, MonthDispatchContext } from "../page";
import { Action } from "../modules/monthReducer";

export default function MonthSelect() {
  const month = useContext(MonthContext);
  const dispatch = useContext(MonthDispatchContext);

  if (month === null || dispatch === null) {
    return null;
  }

  return (
    <div>
      <a href="#" className="font-bold m-2" onClick={() => dispatch({ type: Action.CHANGE_PREVIOUS })}>
        ＜
      </a>
      <input type="month" className="text-2xl rounded-md px-2 shadow-sm border" defaultValue={month.displayMonth} />
      <a href="#" className="font-bold m-2" onClick={() => dispatch({ type: Action.CHANGE_NEXT })}>
        ＞
      </a>
    </div>
  );
}
