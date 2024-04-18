import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PublicRoute = ({ isAuthenticated, redirectTo, children, ...rest }) => {
    if (!isAuthenticated){
        return  <Navigate to={redirectTo} replace />
    }


    return children
};

export default PublicRoute;
