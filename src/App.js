import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import NotFoundPage from './components/NotFoundPage'
const HomePage = React.lazy(() => import('./components/HomePage'))
const DashboardPage = React.lazy(() => import('./components/DashboardPage'))
const FeedbackPage = React.lazy(() => import('./components/FeedbackPage'))
const LoginPage = React.lazy(() => import('./components/LoginPage'))

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          index
          element={
            <React.Suspense fallback={<>...</>}>
              <HomePage />
            </React.Suspense>
          }
        />
        <Route
          path="feedback/:id"
          element={
            <React.Suspense fallback={<>...</>}>
              <FeedbackPage />
            </React.Suspense>
          }
        />
        <Route
          path="dashboard"
          element={
            <React.Suspense fallback={<>...</>}>
              <DashboardPage />
            </React.Suspense>
          }
        />
        <Route
          path="login"
          element={
            <React.Suspense fallback={<>...</>}>
              <LoginPage />
            </React.Suspense>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
