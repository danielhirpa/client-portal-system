import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
});

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
export className AuthAPI {
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