import React, {useEffect, useState} from 'react';
import PermissionWrapper from "../PermissionWrapper/PermissionWrapper";
import { Layout, Menu } from 'antd'; // Import Layout and Menu from antd
import { DashboardOutlined, HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import {Link, useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../../slice/authSlice";

const { Header, Sider } = Layout; // Destructure Header and Sider from Layout

const MenuComponent = ({ isHeader }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [selectedKeys, setSelectedKeys] = useState([]);

    const handleLogout = () => {
        dispatch(logout());
    };

    useEffect(() => {
        const currentPath = location.pathname;
        const menuItem = getMenuKey(currentPath);
        if (menuItem) {
            setSelectedKeys([menuItem]);
        }
    }, [location.pathname]);

    const getMenuKey = (path) => {
        switch (path) {
            case '/class/create':
                return '1';
            case '/dashboard':
                return '2';
            case '/score':
                return '3';
            case '/attendance':
                return '4';
            case '/contact':
                return '5';
            case '/admin':
                return '6';
            case '/changemypassword':
                return '7';
            default:
                return null;
        }
    };

    const main = (
             <Menu  theme={"dark"} mode={isHeader ? "horizontal" : "inline"} selectedKeys={selectedKeys}>
                <PermissionWrapper userPermissions={['SuperAdmin','Admin', 'Student','Teacher']}>
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                        <Link to="/class/create">Դասացուցակ</Link>
                    </Menu.Item>
                </PermissionWrapper>
                <PermissionWrapper userPermissions={['SuperAdmin','Admin', 'Student','Teacher']}>
                    <Menu.Item key="2" icon={<DashboardOutlined />}>
                        <Link to="/dashboard">Հիմնական</Link>
                    </Menu.Item>
                </PermissionWrapper>
                <PermissionWrapper userPermissions={['SuperAdmin','Admin']}>
                    <Menu.Item key="3" icon={<DashboardOutlined />}>
                        <Link to="/messages">Հաղորդագրություն</Link>
                    </Menu.Item>
                </PermissionWrapper>
                <PermissionWrapper userPermissions={['SuperAdmin','Admin', 'Student','Teacher']}>
                    <Menu.Item key="4" icon={<DashboardOutlined />}>
                        <Link to="/attendance">Ներկայություն</Link>
                    </Menu.Item>
                </PermissionWrapper>
                <PermissionWrapper userPermissions={['Student','Teacher']}>
                    <Menu.Item key="5" icon={<DashboardOutlined />}>
                        <Link to="/contact">Հետադարձ Կապ</Link>
                    </Menu.Item>
                </PermissionWrapper>
                <PermissionWrapper userPermissions={['Admin','SuperAdmin']}>
                    <Menu.Item key="6" icon={<DashboardOutlined />}>
                        <Link to="/admin">Ադմինիստրացիա</Link>
                    </Menu.Item>
                </PermissionWrapper>
                <PermissionWrapper userPermissions={['SuperAdmin','Admin', 'Student','Teacher']}>
                    <Menu.Item key="7" icon={<DashboardOutlined />}>
                        <Link to="/changemypassword">Գաղտնաբառ</Link>
                    </Menu.Item>
                </PermissionWrapper>
                 <PermissionWrapper userPermissions={['SuperAdmin','Admin', 'Student','Teacher']}>
                    <Menu.Item key="8" icon={<LogoutOutlined />} onClick={handleLogout} >
                        Դուրս գալ
                    </Menu.Item>
                 </PermissionWrapper>
            </Menu>
     );

     return (
        isHeader ? (
            <Header style={{ position: 'relative', zIndex: 1, width: '100%' }}>
                {main}
            </Header>
        ) : (
            <Sider style={{ display: 'flex', alignItems: 'center' , justifyContent: 'center'}}>
                {main}
            </Sider>
        )
    );
};

export default MenuComponent;
