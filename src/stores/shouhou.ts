import { defineStore } from "pinia";

export const useAfterSale = defineStore("shouhou", {
  state: () => {
    return {
      order_number: null as string | null,
      order_type: null as string | null,
      phone_number: null as string | null,
    };
  },
  getters: {},
  actions: {},
});
