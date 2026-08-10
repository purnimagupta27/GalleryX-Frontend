import API from "../utils/api";

const createCollection = async (data) => {
  const payload = typeof data === "string" ? { name: data } : data;
  const response = await API.post("/api/boards/create-board", payload);
  return response.data;
};

export { createCollection };