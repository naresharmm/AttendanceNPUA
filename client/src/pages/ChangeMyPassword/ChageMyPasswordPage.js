import React from 'react';
import PermissionWrapper from "../../components/PermissionWrapper/PermissionWrapper";
import * as auth from "../../helpers/auth";
import { SERVER_HOST_IP } from "../../constants/config";
import {Link, useLocation} from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import {  message } from "antd";
import { Form, Input, Button, Select} from 'antd';




const ChangeMyPassword = () => {

    const [currentpassword, setCurrentPassword] = useState(null);
    const [newpassword, setNewPassword] = useState(null);
    const [confirmnewpassword, setConfirmNewPassword] = useState(null);
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
                // console.log("res: ", response.data)
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    function validatePassword(password) {
        if (password.length < 12) {
            return false; // Password too short
        }
    
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const numberRegex = /[0-9]/;
        const symbolRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    
        if (
            !uppercaseRegex.test(password) ||
            !lowercaseRegex.test(password) ||
            !numberRegex.test(password) ||
            !symbolRegex.test(password)
        ) {
            return false; 
        }
    
        return true;
    }

    const onFinish = async (e) => {
        try {
            if (!currentpassword || !newpassword || !confirmnewpassword) {
                message.error('Խնդրում ենք Լռացրեք բոլոր դաշտերը');
                return;
            }

            if (!validatePassword(newpassword)) {
                message.error('Գաղտնաբառերը չեն համապատասխանում անվտանգության ստանդարտներին');
            }


            if (newpassword != confirmnewpassword) {
                message.error('Գաղտնաբառերը չեն համընկնում');
                return;
            }



            const formData = new FormData();
            formData.append('currentpassword', currentpassword);
            formData.append('newpassword', newpassword);
            formData.append('confirmnewpassword', confirmnewpassword);
            const token = auth.getToken();
            axios.post(`${SERVER_HOST_IP}/changemypassword`, formData, {
                headers: {
                    'Content-Type':'application/json',
                    Authorization: token
                }
            }).then(function(response){
                if(response.data.retcode){
                    message.success('Գաղտնաբառը հաջողությամբ փոփոխվել է:');
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                }
                else{
                    message.error('Գաղտնաբառը Սխալ է');
                }
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };





    return (
        <div style={{maxWidth: 400, marginLeft: 50}}>
        <Form onFinish={onFinish}>
            <h1>ՓոխելԳաղտնաբառը</h1>
            <Form.Item label='Ներկայիս Գաղտնաբառը'> 
                <Input 
                    type='password' 
                    value={currentpassword} 
                    onChange={(e) => setCurrentPassword(e.target.value)} 
                />
            </Form.Item>
            <Form.Item label='Նոր Գաղտնաբառը'>
                <Input 
                    type='password' 
                    value={newpassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                />
            </Form.Item>
            <Form.Item label='Հաստատեք Գաղտնաբառը'>
                <Input 
                    type='password' 
                    value={confirmnewpassword} 
                    onChange={(e) => setConfirmNewPassword(e.target.value)} 
                />
            </Form.Item>
             <Form.Item>
                <Button type='primary' htmlType='submit'> ՓոխելԳաղտնաբառը</Button>
            </Form.Item>
        </Form>
        </div>
    );
};

export default ChangeMyPassword;