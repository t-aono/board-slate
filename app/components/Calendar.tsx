import { useContext, useState } from "react";
import japaneseHolidays from "japanese-holidays";
import dayjs from "dayjs";
import { MonthContext } from "../modules/MonthContext";

export default function Calendar() {
  const [siteCount, setSiteCount] = useState(3);
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

  return (
    <div>
      {month?.dates.map((date) => (
        <div key={date} className="flex date-row">
          <div className={`border w-16 text-center ${dateColor(date)}`}>{dateWithDayChar(date)}</div>
        </div>
      ))}
    </div>
  );
}
