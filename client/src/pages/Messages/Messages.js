import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SERVER_HOST_IP } from "../../constants/config";
import * as auth from "../../helpers/auth";
import { Table, Spin, Alert } from 'antd';

const Messages = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({ pageSize: 20, current: 1, total: 0 });

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const token = auth.getToken(); // Get the JWT token from your authentication helper
                const response = await axios.get(`${SERVER_HOST_IP}/messages?page=${pagination.current}&limit=${pagination.pageSize}`, {
                    headers: {
                        Authorization: `${token}` // Include the JWT token in the authorization header
                    }
                });
                setFiles(response.data.files);
                setPagination(prevPagination => ({
                    ...prevPagination,
                    total: response.data.pagination.totalFiles
                }));
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchFiles();
    }, [pagination]);

    const handleTableChange = (pagination) => {
        setPagination(pagination);
    };

    const columns = [
        {
            title: 'Ուսանող',
            dataIndex: ['user', 'username'],
            key: 'username',
            render: (username, record) => `${username} (${record.user.email})`
        },
        {
            title: 'Հաղորդագրություն',
            dataIndex: ['file', 'textData'],
            key: 'textData',
        },
        {
            title: 'Ամսաթիվ',
            dataIndex: ['file', 'createdAt'],
            key: 'createdAt',
            render: date => new Date(date).toLocaleString()
        },

        {
            title: 'Ֆայլի հղում',
            dataIndex: ['file', 'fileUrlDirectory'],
            key: 'fileUrlDirectory',
            render: url => <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
        },
    ];

    if (loading) {
        return <Spin />;
    }

    if (error) {
        return <Alert message={`Հաղորդագրություններ առկա չեն`} type="error" />;
    }

    return (
        <Table
            columns={columns}
            dataSource={files}
            pagination={pagination}
            onChange={handleTableChange}
        />
    );
};

export default Messages;
