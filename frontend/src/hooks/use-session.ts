import { create } from "zustand";

type State = {
  token: string | null;
  user: {
    userId: number;
    role: "USER" | "ADMIN";
    storeId: number | null;
  } | null;
};

type Actions = {
  setToken: (token: string) => void;
  login: (token: string) => void;
  logout: () => void;
};

const token = localStorage.getItem("token");

export const useSession = create<State & { actions: Actions }>((set) => ({
  token: token ?? null,
  user: token ? JSON.parse(atob(token?.split(".")?.[1])) : null,
  actions: {
    setToken: (token: string) => set((state) => ({ ...state, token })),
    logout: () => {
      localStorage.removeItem("token");
      set((state) => ({ ...state, token: null }));
    },
    login: (token: string) => {
      const payload = token?.split(".")?.[1];
      localStorage.setItem("token", token);
      const user = JSON.parse(atob(payload));
      console.log(user, "USER");
      set((state) => ({ ...state, token, user }));
    },
  },
}));

export const useSessionActions = () => useSession((state) => state.actions);
