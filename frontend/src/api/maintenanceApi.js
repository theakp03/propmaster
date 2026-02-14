import api from './axios';

export const maintenanceApi = {
  list: (params) => api.get('/maintenance/', { params }),
  get: (uuid) => api.get(`/maintenance/${uuid}/`),
  create: (data) => api.post('/maintenance/', data),
  update: (uuid, data) => api.patch(`/maintenance/${uuid}/`, data),
  delete: (uuid) => api.delete(`/maintenance/${uuid}/`),
};

export default maintenanceApi;
