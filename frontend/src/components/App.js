import { useAuth } from '../utils/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";
import { Route, Routes, Navigate } from 'react-router-dom'
import NoMatch from "./Nomatch";
import Feed from "./Feed";
import Headers from "./Header";
import CreatePost from "./CreatePost";
import Alumni from "./Alumni";
import Events from "./Events";
import ErrorBoundary from "./common/ErrorBoundary";
import { ErrorModuleProvider } from "./common/ErrorModule";
import ErrorToastContainer from "./common/ErrorToast";
import ErrorHistory from "./common/ErrorHistory";
import ProtectedRoute from "./common/ProtectedRoute";

function App() {
  const auth = useAuth();

  // Show loading screen while checking localStorage
  if (auth.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-gray-600">Loading...</p>
          <p className="text-sm text-gray-500 mt-2">Restoring your session</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorModuleProvider>
      <ErrorBoundary>
        <Headers />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <ErrorBoundary>
              <Home />
            </ErrorBoundary>
          } />
          <Route path="/register" element={
            <ErrorBoundary>
              <Register />
            </ErrorBoundary>
          } />
          <Route path="/login" element={
            <ErrorBoundary>
              <Login />
            </ErrorBoundary>
          } />

          {/* Protected Routes */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <ErrorBoundary>
                <Profile />
              </ErrorBoundary>
            </ProtectedRoute>
          } />
          <Route path="/feed" element={
            <ProtectedRoute>
              <ErrorBoundary>
                <Feed />
              </ErrorBoundary>
            </ProtectedRoute>
          } />
          <Route path="/events" element={
            <ProtectedRoute>
              <ErrorBoundary>
                <Events />
              </ErrorBoundary>
            </ProtectedRoute>
          } />
          <Route path="/post/create" element={
            <ProtectedRoute>
              <ErrorBoundary>
                <CreatePost />
              </ErrorBoundary>
            </ProtectedRoute>
          } />
          <Route path="/alumni" element={
            <ProtectedRoute>
              <ErrorBoundary>
                <Alumni />
              </ErrorBoundary>
            </ProtectedRoute>
          } />

          {/* 404 Route */}
          <Route path="*" element={<NoMatch />} />
        </Routes>
        <ErrorToastContainer />
        <ErrorHistory />
      </ErrorBoundary>
    </ErrorModuleProvider>
  );
}



export default App;
