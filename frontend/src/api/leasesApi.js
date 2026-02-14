import api from './axios';

export const leasesApi = {
  list: (params) => api.get('/leases/', { params }),
  get: (uuid) => api.get(`/leases/${uuid}/`),
  create: (data) => api.post('/leases/', data),
  update: (uuid, data) => api.patch(`/leases/${uuid}/`, data),
  delete: (uuid) => api.delete(`/leases/${uuid}/`),
};

export default leasesApi;
