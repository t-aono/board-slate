import { Dispatch, ReactNode, createContext, useReducer } from "react";

export const PlanContext = createContext<typeof initialState | null>(null);
export const PlanDispatchContext = createContext<Dispatch<{ type: Action; values?: IPlan[]; value?: IPlan }> | null>(null);

export interface IPlan {
  id: string;
  title: string;
  content: string;
  date: string;
  teamId: number;
}

export const initialState: { items: IPlan[] } = {
  items: [],
};

export enum Action {
  SET = "set",
  ADD = "add",
  UPDATE = "update",
}

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, dispatch] = useReducer(planReducer, initialState);
  return (
    <PlanContext.Provider value={plan}>
      <PlanDispatchContext.Provider value={dispatch}>{children}</PlanDispatchContext.Provider>
    </PlanContext.Provider>
  );
}

function planReducer(state: typeof initialState, action: { type: Action; values?: IPlan[]; value?: IPlan }) {
  switch (action.type) {
    case Action.SET: {
      return { items: action.values ? action.values : state.items };
    }
    case Action.ADD: {
      return { items: action.value ? [...state.items, action.value] : state.items };
    }
    case Action.UPDATE: {
      const items = [...state.items];
      if (action.value) {
        const updateIndex = state.items.findIndex((item) => item.id === action.value?.id);
        items.splice(updateIndex, 1, action.value);
      }
      return { items };
    }
  }
}
