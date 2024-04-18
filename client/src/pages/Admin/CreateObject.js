import React, { useState } from 'react';
import axios from 'axios';
import { SERVER_HOST_IP } from "../../constants/config";
import {  message } from "antd";
import { Form, Input, Button, Select} from 'antd';

const CreateObjectt = () => {
    const [name, setname] = useState('');
    const [shortName, setshortName] = useState('');

    const onFinish = async (e) => {
        try {
            if (!name || !shortName) {
                message.error('Խնդրում ենք Լռացրեք բոլոր դաշտերը');
                return;
            }
            const formData = new FormData();
            formData.append('name', name);
            formData.append('shortName', shortName);
            axios.post(`${SERVER_HOST_IP}/admincreateobject`, formData, {
                headers: {
                    'Content-Type':'application/json'
                }
            }).then(function(response){
                if(response.data.retcode){
                    message.success('Առարկան հաջողությամբ ավելացվել է:');
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                }
                else{
                    message.warning('Առարկան Գոյություն ունի:');
                }
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div style={{maxWidth: 400, marginLeft: 50}}>
        <Form onFinish={onFinish}>
            <h1>Ստեղծել Նոր Առարկա</h1>
            <Form.Item label='Առարկայի Անվանում' > 
                <Input 
                    type='text' 
                    value={name}
                        onChange={(e) => setname(e.target.value)}
                />
            </Form.Item>
            <Form.Item label='Առարկայի Հապավում'>
                <Input 
                    type='text' 
                    value={shortName}
                        onChange={(e) => setshortName(e.target.value)}
                />
            </Form.Item>
             <Form.Item>
                <Button type='primary' htmlType='submit'> Ավելացնել Առարկա</Button>
            </Form.Item>
        </Form>
        </div>
    );
};

export default CreateObjectt;