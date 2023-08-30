import { ACTION } from "next/dist/client/components/app-router-headers";
import { Dispatch, ReactNode, createContext, useReducer } from "react";

export interface ISection {
  id: number;
  name: string;
  visible: boolean;
}

export const initialState = [
  { id: 1, name: "営業部", visible: true },
  { id: 2, name: "管理部", visible: true },
  { id: 3, name: "社長", visible: true },
  { id: 4, name: "全社", visible: true },
  { id: 5, name: "その他", visible: false },
];

export const SectionsContext = createContext(initialState);
export const SectionsDispatchContext = createContext<Dispatch<{ type: Action; values?: ISection[]; value?: ISection }> | null>(null);

export function SectionsProvider({ children }: { children: ReactNode }) {
  const [sections, dispatch] = useReducer(sectionsReducer, initialState);
  return (
    <SectionsContext.Provider value={sections}>
      <SectionsDispatchContext.Provider value={dispatch}>{children}</SectionsDispatchContext.Provider>
    </SectionsContext.Provider>
  );
}

export enum Action {
  // SET = "set",
  ADD = "add",
  UPDATE = "update",
  DELETE = "delete",
}

function sectionsReducer(state: typeof initialState, action: { type: Action; values?: ISection[]; value?: ISection }) {
  switch (action.type) {
    // case Action.SET: {
    //   return action.values ? action.values : state;
    // }
    case Action.ADD: {
      return action.value ? [...state, action.value] : state;
    }
    case Action.UPDATE: {
      const sections = [...state];
      if (action.value) {
        const updateIndex = state.findIndex((section) => section.id === action.value?.id);
        sections.splice(updateIndex, 1, action.value);
      }
      return sections;
    }
    case Action.DELETE: {
      return state.filter((section) => section.id !== action.value?.id);
    }
  }
}
