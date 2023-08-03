import { useContext, useState } from "react";
import { MonthContext } from "../page";
import japaneseHolidays from "japanese-holidays";
import dayjs from "dayjs";

type Props = {
  dates: number[];
  plans: any;
};

export default function Calendar({ dates, plans }: Props) {
  const [siteCount, setSiteCount] = useState(3);
  const displayMonth = useContext(MonthContext);

  const dateColor = (date: number) => {
    const target = dayjs(displayMonth).set("date", date);
    const day = target.day();
    console.log(day);
    const isHoliday = japaneseHolidays.isHoliday(target.toDate()) ? true : false;
    if (day === 0 || isHoliday) return "bg-red-50";
    if (day === 6) return "bg-blue-50";
    return "";
  };

  const dateWithDayChar = (date: number) => {
    const target = dayjs(displayMonth).set("date", date);
    const dayCharacters = ["日", "月", "火", "水", "木", "金", "土"];
    return `${date} (${dayCharacters[target.day()]})`;
  };

  return (
    <div>
      {dates.map((date) => (
        <div key={date} className="flex date-row">
          <div className={`border w-16 text-center ${dateColor(date)}`}>{dateWithDayChar(date)}</div>
          <button>
            <div>{date}</div>
          </button>
        </div>
      ))}
    </div>
  );
}
