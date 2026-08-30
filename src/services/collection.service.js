import API from "../utils/api";

const createCollection = async (data) => {
  const payload = typeof data === "string" ? { name: data } : data;
  const response = await API.post("/api/boards/create-board", payload);
  return response.data;
};

const getCollections = async () => {
  const response = await API.get(`/api/boards/my-boards`)
  return response.data
}

const deletecollection  = async (boardId) => {
  const response = await API.delete(`/api/boards/${boardId}`)
  return response.data
}

export { 
  createCollection ,
  getCollections,
  deletecollection
};
