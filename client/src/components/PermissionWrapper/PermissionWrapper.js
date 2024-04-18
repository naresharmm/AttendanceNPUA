import React from 'react';
import {getRoles} from "../../helpers/auth";


const PermissionWrapper = ({userPermissions, children}, ) => {
     const roles = getRoles();

     const isAuthorized = roles.every(permission => userPermissions.includes(permission));
     return isAuthorized ? <>{children}</> : null;

};


export default PermissionWrapper;



