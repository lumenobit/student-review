import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom'
import NotFoundPage from './components/NotFoundPage'
import PageLoader from "./components/PageLoader";
import AuthGuard from "./components/AuthGuard";
const HomePage = React.lazy(() => import('./components/HomePage'))
const DashboardPage = React.lazy(() => import('./components/DashboardPage'))
const FeedbackPage = React.lazy(() => import('./components/FeedbackPage'))
const LoginPage = React.lazy(() => import('./components/LoginPage'))

function App() {

  const navigate = useNavigate();

  return (
    <div className="App">
      <Routes>
        <Route
          index
          element={
            <React.Suspense fallback={<PageLoader />}>
              <HomePage />
            </React.Suspense>
          }
        />
        <Route
          path="feedback/:id"
          element={
            <React.Suspense fallback={<PageLoader />}>
              <FeedbackPage />
            </React.Suspense>
          }
        />
        <Route
          path="dashboard"
          element={
            <AuthGuard>
              <React.Suspense fallback={<PageLoader />}>
                <DashboardPage />
              </React.Suspense>
            </AuthGuard>
          }
        />
        <Route
          path="login"
          element={
            <React.Suspense fallback={<PageLoader />}>
              <LoginPage navigate={navigate} />
            </React.Suspense>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
