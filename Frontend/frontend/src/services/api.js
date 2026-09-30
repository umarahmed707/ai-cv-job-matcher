import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
});

export const analyzeCV = async (file) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post("/cv/analyze", formData);

  return response.data;
};

export default api;