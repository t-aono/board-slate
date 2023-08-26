import { useContext, useEffect, useState } from "react";
import japaneseHolidays from "japanese-holidays";
import dayjs from "dayjs";
import { MonthContext } from "../modules/MonthContext";
import Modal from "./Modal";
import axios from "axios";
import { Action, IPlan, PlanContext, PlanDispatchContext, initialPlan } from "@/modules/PlanContext";
import { TeamsContext } from "@/modules/TeamsContext";

export default function Calendar() {
  const month = useContext(MonthContext);
  const plan = useContext(PlanContext);
  const teams = useContext(TeamsContext);
  const dispatch = useContext(PlanDispatchContext);
  const [open, setOpen] = useState(false);
  const [clickedPlan, setPlan] = useState<IPlan>(initialPlan);

  const dateColor = (date: number) => {
    const target = dayjs(month?.displayMonth).set("date", date);
    const day = target.day();
    const isHoliday = japaneseHolidays.isHoliday(target.toDate()) ? true : false;
    if (day === 0 || isHoliday) return "bg-red-50";
    if (day === 6) return "bg-blue-50";
    return "";
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/api/plan");
      console.log("#get plans", data);
      if (dispatch) {
        dispatch({ type: Action.SET, values: data });
      }
    })();
  }, [dispatch]);

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
      setPlan({ ...clickedPlan, date: dateString, teamId });
    }
    setOpen(true);
  }

  function PlanCell({ date, teamId }: { date: number; teamId: number }) {
    const planData = plan?.items.find((plan) => Number(plan.date.split("-")[2]) === date && plan.teamId === teamId);
    return (
      <div className="border flex items-center justify-center cursor-pointer" onClick={() => handleClickCell(planData, date, teamId)}>
        {planData?.title}
      </div>
    );
  }

  function TeamCell({ team }: { team: { id: number; name: string } }) {
    return <div className="border flex items-center justify-center">{team.name}</div>;
  }

  function CalendarRow({ date }: { date?: number }) {
    const leftColumnColor = date ? dateColor(date) : "";
    const leftColumnText = date ? getDateWithDayChar(date) : "";
    const headerColor = date ? "" : "bg-gray-100";
    return (
      <div className={`grid grid-cols-[70px,1fr,1fr,1fr] h-12 ${headerColor}`}>
        <div className={`border flex items-center justify-center ${leftColumnColor}`}>{leftColumnText}</div>
        {date ? teams?.map((team) => <PlanCell key={team.id} date={date} teamId={team.id} />) : teams?.map((team) => <TeamCell team={team} key={team.id} />)}
      </div>
    );
  }

  return (
    <div>
      <CalendarRow />
      {month?.dates.map((date) => (
        <CalendarRow key={date} date={date} />
      ))}
      <Modal open={open} setOpen={setOpen} plan={clickedPlan} setPlan={setPlan} />
    </div>
  );
}
