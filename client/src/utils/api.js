import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9000',
});

export const loginUser = (data) => api.post('/auth', data);
export const signUpUser = (data) => api.post('/user', data);
export const fetchAccounts = (userId) => api.get(`/user/${userId}/accounts`);
export const fetchTransfers = (accountId) => api.get(`/accounts/${accountId}/transfers`);
export const createAccount = (userId, data) => api.post(`user/${userId}/account`, data)
export const createTransfer = (fromAccountId, data) => api.post(`accounts/${fromAccountId}/transfer`, data)
