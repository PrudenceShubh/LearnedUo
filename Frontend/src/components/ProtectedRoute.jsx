import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Replace the component implementation with a simple passthrough
const ProtectedRoute = ({ children }) => {
    // Bypass authentication for now; always render children
    return <>{children}</>;
};

export default ProtectedRoute;