import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({ component: Component, fallBackPath, isAllowed }) => {
    if (!isAllowed) {
        return <Navigate to={fallBackPath} />
    }
    return <Component />
}

export default ProtectedRoutes
