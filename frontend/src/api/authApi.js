import api from './axios';

export const authApi = {
  login: (credentials) => api.post('/auth/token/', credentials),
  register: (userData) => api.post('/accounts/register/', userData),
  getProfile: () => api.get('/accounts/profile/'),
  updateProfile: (data) => api.patch('/accounts/profile/', data),
  logout: (refreshToken) => api.post('/accounts/logout/', { refresh: refreshToken }),
  refreshToken: (refresh) => api.post('/auth/token/refresh/', { refresh }),
};

export default authApi;
