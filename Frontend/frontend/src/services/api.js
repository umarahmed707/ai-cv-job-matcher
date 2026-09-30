import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1",
});

export const analyzeCV = async (file) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post("/cv/analyze", formData);

  return response.data;
};

export default api;