import { ReactNode, createContext, useReducer, useState } from "react";

export interface ISection {
  id: number;
  name: string;
}

export const initialState = [
  { id: 1, name: "営業部" },
  { id: 2, name: "管理部" },
  { id: 3, name: "社長" },
  { id: 4, name: "全社" },
];

export const SectionsContext = createContext(initialState);

export function SectionsProvider({ children }: { children: ReactNode }) {
  const [sections] = useState(initialState);
  return <SectionsContext.Provider value={sections}>{children}</SectionsContext.Provider>;
}

export enum Action {
  SET = "set",
}

function sectionsReducer(state: typeof initialState, action: { type: Action; values?: ISection[] }) {
  return state;
}
