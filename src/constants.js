export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://finance-backend.herokuapp.com/api"
    : "http://localhost:3001/api";
