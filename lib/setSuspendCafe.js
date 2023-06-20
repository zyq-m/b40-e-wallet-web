import instance from "./instance";

export const suspendCafe = async (id, active) => {
  const response = await instance
    .put(`/api/cafe/${id}/suspend`, {
      active: active,
    })
    .then(res => res.status)
    .catch(err => console.error(err));

  return response;
};
