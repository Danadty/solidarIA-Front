import API from './client';

export const CampaignAPI = {
  create: (data: any) => API.post('/campaign', data),
  getAll: () => API.get('/campaign'),
  updatePortada: (id: string, file: File) => {
    const fd = new FormData();
    fd.append('file', file);
    return API.post(`/campaign/${id}/update-portada`, fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  uploadImages: (id: string, files: File[]) => {
    const fd = new FormData();
    files.forEach((file) => fd.append('files', file));
    return API.post(`/campaign/${id}/images`, fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  getImages: (id: string) => API.get(`/campaign/${id}/images`),
  deleteImage: (imageId: string) => API.delete(`/campaign/image/${imageId}`),
  delete: (id: string) => API.delete(`/campaign/${id}`),
};
