import { ReactNode, createContext, useState } from "react";

export interface ITeam {
  id: number;
  name: string;
}

export const initialState = [
  { id: 1, name: "Aチーム" },
  { id: 2, name: "Bチーム" },
  { id: 3, name: "Cチーム" },
];

export const TeamsContext = createContext<typeof initialState | null>(null);

export function TeamsProvider({ children }: { children: ReactNode }) {
  const [teams] = useState(initialState);
  return <TeamsContext.Provider value={teams}>{children}</TeamsContext.Provider>;
}
