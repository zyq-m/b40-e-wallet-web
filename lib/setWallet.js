import instance from "../pages/api/instance";

export const setWallet = (id, amount) => {
  instance.put(`/api/students/${id}/wallet`, {
    amount: amount,
  });
};
