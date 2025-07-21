// Base API route (from .env)
const BASE_API = import.meta.env.VITE_API_BASE_URL;

// All backend endpoints
const ENDPOINTS = {
  AUTH: {
    LOGIN: `${BASE_API}/auth/login`,
    SIGNUP: `${BASE_API}/auth/signup`,
    FETCH: `${BASE_API}/auth/fetch`,
    LOGOUT: `${BASE_API}/auth/logout`,
  },
  USER: {
    FETCH: `${BASE_API}/user/getuser`,
  },
  PLAN: {
    GET: `${BASE_API}/plan/get`,
    ADD: `${BASE_API}/plan/add`,
    UPDATE: `${BASE_API}/plan/update`,
    DELETE: `${BASE_API}/plan/delete`,
  }
};

export default ENDPOINTS;