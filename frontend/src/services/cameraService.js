class CameraService {
  constructor() {
    this.videoStream = null;
    this.isActive = false;
    this.videoElement = null;
    this.canvasElement = null;
  }

  async initialize(videoElement, canvasElement) {
    this.videoElement = videoElement;
    this.canvasElement = canvasElement;
  }

  async startCapture(constraints = { video: true }) {
    try {
      this.videoStream = await navigator.mediaDevices.getUserMedia(constraints);
      this.videoElement.srcObject = this.videoStream;
      this.isActive = true;
      return this.videoStream;
    } catch (error) {
      console.error("Camera Error:", error);
      throw error;
    }
  }

  stopCapture() {
    if (this.videoStream) {
      this.videoStream.getTracks().forEach(track => track.stop());
      this.videoElement.srcObject = null;
      this.isActive = false;
    }
  }
}

export default new CameraService();