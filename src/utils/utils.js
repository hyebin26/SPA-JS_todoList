export const checkTokenAPI = async () => {
  const checkToken = await axios.get("/checkToken");
  return checkToken.data;
};
