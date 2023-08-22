import { useContext } from "react";
import japaneseHolidays from "japanese-holidays";
import dayjs from "dayjs";
import { MonthContext } from "../modules/MonthContext";

export default function Calendar() {
  const month = useContext(MonthContext);

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
    { id: 1, title: "予定１" },
    { id: 2, title: "予定２" },
    { id: 3, title: "予定３" },
  ];

  return (
    <div>
      {month?.dates.map((date) => (
        <div key={date} className="flex h-12">
          <div className={`border w-16 text-center ${dateColor(date)}`}>{dateWithDayChar(date)}</div>
          {plans.map((plan) => (
            <div key={plan.id} className="border">
              {plan.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
