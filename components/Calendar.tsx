import { useContext, useState } from "react";
import japaneseHolidays from "japanese-holidays";
import dayjs from "dayjs";
import { MonthContext } from "../modules/MonthContext";
import Modal from "./Modal";

export default function Calendar() {
  const month = useContext(MonthContext);
  const [open, setOpen] = useState(false);
  const [clickedPlan, setClickedPlan] = useState(null);

  const dateColor = (date: number) => {
    const target = dayjs(month?.displayMonth).set("date", date);
    const day = target.day();
    const isHoliday = japaneseHolidays.isHoliday(target.toDate()) ? true : false;
    if (day === 0 || isHoliday) return "bg-red-50";
    if (day === 6) return "bg-blue-50";
    return "";
  };

  const dateWithDayChar = (date: number) => {
    const target = dayjs(month?.displayMonth).set("date", date);
    const dayCharacters = ["日", "月", "火", "水", "木", "金", "土"];
    return `${date} (${dayCharacters[target.day()]})`;
  };

  const plans = [
    { id: 1, title: "予定A", content: "AAAAA1", date: 2 },
    { id: 2, title: "予定B", content: "AAAAA2", date: 2 },
    { id: 3, title: "予定C", content: "AAAAA3", date: 2 },
    { id: 4, title: "予定TT", content: "AAAAA4", date: 3 },
    { id: 5, title: "予定YY", content: "AAAAA5", date: 4 },
  ];

  const teams = [
    { id: 1, name: "Aチーム" },
    { id: 2, name: "Bチーム" },
    { id: 3, name: "Cチーム" },
  ];

  function handleClickPlan(plan: any) {
    setClickedPlan(plan);
    setOpen(true);
  }

  function PlanCell({ date, index }: { date: number; index: number }) {
    return (
      <div
        className="border flex items-center justify-center cursor-pointer"
        onClick={() => handleClickPlan(plans.filter((plan) => plan.date === date)[index])}
      >
        {plans.filter((plan) => plan.date === date)[index]?.title}
      </div>
    );
  }

  function TeamCell({ team }: { team: { id: number; name: string } }) {
    return <div className="border flex items-center justify-center">{team.name}</div>;
  }

  function CalendarRow({ date }: { date?: number }) {
    const leftColumnColor = date ? dateColor(date) : "";
    const leftColumnText = date ? dateWithDayChar(date) : "";
    const headerColor = date ? "" : "bg-gray-100";
    return (
      <div className={`grid grid-cols-[70px,1fr,1fr,1fr] h-12 ${headerColor}`}>
        <div className={`border flex items-center justify-center ${leftColumnColor}`}>{leftColumnText}</div>
        {date
          ? [...Array(teams.length)].map((_, index) => <PlanCell key={index} date={date} index={index} />)
          : teams.map((team) => <TeamCell team={team} key={team.id} />)}
      </div>
    );
  }

  return (
    <div>
      <CalendarRow />
      {month?.dates.map((date) => (
        <CalendarRow key={date} date={date} />
      ))}
      <Modal open={open} setOpen={setOpen} plan={clickedPlan} />
    </div>
  );
}
