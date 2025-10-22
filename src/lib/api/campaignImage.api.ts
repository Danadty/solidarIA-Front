import API from './client';

export const CampaignImageAPI = {
  upload: (campaignId: string, files: File[]) => {
    const fd = new FormData();
    files.forEach((f) => fd.append('files', f));
    return API.post(`/campaign-image/${campaignId}`, fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  getByCampaign: (campaignId: string) => API.get(`/campaign-image/${campaignId}`),
  delete: (imageId: string) => API.delete(`/campaign-image/${imageId}`),
};
