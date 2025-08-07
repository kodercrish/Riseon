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
  },
  DIARY: {
    GET: `${BASE_API}/diaryentry/get`,
    ADD: `${BASE_API}/diaryentry/add`,
    UPDATE: `${BASE_API}/diaryentry/update`,
    DELETE: `${BASE_API}/diaryentry/delete`,
  },
  RESOLUTION: {
    GETALL: `${BASE_API}/resolution/getall`,
    GETPUBLIC: `${BASE_API}/resolution/getpublic`,
    ADD: `${BASE_API}/resolution/add`,
    UPDATE: `${BASE_API}/resolution/update`,
    DELETE: `${BASE_API}/resolution/delete`,
  },
  RESOLUTIONLOG: {
    GET: `${BASE_API}/resolutionlog/get`,
    ADD: `${BASE_API}/resolutionlog/add`,
    UPDATE: `${BASE_API}/resolutionlog/update`,
    DELETE: `${BASE_API}/resolutionlog/delete`,
  }
};

export default ENDPOINTS;