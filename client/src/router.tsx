import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/Layout'
import Products, { loader as productsLoader, action as updateAvailabilityAction } from './views/Products'
import NewProduct, { action as newProductAction } from './views/NewProduct'
import EditProduct, { loader as editProductLoader, action as editProductAction } from './views/EditProduct'
import { action as deleteProductAction } from './components/ProductDetails';
import AuthLayout from './layouts/AuthLayout';
import Login from './views/auth/Login';
import Register from './views/auth/Register';
import ProtectedRoute from './components/ProtectedRoute';
import NewPassword from './views/auth/NewPassword';
import ForgotPassword from './views/auth/ForgotPassword';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedRoute>
                    <Layout />
                </ProtectedRoute>, 
        children: [
            {
                index: true,
                element: <Products />,
                loader: productsLoader,
                action: updateAvailabilityAction
            },
            {
                path: 'productos/nuevo',
                element: <NewProduct />,
                action: newProductAction
            },
            {
                path:'productos/:id/editar', // ROA Pattern - Resource-oriented design
                element: <EditProduct />,
                loader: editProductLoader,
                action: editProductAction
            }, 
            {
                path:'productos/:id/eliminar',
                action: deleteProductAction
            }
        ],
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'registro',
                element: <Register />
            },
            {
                path: 'olvide-password',  
                element: <ForgotPassword />
            },
            {
                path: 'nuevo-password/:token',
                element: <NewPassword />
            }
        ]
    }
])