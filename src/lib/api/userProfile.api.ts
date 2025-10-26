import API from './client';

export const UserProfileAPI = {
  create: (data: any) => API.post('/user-profile', data),
  getAll: () => API.get('/user-profile'),
  getByUserId: (id: string) => API.get(`/user-profile/${id}`),
  uploadPhoto: (id: string, file: File) => {
    const fd = new FormData();
    fd.append('file', file);
    return API.post(`/user-profile/${id}/upload-photo`, fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  updatePhoto: (id: string, file: File) => {
    const fd = new FormData();
    fd.append('file', file);
    return API.patch(`/user-profile/${id}/update-photo`, fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  deletePhoto: (userId: string) => API.delete(`/user-profile/${userId}/photo`),
};
