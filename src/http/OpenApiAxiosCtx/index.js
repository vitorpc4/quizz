const { default: axios } = require("axios");

const instance = axios.create({
  baseURL: process.env.OPENAI_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
});

export default instance;
