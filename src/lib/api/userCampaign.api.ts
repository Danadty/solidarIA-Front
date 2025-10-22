import API from './client';

export const UserCampaignAPI = {
  create: (data: any) => API.post('/user-campaign', data),
  getAll: () => API.get('/user-campaign'),
  getByUser: (userId: string) => API.get(`/user-campaign/user/${userId}`),
  getByCampaign: (campaignId: string) => API.get(`/user-campaign/campaign/${campaignId}`),
  delete: (userId: string, campaignId: string) => API.delete(`/user-campaign/${userId}/${campaignId}`),
};
