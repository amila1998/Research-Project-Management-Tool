import axios from "axios";
axios.defaults.withCredentials = true;
export const event = axios.create({
    baseURL: "/api/events"
  });

  // export const featuredCategory = axios.create({
  //   baseURL: "http://localhost:8000/api/category/",
  //   params: {featured: true}
  // });

