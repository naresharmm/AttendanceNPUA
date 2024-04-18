import React from 'react';
import styles from './Admin.module.css';
import PermissionWrapper from "../../components/PermissionWrapper/PermissionWrapper";
import * as auth from "../../helpers/auth";
import { SERVER_HOST_IP } from "../../constants/config";
import {Link, useLocation} from "react-router-dom";

///
import { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
    
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
    
    if (userData && userData.role && (userData.role.name == 'Admin' || userData.role.name == 'SuperAdmin')) {
        return (
            userData ? ( 
                <div className={styles.dashboardContainer}>
                    <Link
                        to="/admin/createuser"
                        style={{
                            display: 'block',
                            padding: '10px 20px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            borderRadius: '5px',
                            textDecoration: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            transition: 'background-color 0.3s ease',
                            margin: '20px',
                            width:'200px',
                        }}
                    >
                        Ստեղծել Նոր Օգտատեր
                    </Link>
                    <Link
                        to="/admin/creategroup"
                        style={{
                            display: 'block',
                            padding: '10px 20px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            borderRadius: '5px',
                            textDecoration: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            transition: 'background-color 0.3s ease',
                            margin: '20px',
                            width:'200px',
                        }}
                    >
                        Ստեղծել նոր Խումբ
                    </Link>
                    <Link
                        to="/admin/createobject"
                        style={{
                            display: 'block',
                            padding: '10px 20px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            borderRadius: '5px',
                            textDecoration: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            transition: 'background-color 0.3s ease',
                            margin: '20px',

                            width:'200px',
                        }}
                    >
                        Ստեղծել նոր Առարկա
                    </Link> 
                    <Link
                        to="/admin/deletestudent"
                        style={{
                            display: 'block',
                            padding: '10px 20px',
                            backgroundColor: '#DC143C',
                            color: 'white',
                            borderRadius: '5px',
                            textDecoration: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            transition: 'background-color 0.3s ease',
                            margin: '20px',

                            width:'200px',
                        }}
                    >
                        Հեռացնել ՈՒսանողի
                    </Link>                           
                </div>
            ) : (
                <p>Loading...</p>
            )

        );
    }
    else{
        return (
             <h1>PERMISSION DENIED</h1>
        );
    }
    
};

export default Admin;

