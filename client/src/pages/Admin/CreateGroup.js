import React, { useState } from 'react';
import axios from 'axios';
import { SERVER_HOST_IP } from "../../constants/config";
import {  message } from "antd";
import { Form, Input, Button, Select} from 'antd';

const CreateGroupp = () => {
    const [name, setName] = useState('');

    const onFinish = async (e) => {
        // console.log("NAMEEEEEEEEEEEE: ")
        // console.log(formData)
        // console.log('Before axios request');
        try {
            if (!name) {
                message.error('Խնդրում ենք Լռացրեք բոլոր դաշտերը');
                return;
            }
            const formData = new FormData();
            formData.append('name', name);
            axios.post(`${SERVER_HOST_IP}/admincreategroup`, formData, {
                headers: {
                    'Content-Type':'application/json'
                }
            }).then(function(response){
                if(response.data.retcode){
                    message.success('Խումբը հաջողությամբ ավելացվել է:');
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                }
                else{
                    message.warning('Խումբը Գոյություն ունի:');
                }
            });
            // const result = await response.data;
            // console.log('Result:', result);
            // console.log("Asdasdasd")
            // message.success('Խումբը հաջողությամբ ավելացվել է:');
            // Reload the page
            // setTimeout(() => {
            //     window.location.reload();
            // }, 1500);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div style={{maxWidth: 400, marginLeft: 50}}>
        <Form onFinish={onFinish}>
            <h1>Ստեղծել Նոր Խումբ</h1>
            <Form.Item label='Խմբի Համարը' > 
                <Input 
                    type='text' 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </Form.Item>
             <Form.Item>
                <Button type='primary' htmlType='submit'> Ավելացնել Նոր Խումբ</Button>
            </Form.Item>
        </Form>
        </div>
    );
};

export default CreateGroupp;