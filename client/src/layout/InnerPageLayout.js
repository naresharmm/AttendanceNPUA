import React from 'react';
import Sidebar from "../components/HeaderMenu/HeaderMenu";

const InnerPageLayout = ({ children }) => {
    return (
        <div className="container">
            <Sidebar />
            <div className="content">{children}</div>
        </div>
    );
};

export default InnerPageLayout;