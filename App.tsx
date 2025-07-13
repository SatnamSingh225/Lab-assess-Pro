import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Layout from './components/Layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Assessments from './pages/Assessments';
import AssessmentDetail from './pages/AssessmentDetail';
import Rubrics from './pages/Rubrics';
import RubricBuilder from './pages/RubricBuilder';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import LoadingSpinner from './components/UI/LoadingSpinner';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/" element={
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/assessments" element={
        <ProtectedRoute>
          <Layout>
            <Assessments />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/assessments/:id" element={
        <ProtectedRoute>
          <Layout>
            <AssessmentDetail />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/rubrics" element={
        <ProtectedRoute>
          <Layout>
            <Rubrics />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/rubrics/builder" element={
        <ProtectedRoute>
          <Layout>
            <RubricBuilder />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/reports" element={
        <ProtectedRoute>
          <Layout>
            <Reports />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Layout>
            <Profile />
          </Layout>
        </ProtectedRoute>
      } />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <DndProvider backend={HTML5Backend}>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <AppRoutes />
          </div>
        </Router>
      </DndProvider>
    </AuthProvider>
  );
}

export default App;