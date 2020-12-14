import axios from '../api/config';

class UploadFilesService {
    upload(file, onUploadProgress) {
      let formData = new FormData();
  
      formData.append("file", file);
  
      return axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
      });
    }

  }
  
  export default new UploadFilesService();