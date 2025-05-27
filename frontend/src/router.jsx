import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import App from './App.jsx';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import RecommendationsPage from './pages/RecommendationsPage';
import AboutPage from './pages/AboutPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App><Layout /></App>,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'recommendations', element: <RecommendationsPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
], {
  future: {
    v7_relativeSplatPath: true,
    v7_startTransition: true
  }
});

export default router;
