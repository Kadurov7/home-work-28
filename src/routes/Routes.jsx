import React from 'react'
import { Routes as Router, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import UserLayout from '../layout/UserLayout'
import MealsPage from '../pages/MealsPage'
import SignUp from '../pages/SignUp'
import SignIn from '../pages/SignIn'
import ProtectedRoutes from './ProtectedRoutes'
import UserRoles from '../lib/constants/common'
import AdminLayout from '../layout/AdminLayout'
import Meals from '../pages/admin/Meals'
import Orders from '../pages/admin/Orders'
import NotFound from '../pages/NotFound'

const Routes = () => {
    const role = useSelector((state) => state.auth.user.role)

    const isAllowed = (roles) => {
        return roles.includes(role)
    }
    return (
        <Router>
            <Route
                path="/"
                element={
                    <ProtectedRoutes
                        isAllowed={isAllowed([UserRoles.GUEST, UserRoles.USER])}
                        fallBackPath="/admin/meals"
                        component={UserLayout}
                    />
                }
            >
                <Route
                    index
                    element={
                        <ProtectedRoutes
                            isAllowed={isAllowed([
                                UserRoles.GUEST,
                                UserRoles.USER,
                            ])}
                            fallBackPath="/admin/meals"
                            component={MealsPage}
                        />
                    }
                />
                <Route
                    path="signup"
                    element={
                        <ProtectedRoutes
                            isAllowed={isAllowed([
                                UserRoles.GUEST,
                                UserRoles.USER,
                            ])}
                            fallBackPath={
                                role === UserRoles.ADMIN ? '/admin/meals' : '/'
                            }
                            component={SignUp}
                        />
                    }
                />
                <Route
                    path="signin"
                    element={
                        <ProtectedRoutes
                            isAllowed={isAllowed([
                                UserRoles.GUEST,
                                UserRoles.USER,
                            ])}
                            fallBackPath={
                                role === UserRoles.ADMIN ? '/admin/meals' : '/'
                            }
                            component={SignIn}
                        />
                    }
                />
            </Route>

            <Route
                path="/admin"
                element={
                    <ProtectedRoutes
                        isAllowed={isAllowed([UserRoles.ADMIN])}
                        fallBackPath="/"
                        component={AdminLayout}
                    />
                }
            >
                <Route
                    path="meals"
                    element={
                        <ProtectedRoutes
                            isAllowed={isAllowed([UserRoles.ADMIN])}
                            fallBackPath="/"
                            component={Meals}
                        />
                    }
                />
                <Route
                    path="orders"
                    element={
                        <ProtectedRoutes
                            isAllowed={isAllowed([UserRoles.ADMIN])}
                            fallBackPath="/"
                            component={Orders}
                        />
                    }
                />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Router>
    )
}

export default Routes
