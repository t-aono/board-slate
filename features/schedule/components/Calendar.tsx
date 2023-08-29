import { useContext, useEffect, useState } from "react";
import japaneseHolidays from "japanese-holidays";
import dayjs from "dayjs";
import { MonthContext } from "../contexts/MonthContext";
import Modal from "./Modal";
import axios from "axios";
import { Action, IPlan, PlansContext, PlansDispatchContext, initialPlan } from "../contexts/PlansContext";
import { TeamsContext } from "../contexts/TeamsContext";

export default function Calendar() {
  const month = useContext(MonthContext);
  const plans = useContext(PlansContext);
  const dispatch = useContext(PlansDispatchContext);
  const teams = useContext(TeamsContext);
  const [open, setOpen] = useState(false);
  const [clickedPlan, setPlan] = useState<IPlan>(initialPlan);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/api/plan");
      console.log("#get plans", data);
      if (dispatch) {
        dispatch({ type: Action.SET, values: data });
      }
    })();
  }, [dispatch]);

  function getDateClasses(date: number) {
    const target = dayjs(month?.displayMonth).set("date", date);
    const day = target.day();
    const isToday = dayjs().isSame(target, "year") && dayjs().isSame(target, "month") && dayjs().isSame(target, "day");
    console.log({ isToday });
    const isHoliday = japaneseHolidays.isHoliday(target.toDate()) ? true : false;
    let classes = "";
    if (day === 0 || isHoliday) classes += "bg-red-50 ";
    if (day === 6) classes += "bg-blue-50 ";
    if (isToday) classes += "font-bold ";
    return classes;
  }

  function getDateWithDayChar(date: number) {
    const target = dayjs(month?.displayMonth).set("date", date);
    const dayCharacters = ["日", "月", "火", "水", "木", "金", "土"];
    return `${date} (${dayCharacters[target.day()]})`;
  }

  function handleClickCell(plan: IPlan | undefined, date: number, teamId: number) {
    const dateString = dayjs(month?.displayMonth).set("date", date).format("YYYY-MM-DD");
    if (plan !== undefined) {
      setPlan({ ...plan, date: dateString, teamId });
    } else {
      setPlan({ ...initialPlan, date: dateString, teamId });
    }
    setOpen(true);
  }

  function TeamCell({ team }: { team: { id: number; name: string } }) {
    return <div className="border flex items-center justify-center">{team.name}</div>;
  }

  function PlanCell({ date, teamId }: { date: number; teamId: number }) {
    const planData = plans?.find((plan) => Number(plan.date.split("-")[2]) === date && plan.teamId === teamId);
    return (
      <div className="border text-center cursor-pointer" onClick={() => handleClickCell(planData, date, teamId)}>
        <div>{planData?.title}</div>
        <div className="text-xs">{planData?.content}</div>
      </div>
    );
  }

  function CalendarHeader() {
    return (
      <div className={`grid grid-cols-[70px,1fr,1fr,1fr] h-10 bg-gray-100`}>
        <div className={`border flex items-center justify-center`}></div>
        {teams?.map((team) => (
          <TeamCell team={team} key={team.id} />
        ))}
      </div>
    );
  }

  function CalendarRow({ date }: { date: number }) {
    return (
      <div className={`grid grid-cols-[70px,1fr,1fr,1fr] h-12`}>
        <div className={`border flex items-center justify-center ${getDateClasses(date)}`}>{getDateWithDayChar(date)}</div>
        {teams?.map((team) => (
          <PlanCell key={team.id} date={date} teamId={team.id} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 text-gray-600">
      <div>
        <CalendarHeader />
        {month?.dates.slice(0, 15).map((date) => (
          <CalendarRow key={date} date={date} />
        ))}
      </div>
      <div>
        <CalendarHeader />
        {month?.dates.slice(15, 31).map((date) => (
          <CalendarRow key={date} date={date} />
        ))}
      </div>
      <Modal open={open} setOpen={setOpen} plan={clickedPlan} />
    </div>
  );
}
