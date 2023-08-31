import { useContext, useEffect, useState } from "react";
import japaneseHolidays from "japanese-holidays";
import dayjs from "dayjs";
import { MonthContext } from "../../contexts/MonthContext";
import Modal from "./Modal";
import axios from "axios";
import { Action, IPlan, PlansContext, PlansDispatchContext, initialPlan } from "@/contexts/PlansContext";
import { SectionsContext, SectionsDispatchContext } from "@/contexts/SectionsContext";

export default function Calendar() {
  const { displayMonth, dates } = useContext(MonthContext);
  const plans = useContext(PlansContext);
  const plansDispatch = useContext(PlansDispatchContext);
  const sections = useContext(SectionsContext);
  const sectionsDispatch = useContext(SectionsDispatchContext);
  const [open, setOpen] = useState(false);
  const [clickedPlan, setPlan] = useState<IPlan>(initialPlan);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/api/plan?month=${displayMonth}`);
      console.log("$ get plans", data);
      if (plansDispatch) {
        plansDispatch({ type: Action.SET, values: data });
      }
    })();
  }, [displayMonth, plansDispatch]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/api/section");
      console.log("$ get sections", data);
      if (sectionsDispatch) {
        sectionsDispatch({ type: Action.SET, values: data });
      }
    })();
  }, [sectionsDispatch]);

  function getDateClasses(date: number) {
    const target = dayjs(displayMonth).set("date", date);
    const day = target.day();
    const isToday = dayjs().isSame(target, "year") && dayjs().isSame(target, "month") && dayjs().isSame(target, "day");
    const isHoliday = japaneseHolidays.isHoliday(target.toDate()) ? true : false;
    let classes = "";
    if (day === 0 || isHoliday) classes += "bg-red-50 ";
    if (day === 6) classes += "bg-blue-50 ";
    if (isToday) classes += "font-bold ";
    return classes;
  }

  function getDateWithDayChar(date: number) {
    const target = dayjs(displayMonth).set("date", date);
    const dayCharacters = ["日", "月", "火", "水", "木", "金", "土"];
    return `${date} (${dayCharacters[target.day()]})`;
  }

  function handleClickCell(plan: IPlan | undefined, date: number, sectionId: string) {
    const dateString = dayjs(displayMonth).set("date", date).format("YYYY-MM-DD");
    if (plan !== undefined) {
      setPlan({ ...plan, date: dateString, sectionId });
    } else {
      setPlan({ ...initialPlan, date: dateString, sectionId });
    }
    setOpen(true);
  }

  function PlanCell({ date, sectionId }: { date: number; sectionId: string }) {
    const planData = plans?.find((plan) => Number(plan.date.split("-")[2]) === date && plan.sectionId === sectionId);
    return (
      <div className="border text-center cursor-pointer" onClick={() => handleClickCell(planData, date, sectionId)}>
        <div>{planData?.title}</div>
        <div className="text-xs">{planData?.content}</div>
      </div>
    );
  }

  function CalendarHeader() {
    return (
      <div className={`grid grid-flow-col auto-cols-fr h-10 bg-gray-100`}>
        <div className={`border flex items-center justify-center`}></div>
        {sections?.map(
          (section) =>
            section.visible && (
              <div key={section.id} className="border flex items-center justify-center">
                {section.name}
              </div>
            )
        )}
      </div>
    );
  }

  function CalendarRow({ date }: { date: number }) {
    return (
      <div className={`grid grid-flow-col auto-cols-fr h-12`}>
        <div className={`border flex items-center justify-center ${getDateClasses(date)}`}>{getDateWithDayChar(date)}</div>
        {sections?.map((section) => section.visible && <PlanCell key={section.id} date={date} sectionId={section.id} />)}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 text-gray-600">
      <div>
        <CalendarHeader />
        {dates.slice(0, 15).map((date) => (
          <CalendarRow key={date} date={date} />
        ))}
      </div>
      <div>
        <CalendarHeader />
        {dates.slice(15, 31).map((date) => (
          <CalendarRow key={date} date={date} />
        ))}
      </div>
      <Modal open={open} setOpen={setOpen} plan={clickedPlan} />
    </div>
  );
}
