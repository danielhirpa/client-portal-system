import axios from 'axios';

// Dynamically read Vercel env variable or default to your live Render backend
const RAW_URL = import.meta.env.NEXT_PUBLIC_API_URL || 'https://client-portal-system.onrender.com';
const CLEAN_BASE = RAW_URL.replace(/\/+$/, '');
const API_BASE_URL = `${CLEAN_BASE}/api/v1/`;

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Alias apiClient to maintain compatibility across components
export const apiClient = API;

// Attach JWT access token to every outgoing request if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Authentication endpoints
export class AuthAPI {
  static login(credentials) {
    return API.post('auth/token/', credentials);
  }
  static refreshToken(refreshToken) {
    return API.post('auth/token/refresh/', { refresh: refreshToken });
  }
}

// Project & Task endpoints
export const fetchProjects = () => API.get('projects/');
export const fetchTasks = (params) => API.get('tasks/', { params });
export const createTask = (taskData) => API.post('tasks/', taskData);
export const updateTaskStatus = (taskId, status) => API.patch(`tasks/${taskId}/`, { status });

export default API;