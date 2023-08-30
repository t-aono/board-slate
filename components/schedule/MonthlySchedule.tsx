import Calendar from "@/components/schedule/Calendar";
import MonthSelect from "@/components/schedule/MonthSelect";
import { MonthProvider } from "@/contexts/MonthContext";
import { PlansProvider } from "@/contexts/PlansContext";
import { SectionsProvider } from "@/contexts/SectionsContext";

export default function MonthlySchedule() {
  return (
    <MonthProvider>
      <PlansProvider>
        <SectionsProvider>
          <div className="flex gap-8">
            <MonthSelect />
          </div>
          <div className="mt-3">
            <Calendar />
          </div>
        </SectionsProvider>
      </PlansProvider>
    </MonthProvider>
  );
}
