import { Dispatch, ReactNode, createContext, useReducer } from "react";

export const PlansContext = createContext<typeof initialState | null>(null);
export const PlansDispatchContext = createContext<Dispatch<{ type: Action; values?: IPlan[]; value?: IPlan }> | null>(null);

export interface IPlan {
  id: string;
  title: string;
  content: string;
  date: string;
  sectionId: string;
}

export const initialPlan = {
  id: "",
  title: "",
  content: "",
  date: "",
  sectionId: "",
};

export const initialState: IPlan[] = [initialPlan];

export enum Action {
  SET = "set",
  ADD = "add",
  UPDATE = "update",
}

export function PlansProvider({ children }: { children: ReactNode }) {
  const [plans, dispatch] = useReducer(plansReducer, initialState);
  return (
    <PlansContext.Provider value={plans}>
      <PlansDispatchContext.Provider value={dispatch}>{children}</PlansDispatchContext.Provider>
    </PlansContext.Provider>
  );
}

function plansReducer(state: typeof initialState, action: { type: Action; values?: IPlan[]; value?: IPlan }) {
  switch (action.type) {
    case Action.SET: {
      return action.values ? action.values : state;
    }
    case Action.ADD: {
      return action.value ? [...state, action.value] : state;
    }
    case Action.UPDATE: {
      const plans = [...state];
      if (action.value) {
        const updateIndex = state.findIndex((plan) => plan.id === action.value?.id);
        plans.splice(updateIndex, 1, action.value);
      }
      return plans;
    }
  }
}
