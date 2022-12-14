import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import FormWedding from './pages/FormWedding';
import CategoryForm from './pages/CategoryForm';
import PackageForm from './pages/PackageForm';
import DecorationForm from './pages/DecorationForm';
import CateringForm from './pages/CateringForm';
import AttireForm from './pages/AttireForm';
import VenueDetail from './components/details/VenueDetail';

// ----------------------------------------------------------------------

export default function Router() {
  const isLogin = localStorage.getItem('myToken')
  return useRoutes([
    {
      path: '/dashboard',
      element: isLogin? <DashboardLayout /> : <Login />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'wedding', element: <FormWedding /> },
        { path: 'package', element: <CategoryForm /> },
        { path: 'category', element: <PackageForm /> },
        { path: 'decoration', element: <DecorationForm /> },
        { path: 'catering', element: <CateringForm /> },
        { path: 'makeup', element: <AttireForm /> },
      ],
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'register',
      element: <Register />,
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
    {
      path: 'wedding/:id',
      element: <VenueDetail />
    }
  ]);
}
