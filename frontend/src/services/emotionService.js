import * as faceapi from 'face-api.js';

// Constants for emotion detection
const EMOTIONS = ['angry', 'disgusted', 'fearful', 'happy', 'neutral', 'sad', 'surprised'];
const CONFIDENCE_THRESHOLD = 0.5;
const DETECTION_INTERVAL = 1000; // ms

/**
 * Service for handling emotion detection using face-api.js
 */
class EmotionService {
  constructor() {
    this.isInitialized = false;
    this.isProcessing = false;
    this.detectionInterval = DETECTION_INTERVAL;
    this.confidenceThreshold = CONFIDENCE_THRESHOLD;
    this.detectionTimer = null;
  }

  /**
   * Initialize face-api.js models
   * @returns {Promise<boolean>} - Promise resolving to initialization success
   */
  async initialize() {
    if (this.isInitialized) return true;
    
    try {
      // Load models from public folder
      const modelPath = '/models';
      
      // Load required face-api.js models for emotion recognition
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(modelPath),
        faceapi.nets.faceLandmark68Net.loadFromUri(modelPath),
        faceapi.nets.faceRecognitionNet.loadFromUri(modelPath),
        faceapi.nets.faceExpressionNet.loadFromUri(modelPath)
      ]);

      this.isInitialized = true;
      console.log('Face-api models loaded successfully');
      return true;
    } catch (error) {
      console.error('Error initializing face-api.js:', error);
      this.isInitialized = false;
      throw error;
    }
  }

  /**
   * Start emotion detection on video element
   * @param {HTMLVideoElement} videoElement - Video element with camera stream
   * @param {Function} onEmotionDetected - Callback function when emotion is detected
   * @param {Function} onError - Callback function when error occurs
   * @returns {Promise<boolean>} - Promise resolving to start success
   */
  async startDetection(videoElement, onEmotionDetected, onError) {
    if (!this.isInitialized) {
      try {
        await this.initialize();
      } catch (error) {
        if (onError) onError(error);
        return false;
      }
    }

    if (!videoElement || this.isProcessing) {
      return false;
    }

    this.isProcessing = true;

    // Clear any existing timer
    if (this.detectionTimer) {
      clearInterval(this.detectionTimer);
    }
    
    // Set up interval for detection
    this.detectionTimer = setInterval(async () => {
      if (videoElement.paused || videoElement.ended || !this.isProcessing) {
        return;
      }

      try {
        const detections = await faceapi.detectSingleFace(
          videoElement, 
          new faceapi.TinyFaceDetectorOptions()
        ).withFaceLandmarks().withFaceExpressions();

        if (detections) {
          // Process detected expressions
          const emotion = this.processExpressions(detections.expressions);
          
          if (emotion && onEmotionDetected) {
            onEmotionDetected(emotion);
          }
        }
      } catch (error) {
        console.error('Error during emotion detection:', error);
        if (onError) onError(error);
      }
    }, this.detectionInterval);

    return true;
  }

  /**
   * Process facial expressions to determine dominant emotion
   * @param {Object} expressions - Face expressions from face-api.js
   * @returns {Object|null} - Emotion object or null if confidence below threshold
   */
  processExpressions(expressions) {
    if (!expressions) return null;

    // Find the dominant emotion
    let dominantEmotion = null;
    let maxScore = 0;
    
    EMOTIONS.forEach(emotion => {
      const score = expressions[emotion];
      if (score > maxScore) {
        maxScore = score;
        dominantEmotion = emotion;
      }
    });

    // Check if the confidence exceeds the threshold
    if (dominantEmotion && maxScore >= this.confidenceThreshold) {
      return {
        type: dominantEmotion,
        rawScores: expressions,
        dominantScore: maxScore
      };
    }
    
    return null;
  }

  /**
   * Detect emotion from a single image
   * @param {HTMLImageElement|HTMLCanvasElement|HTMLVideoElement|ImageData} input - Image input
   * @returns {Promise<Object|null>} - Promise resolving to emotion object or null
   */
  async detectEmotionFromImage(input) {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      const detections = await faceapi.detectSingleFace(
        input, 
        new faceapi.TinyFaceDetectorOptions()
      ).withFaceLandmarks().withFaceExpressions();

      if (detections) {
        return this.processExpressions(detections.expressions);
      }
      
      return null;
    } catch (error) {
      console.error('Error detecting emotion from image:', error);
      throw error;
    }
  }

  /**
   * Stop emotion detection
   */
  stopDetection() {
    if (this.detectionTimer) {
      clearInterval(this.detectionTimer);
      this.detectionTimer = null;
    }
    this.isProcessing = false;
  }

  /**
   * Set detection interval
   * @param {number} interval - Interval in milliseconds
   */
  setDetectionInterval(interval) {
    this.detectionInterval = interval;
    
    // Restart detection if currently processing
    if (this.isProcessing && this.detectionTimer) {
      clearInterval(this.detectionTimer);
      this.startDetection();
    }
  }

  /**
   * Set confidence threshold
   * @param {number} threshold - Confidence threshold (0-1)
   */
  setConfidenceThreshold(threshold) {
    if (threshold >= 0 && threshold <= 1) {
      this.confidenceThreshold = threshold;
    }
  }

  /**
   * Get confidence threshold
   * @returns {number} - Current confidence threshold
   */
  getConfidenceThreshold() {
    return this.confidenceThreshold;
  }
}

// Export singleton instance
export default new EmotionService();