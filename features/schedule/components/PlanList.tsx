import Calendar from "@/features/schedule/components/Calendar";
import MonthSelect from "@/features/schedule/components/MonthSelect";
import { MonthProvider } from "../contexts/MonthContext";
import { PlansProvider } from "../contexts/PlansContext";
import { TeamsProvider } from "../contexts/TeamsContext";

export default function PlanList() {
  return (
    <MonthProvider>
      <PlansProvider>
        <TeamsProvider>
          <div className="flex gap-8">
            <MonthSelect />
          </div>
          <div className="mt-4">
            <Calendar />
          </div>
        </TeamsProvider>
      </PlansProvider>
    </MonthProvider>
  );
}
