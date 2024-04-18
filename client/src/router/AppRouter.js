import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard";
import AppLayout from "../layout/AppLayout";
import ThankYouPage from "../pages/ThankYouPage/ThankYouPage";
import NotFoundPage from "../pages/404/NotFoundPage";
import {useSelector} from "react-redux";
import AttendancePage from "../pages/Attendance/AttendancePage";
import ContactPage from "../pages/Contact/ContactPage";
import MenuComponent from "../components/Menu/MenuComponent";
import ClassPage from "../pages/Class/ClassPage";
import CreateUserPage from "../pages/Admin/CreateUser";
import CreateGroupPage from "../pages/Admin/CreateGroup";
import CreateObjectPage from "../pages/Admin/CreateObject";
import DeleteStudentPage from "../pages/Admin/DeleteStudent";
import Messages from "../pages/Messages/Messages";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AdminPage from "../pages/Admin/Admin";
import ChangeMyPasswordPage from '../pages/ChangeMyPassword/ChageMyPasswordPage';

const AppRouter = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return (
        <Router>

            <Routes>
                {isAuthenticated ? (
                    <Route path="/login" element={<Navigate to="/dashboard" replace/>}/>
                ) : (
                    <Route path="/login" element={<Login/>}/>
                )}
                <Route
                    path="/"
                    element={isAuthenticated ? <Navigate to="/dashboard" replace/> : <Login/>}
                />
                <Route path="/thank-you" element={<ThankYouPage/>}/>
                <Route path="/error" element={<ErrorPage/>}/>
                <Route exact path='/dashboard' element={
                    <PrivateRoute
                        children={
                            <AppLayout Component={<MenuComponent />}>
                                <Dashboard/>
                            </AppLayout>
                        }/>}/>


                <Route exact path='/contact' element={
                    <PrivateRoute
                        children={
                            <AppLayout Component={<MenuComponent />}>
                                <ContactPage/>
                            </AppLayout>
                        }/>}/>
                
                <Route exact path='/admin' element={
                    <PrivateRoute
                        children={
                            <AppLayout Component={<MenuComponent />}>
                                <AdminPage/>
                            </AppLayout>
                        }/>}/>
                <Route exact path='/changemypassword' element={
                    <PrivateRoute
                        children={
                            <AppLayout Component={<MenuComponent />}>
                                <ChangeMyPasswordPage/>
                            </AppLayout>
                        }/>}/>

                <Route exact path='/class/create' element={
                    <PrivateRoute
                        children={
                            <AppLayout Component={<MenuComponent />}>
                                <ClassPage/>
                            </AppLayout>
                        }/>}/>

                <Route exact path='/attendance' element={
                    <PrivateRoute
                        children={
                            <AppLayout Component={<MenuComponent isHeader={true}/>}>
                                <AttendancePage/>
                            </AppLayout>
                        }/>}/>

                <Route exact path='/messages' element={
                    <PrivateRoute
                        children={
                            <AppLayout Component={<MenuComponent />}>
                                <Messages/>
                            </AppLayout>
                        }/>}/>

                <Route exact path='/admin/createuser' element={
                    <PrivateRoute
                        children={
                            <AppLayout Component={<MenuComponent />}>
                                <CreateUserPage/>
                            </AppLayout>
                        }/>}/>
                <Route exact path='/admin/creategroup' element={
                    <PrivateRoute
                        children={
                            <AppLayout Component={<MenuComponent />}>
                                <CreateGroupPage/>
                            </AppLayout>
                        }/>}/>
                <Route exact path='/admin/createobject' element={
                    <PrivateRoute
                        children={
                            <AppLayout Component={<MenuComponent />}>
                                <CreateObjectPage/>
                            </AppLayout>
                        }/>}/>
                <Route exact path='/admin/deletestudent' element={
                    <PrivateRoute
                        children={
                            <AppLayout Component={<MenuComponent />}>
                                <DeleteStudentPage/>
                            </AppLayout>
                        }/>}/>

                <Route path='*' element={<NotFoundPage/>}/>

            </Routes>
        </Router>
    );
};

export default AppRouter;