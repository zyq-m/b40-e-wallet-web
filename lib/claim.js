import instance from "./instance";

export const claim = async (from, to) => {
  return await instance.put(`/api/transactions/claim/${from}/${to}`);
};
