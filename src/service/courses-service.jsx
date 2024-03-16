import axios from "axios";

export const getAllCourses = async () => {
  const res = await axios.get("http://localhost:8080/courses");
  return res.data;
};
