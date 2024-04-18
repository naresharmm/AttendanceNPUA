import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFile } from "../../slice/uploadSlice";
import { Form, Input, Button, Card, message as messageAntd } from 'antd';
import * as auth from "../../helpers/auth";

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [message, setMessage] = useState('');
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { uploading, error } = useSelector((state) => state.upload);

    const onChange = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const onMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const customFileStyle = {
        position: 'relative',
        overflow: 'hidden',
        display: 'inline-block',
    };

    const customFileInputStyle = {
        position: 'absolute',
        top: 0,
        right: 0,
        margin: 0,
        padding: 0,
        fontSize: '20px',
        cursor: 'pointer',
        opacity: 0,
    };

    const customFileLabelStyle = {
        display: 'inline-block',
        padding: '5px 10px',
        fontSize: '14px',
        cursor: 'pointer',
        border: '2px solid rgb(208 218 227 / 71%)',
        borderRadius: '5px',
        backgroundColor: '#fff',
     };

    const onFinish = async () => {
        if (!file || !message) {
            messageAntd.error('Խնդրում ենք ընտրել ֆայլ և մուտքագրել հաղորդագրություն');
            return;
        }
        const token = auth.getToken();
        await dispatch(uploadFile(file, message, token));
        if (!error) {
            messageAntd.success('Ֆայլը հաջողությամբ վերբեռնվեց');

            setMessage('');
            setFile(null);
            setFileName('');
            form.resetFields();
        }
    };

    return (
        <Card style={{
            width: '400px',
            margin: '0 auto',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            marginTop: '50px',
        }}>
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item name="message" rules={[{ required: true, message: 'Խնդրում ենք մուտքագրել ձեր հաղորդագրություն' }]}>
                    <Input.TextArea value={message} onChange={onMessageChange} rows={4} placeholder="Ձեր նամակը"  />
                </Form.Item>
                <Form.Item>
                    <div style={customFileStyle}>
                        <input type='file' style={customFileInputStyle} id='customFile' onChange={onChange} />
                        <label style={customFileLabelStyle} htmlFor='customFile'>
                            {fileName ? fileName :'Ընտրեք ֆայլ'  }
                        </label>
                    </div>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={uploading}>Վերբեռնել</Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default UploadForm;
