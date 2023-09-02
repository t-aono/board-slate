import Calendar from "@/components/schedule/Calendar";
import MonthSelect from "@/components/schedule/MonthSelect";
import { MonthProvider } from "@/contexts/MonthContext";
import { PlansProvider } from "@/contexts/PlansContext";

export default function MonthlySchedule() {
  return (
    <MonthProvider>
      <PlansProvider>
        <div className="flex gap-8">
          <MonthSelect />
        </div>
        <div className="mt-3">
          <Calendar />
        </div>
      </PlansProvider>
    </MonthProvider>
  );
}
