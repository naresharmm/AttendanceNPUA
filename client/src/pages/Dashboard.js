import React from 'react';
import QRCodeGenerator from "../components/QRCodeGenerator/QRCodeGenerator";
import ClassTable from "../components/ClassTable/ClassTable";
import PermissionWrapper from "../components/PermissionWrapper/PermissionWrapper";
import UploadForm from "../components/FileUpload/FileUpload";
import AttendanceTable from "../components/AttendanceTable";
import styles from './Dashboard.module.css'
import Messages from "./Messages/Messages";
import * as auth from "../helpers/auth";
import { SERVER_HOST_IP } from "../constants/config";

///
import { useState, useEffect } from 'react';
import axios from 'axios';
///

const roleCustomNames = {
    Student: 'Ուսանող',
    Teacher: 'Դասախոս',
    Admin: 'Դեկանատ',
    SuperAdmin: 'Դեկան'
};

const Dashboard = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = auth.getToken();
                const response = await axios.get(`${SERVER_HOST_IP}/user`, {
                    headers: {
                        Authorization: `${token}` // Include the JWT token in the authorization header
                    }
                });
                // const response = await axios.get('/user');
                // console.log(response)
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);
    // console.log(userData)
    return (
        <div className={styles.dashboardContainer}>
            {userData ? (
                <div className={styles.uploadFormContainer}>
                    <h1>Օգտատեր</h1>
                    {userData && userData.avatar ? <img src={`${SERVER_HOST_IP}/${userData.avatar}`} alt="Avatar" style={{width:150}}/> : ""}
                    {/* { userData.cou  rse && userData.course.name && <p>Խումբ: {userData.course.name}</p>} */}
                    {userData.username ? <p> {userData.username}</p> : ""}
                    {userData.email ? <p>Էլ․հասցե: {userData.email}</p> : ""}
                    {userData.role.name ? <p>Դեր:  {roleCustomNames[userData.role.name]}</p> : ""}
                    {userData && userData.course && userData.course.name && <p>Խումբ: {userData.course.name}</p>}
                    {/* {userData.course.name ?  : ""} */}
                    {/* {userData?.course.name && <p>Խումբ: {userData.course.name}</p>} */}
                    {/* {userData.avatar && <img src={`${SERVER_HOST_IP}/${userData.avatar}`} alt="Avatar" style={{width:150}}/>} Display the avatar if available
                    <p>{userData.username}</p>
                    <p>Էլ․հասցե: {userData.email}</p>
                    <p>Դեր: {userData.role.name}</p>
                    <p>Խումբ: {userData.course.name}</p> */}
                    {/* Display other user data as needed */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <PermissionWrapper userPermissions={['Student']}>
                <div className={styles.qrCodeContainer}>
                    <QRCodeGenerator />
                </div>
            </PermissionWrapper>
        </div>
    );
};

export default Dashboard;
