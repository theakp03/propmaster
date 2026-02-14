import api from './axios';

export const paymentsApi = {
  list: (params) => api.get('/payments/', { params }),
  get: (uuid) => api.get(`/payments/${uuid}/`),
  create: (data) => api.post('/payments/', data),
};

export default paymentsApi;
