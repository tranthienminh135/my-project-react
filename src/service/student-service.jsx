import axios from "axios";

export const getAllStudents = async () => {
  const res = await axios.get("http://localhost:8080/student");
  return res.data;
};
