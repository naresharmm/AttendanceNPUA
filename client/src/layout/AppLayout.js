import React from 'react';
import { Layout } from 'antd';
const { Content } = Layout;

const AppLayout = ({Component, children }) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            {Component}
            <Layout>
                <Content>{children}</Content>
            </Layout>
        </Layout>
    );
};

export default AppLayout;
