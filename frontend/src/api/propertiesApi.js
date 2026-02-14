import api from './axios';

export const propertiesApi = {
  list: (params) => api.get('/properties/', { params }),
  get: (uuid) => api.get(`/properties/${uuid}/`),
  create: (data) => api.post('/properties/', data),
  update: (uuid, data) => api.patch(`/properties/${uuid}/`, data),
  delete: (uuid) => api.delete(`/properties/${uuid}/`),
  dashboardStats: () => api.get('/properties/dashboard_stats/'),
};

export const unitsApi = {
  list: (params) => api.get('/properties/units/', { params }),
  get: (uuid) => api.get(`/properties/units/${uuid}/`),
  create: (data) => api.post('/properties/units/', data),
  update: (uuid, data) => api.patch(`/properties/units/${uuid}/`, data),
  delete: (uuid) => api.delete(`/properties/units/${uuid}/`),
};

export default propertiesApi;
