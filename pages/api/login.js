import instance from "./instance";

export default async (req, res) => {
  const { email, password } = req.body;
  const login = instance.post("/admin/login", {
    email: email,
    password: password,
  });
};
