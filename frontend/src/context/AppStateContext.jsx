import React, { createContext, useContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';

// Define initial state
const initialState = {
  // Camera and emotion detection
  isCameraActive: false,
  isDetecting: false,
  detectionInterval: 1000, // milliseconds
  
  // Emotion data
  currentEmotion: null, // { type: string, rawScores: object, dominantScore: number }
  emotionHistory: [], // [{timestamp: Date, emotion: Emotion, confidenceScore: number}]
  
  // Recommendations
  recommendations: [],
  isLoadingRecommendations: false,
  
  // User settings
  userSettings: {
    cameraEnabled: true,
    preferredGenres: [],
    detectionInterval: 1000,
    persistRecommendations: true,
  },
  
  // Errors and application state
  errors: [],
  isLoading: false,
};

// Define actions
const ACTIONS = {
  SET_CAMERA_ACTIVE: 'SET_CAMERA_ACTIVE',
  SET_DETECTING: 'SET_DETECTING',
  UPDATE_EMOTION: 'UPDATE_EMOTION',
  SET_RECOMMENDATIONS: 'SET_RECOMMENDATIONS',
  SET_LOADING_RECOMMENDATIONS: 'SET_LOADING_RECOMMENDATIONS',
  UPDATE_USER_SETTINGS: 'UPDATE_USER_SETTINGS',
  ADD_ERROR: 'ADD_ERROR',
  CLEAR_ERRORS: 'CLEAR_ERRORS',
  SET_LOADING: 'SET_LOADING',
};

// Reducer function to handle state updates
const appStateReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_CAMERA_ACTIVE:
      return { ...state, isCameraActive: action.payload };
    
    case ACTIONS.SET_DETECTING:
      return { ...state, isDetecting: action.payload };
    
    case ACTIONS.UPDATE_EMOTION:
      const newEmotionRecord = {
        timestamp: new Date(),
        emotion: action.payload,
        confidenceScore: action.payload?.dominantScore || 0,
      };
      
      return {
        ...state,
        currentEmotion: action.payload,
        emotionHistory: [...state.emotionHistory, newEmotionRecord].slice(-20), // Keep only last 20 records
      };
    
    case ACTIONS.SET_RECOMMENDATIONS:
      return { ...state, recommendations: action.payload };
    
    case ACTIONS.SET_LOADING_RECOMMENDATIONS:
      return { ...state, isLoadingRecommendations: action.payload };
    
    case ACTIONS.UPDATE_USER_SETTINGS:
      return {
        ...state,
        userSettings: { ...state.userSettings, ...action.payload },
      };
    
    case ACTIONS.ADD_ERROR:
      return {
        ...state,
        errors: [...state.errors, action.payload],
      };
    
    case ACTIONS.CLEAR_ERRORS:
      return { ...state, errors: [] };
    
    case ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };
    
    default:
      return state;
  }
};

// Create context
const AppStateContext = createContext();

// Custom hook to use the context
export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};

// Provider component
export const AppStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appStateReducer, initialState);
  
  // Actions to be exposed through context
  const actions = {
    setCameraActive: (isActive) => {
      dispatch({ type: ACTIONS.SET_CAMERA_ACTIVE, payload: isActive });
    },
    
    setDetecting: (isDetecting) => {
      dispatch({ type: ACTIONS.SET_DETECTING, payload: isDetecting });
    },
    
    updateEmotion: (emotion) => {
      dispatch({ type: ACTIONS.UPDATE_EMOTION, payload: emotion });
    },
    
    setRecommendations: (songs) => {
      dispatch({ type: ACTIONS.SET_RECOMMENDATIONS, payload: songs });
    },
    
    setLoadingRecommendations: (isLoading) => {
      dispatch({ type: ACTIONS.SET_LOADING_RECOMMENDATIONS, payload: isLoading });
    },
    
    updateUserSettings: (newSettings) => {
      dispatch({ type: ACTIONS.UPDATE_USER_SETTINGS, payload: newSettings });
      // In a real app, you might persist these settings to localStorage or a backend
      localStorage.setItem('userSettings', JSON.stringify({
        ...state.userSettings,
        ...newSettings,
      }));
    },
    
    addError: (error) => {
      dispatch({ type: ACTIONS.ADD_ERROR, payload: error });
    },
    
    clearErrors: () => {
      dispatch({ type: ACTIONS.CLEAR_ERRORS });
    },
    
    setLoading: (isLoading) => {
      dispatch({ type: ACTIONS.SET_LOADING, payload: isLoading });
    },
  };
  
  // Load user settings from localStorage on initial render
  useEffect(() => {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        actions.updateUserSettings(parsedSettings);
      } catch (error) {
        console.error('Failed to parse saved settings:', error);
      }
    }
  }, []);
  
  // Value to be provided by the context
  const value = {
    ...state,
    ...actions,
  };
  
  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};

AppStateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppStateContext;