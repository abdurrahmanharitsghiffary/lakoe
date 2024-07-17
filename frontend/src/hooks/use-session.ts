import { create } from "zustand";

type State = {
  token: string;
};

type Actions = {
  setToken: (token: string) => void;
};

export const useSession = create<State & { actions: Actions }>((set) => ({
  token: localStorage.getItem("token") ?? "",
  actions: {
    setToken: (token: string) => set((state) => ({ ...state, token })),
  },
}));

export const useSessionActions = () => useSession((state) => state.actions);
