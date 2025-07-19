import { Routes, Route } from 'react-router-dom';
import Admin from './apps/Admin';
import PublicPage from './components/PublicPage';
import Products from './pages/Products.jsx';
import Blogs from './pages/Blogs.jsx';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import DigitalDrivePage from './pages/DigitalDrivePage';
import BlogListPage from './pages/BlogListPage.jsx';
import BlogPostPage from './pages/BlogPostPage.jsx';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.jsx';
import { ThemeProvider } from './components/theme-provider.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import { supabase } from './lib/supabaseClient.js';
import { useToast } from './components/ui/use-toast';
import Team from './pages/Team.jsx';



// Separate component for authenticated routes
function AuthenticatedRoutes() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/admin/*" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
                <Route path="/" element={<DigitalDrivePage />} />
            </Routes>
        </AuthProvider>
    );
}


export default function Router() {
    return (
        <Layout>
            <Routes>
                {/* Public routes - no AuthContext */}
                <Route path="/page/:pageId" element={<PublicPage />} />
                <Route path="/products" element={<Products />} />
                <Route path="/team/" element={<Team />} />
                <Route path="/blogs" element={<Blogs />} />

                {/* Authenticated routes - with AuthContext */}
                {/* <Route path="/" element={<DigitalDrivePage />} /> */}
                <Route path="/*" element={<AuthenticatedRoutes />} />
                {/* <Route path="/blog" element={<BlogListPage />} /> */}
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                {/* <Route path="/admin/blog" element={<AuthRedirect><AdminBlogPage /></AuthRedirect>} /> */}
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            </Routes>
        </Layout>
    );
}