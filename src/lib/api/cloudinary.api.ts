import API from './client';

export const CloudinaryAPI = {
  upload: (file: File) => {
    const fd = new FormData();
    fd.append('file', file);
    return API.post('/cloudinary/upload', fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
