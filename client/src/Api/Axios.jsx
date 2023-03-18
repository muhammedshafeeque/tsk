import axios from "axios";
export const baseUrl="http://localhost:5000/api/"
const instance = axios.create({
    baseURL:baseUrl,
  });

export default instance