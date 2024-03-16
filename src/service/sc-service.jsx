import axios from "axios";

export const getAllSCPage = async (pageParam) => {
  const res = await axios.post("http://localhost:8080/sc", pageParam);
  return res.data;
};

export const deleteSC = async (id) => {
  const res = await axios.delete(`http://localhost:8080/sc/${id}`);
  return res.data;
};

export const createSC = async (sc) => {
  const res = await axios.post("http://localhost:8080/sc/create", sc);
  return res.data;
};
