import { createStore } from "pinia";

export const useMainStore = createStore({
  id: "main",
  state: () => ({
    userToken: "",
  }),
  getters: {
    loggedIn: (state) => Boolean(state.userToken),
  },
});
