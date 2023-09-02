import { Dispatch, ReactNode, createContext, useReducer } from "react";

export interface ISection {
  id: string;
  name: string;
  visible: boolean;
  organization_id: string;
}

export const initialState: ISection[] = [];

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
  SET = "set",
  ADD = "add",
  UPDATE = "update",
  DELETE = "delete",
}

function sectionsReducer(state: ISection[], action: { type: Action; values?: ISection[]; value?: ISection }) {
  switch (action.type) {
    case Action.SET: {
      return action.values ? action.values : state;
    }
    case Action.ADD: {
      return action.value ? [...state, action.value] : state;
    }
    case Action.UPDATE: {
      const sections = [...state];
      if (action.value) {
        const updateIndex = state.findIndex((section: ISection) => section.id === action.value?.id);
        sections.splice(updateIndex, 1, action.value);
      }
      return sections;
    }
    case Action.DELETE: {
      return state.filter((section: ISection) => section.id !== action.value?.id);
    }
  }
}
