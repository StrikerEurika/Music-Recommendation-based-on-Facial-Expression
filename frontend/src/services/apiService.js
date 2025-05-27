import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

class ApiService {
  /**
   * Send image data to the emotion detection API
   * @param {File|Blob} imageData - Image file from camera
   * @returns {Promise} - Promise resolving to emotion detection result
   */
  async detectEmotion(imageData) {
    try {
      const formData = new FormData();
      formData.append("file", imageData);

      const response = await axios.post(`${API_BASE_URL}/emotion`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // response.data: { emotion: 'happy', songs: [...] }
      return response.data;
    } catch (error) {
      console.error("Error detecting emotion:", error);
      throw error;
    }
  }

  // ...rest of your methods remain unchanged
}

export default new ApiService();
