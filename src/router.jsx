import { Routes, Route } from 'react-router-dom';
import Admin from './apps/Admin';
import PublicPage from './components/PublicPage';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';

// Separate component for authenticated routes
function AuthenticatedRoutes() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/admin/*" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
                <Route path="/" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
            </Routes>
        </AuthProvider>
    );
}



export default function Router() {
    return (
        <Routes>
            {/* Public routes - no AuthContext */}
            <Route path="/page/:pageId" element={<Layout><PublicPage /></Layout>} />

            {/* Authenticated routes - with AuthContext */}
            <Route path="/*" element={<AuthenticatedRoutes />} />
        </Routes>
    );
}