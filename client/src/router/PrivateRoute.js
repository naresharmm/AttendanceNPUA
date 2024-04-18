import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, requiredRoles }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const isLoading = useSelector((state) => state.auth.loading);
    const isError = useSelector((state) => state.auth.error);

    if (isError) {
        return <div>{isError}</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

   return children;
};

export default PrivateRoute;
