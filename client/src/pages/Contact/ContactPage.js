import React from 'react';
import QRCodeGenerator from "../../components/QRCodeGenerator/QRCodeGenerator";
import ClassTable from "../../components/ClassTable/ClassTable";
import PermissionWrapper from "../../components/PermissionWrapper/PermissionWrapper";
import UploadForm from "../../components/FileUpload/FileUpload";
import AttendanceTable from "../../components/AttendanceTable";
import styles from '../Dashboard.module.css'
import Messages from "../Messages/Messages";

const Dashboard = () => {
    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.uploadFormContainer}>
                <PermissionWrapper userPermissions={['SuperAdmin','Admin','Teacher', 'Student']}>
                    <UploadForm />
                </PermissionWrapper>
            </div>
        </div>
    );
};

export default Dashboard;
