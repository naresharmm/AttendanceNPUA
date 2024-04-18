import React, { useState } from 'react';
import axios from 'axios';
import { SERVER_HOST_IP } from "../../constants/config";
import {  message } from "antd";
import { Form, Input, Button, Select} from 'antd';
import { useEffect } from 'react';
import * as auth from "../../helpers/auth";

const CreateUserr = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [course, setCourse] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [showCourseInput, setShowCourseInput] = useState(false);
    const [roleOptions, setRoleOptions] = useState([]);
    const [courseOptions, setCourseOptions] = useState([]);
    const [fileName, setFileName] = useState('');
    const [userData, setUserData] = useState(null);


    const roleCustomNames = {
        Student: 'Ուսանող',
        Teacher: 'Դասախոս',
        Admin: 'Դեկանատ',
        SuperAdmin: 'Դեկան'
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



    const handleFileChange = (e) => {
        setAvatar(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const onFinish = async (e) => {
        // e.preventDefault();
       
        try {
            if (!username || !email || !password || !role || !avatar) {
                message.error('Խնդրում ենք Լռացրեք բոլոր դաշտերը');
                return;
            }
            if (role && role == 'Student' && !course){
                message.error('Խնդրում ենք Լռացրեք բոլոր դաշտերը');
                return;
            }
            const formData = new FormData();
            formData.append('username', username);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('role', role);
            formData.append('course', course);
            formData.append('avatar', avatar);
            // console.log(formData)
            axios.post(`${SERVER_HOST_IP}/admincreateuser`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(function(response){
                if(response.data.retcode){
                    message.success('Օգտատերը հաջողությամբ ավելացվել է:');
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                }
                else{
                    message.warning('Օգտատերը Գոյություն ունի:');
                }
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };




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

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const token = auth.getToken();
                const response = await fetch(`${SERVER_HOST_IP}/role`, {
                    headers: { Authorization: token }
                });
                const rolesData = await response.json();
                let rolesToShow;
                if (userData && userData.role && userData.role.name == 'SuperAdmin'){
                    rolesToShow = rolesData.filter(role => role.name === 'Student' || role.name === 'Teacher' || role.name === 'Admin');
                }
                else{
                    rolesToShow = rolesData.filter(role => role.name === 'Student' || role.name === 'Teacher');
                }
                setRoleOptions(rolesToShow);
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };
    
        fetchRoles();
    }, [userData]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const token = auth.getToken();
                const response = await fetch(`${SERVER_HOST_IP}/course`, {
                    headers: { Authorization: token }
                });
                const coursesData = await response.json();
                setCourseOptions(coursesData);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
    
        fetchCourses();
    }, []);



   





    const handleRoleSelect = (value) => {
            setRole(value);
            setShowCourseInput(true);
    };


    return (
        <div style={{maxWidth: 400, marginLeft: 50}}>
        <Form onFinish={onFinish}>
            <h1>Ստեղծել Նոր Օգտատեր</h1>
            <Form.Item label='ԱԱՀ'> 
                <Input 
                    type='text' 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />
            </Form.Item>
            <Form.Item label='Էլ․հասցե'>
                <Input 
                    type='email' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
            </Form.Item>
            <Form.Item label='Գաղտնաբառ'>
                <Input 
                    type='password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
            </Form.Item>
            <Form.Item label='Դեր'>
                <Select 
                    value={role} 
                    onChange={handleRoleSelect} 
                    style={{ width: '100%' }}
                >
                    {roleOptions.map((role) => (
                        <Select.Option key={role.name} value={role.name}>
                            {roleCustomNames[role.name]}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            {showCourseInput && role === 'Student' && (
                <Form.Item label='Խումբ'>
                    <Select 
                        value={course} 
                        onChange={(value) => setCourse(value)} 
                        style={{ width: '100%' }}
                    >
                        {courseOptions.map((course) => (
                            <Select.Option key={course.name} value={course.name}>
                                {course.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            )}
            <Form.Item label='Նկար'>
                <div style={customFileStyle}>
                        <input type='file'  accept="image/*"  style={customFileInputStyle} id='customFile' onChange={handleFileChange} />
                        <label style={customFileLabelStyle} htmlFor='customFile'>
                            {fileName ? fileName :'Ընտրեք ֆայլ'  }
                        </label>
                </div>
            </Form.Item>
             <Form.Item>
                <Button type='primary' htmlType='submit'> Ստեղծել </Button>
            </Form.Item>
        </Form>
        </div>
    );
};

export default CreateUserr;



// import React from 'react';
// import styles from './Admin.module.css';
// import PermissionWrapper from "../../components/PermissionWrapper/PermissionWrapper";
// import * as auth from "../../helpers/auth";
// import { SERVER_HOST_IP } from "../../constants/config";
// import {Link, useLocation} from "react-router-dom";

// ///
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// const CreateUserr = () => {
//     const [userData, setUserData] = useState(null);
//     const [avatar, setAvatar] = useState(null);


//     const handleFileChange = (e) => {
//         setAvatar(e.target.files[0]);
//     };

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const token = auth.getToken();
//                 const response = await axios.get(`${SERVER_HOST_IP}/user`, {
//                     headers: {
//                         Authorization: `${token}` // Include the JWT token in the authorization header
//                     }
//                 });
//                 // const response = await axios.get('/user');
//                 // console.log(response)
//                 setUserData(response.data);
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//             }
//         };

//         fetchUserData();
//     }, []);
    
//     const [username,setUsername] = useState('');
//     const [email,setEmail] = useState('');
//     const [password,setPassword] = useState('');
//     const [role,setRole] = useState(''); 
//     const [course,setCourse] = useState(''); 

//     if (userData && userData.role && (userData.role.name == 'Admin' || userData.role.name == 'SuperAdmin')) {
//         const collectData = async (e) => {
//             e.preventDefault();
//             try{ 
//                 const response = await fetch(`${SERVER_HOST_IP}/admincreateuser`, {
//                 method: 'post',
//                 body: JSON.stringify({username, email, password, role, course}),
//                 headers:{
//                     // Authorization: `${token}`,
//                     'Content-Type':'application/json'
//                 },
//             });
//                 const result = await response.json;
//                 // console.log('asd',result);
//             }catch(error){
//                 console.log(error);
//             }
//                 // localStorage.setItem("user", JSON.stringify(result));
//         }
//         return (
//             userData ? ( 
//                 <div className={styles.dashboardContainer}>
//                     <div className={styles.uploadFormContainer}>
//                         <h1>User Data</h1>
//                         <p>Username: {userData.username}</p>
//                         <p>Email: {userData.email}</p>
//                         <p>Role: {userData.role.name}</p>
//                         {/* Display other user data as needed */}
//                     </div>
//                     <form onSubmit={collectData}>
//                         <div>
//                             <h2>SignUP Form</h2>
//                             <div>
//                                 <label>Անուն/Ազգանուն/Հայրանուն</label>
//                                 <input type='text' 
//                                 value={username}
//                                 onChange={(e) => setUsername(e.target.value)}
//                                 />
//                             </div>
//                             <div>
//                                 <label>Էլ․հասցե</label>
//                                 <input type='email' 
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 />
//                             </div>
//                             <div>
//                                 <label>Գաղտնաբառ</label>
//                                 <input type='password' 
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 />
//                             </div>
//                             <div>
//                                 <label>Դեր</label>
//                                 <input type='text' 
//                                 value={role}
//                                 onChange={(e) => setRole(e.target.value)}
//                                 />
//                             </div>
//                             <div>
//                                 <label>Խումբ</label>
//                                 <input type='text' 
//                                 value={course}
//                                 onChange={(e) => setCourse(e.target.value)}
//                                 />
//                             </div>
//                             <div>
//                                 <label>Ավատար</label>
//                                 <input 
//                                     type="file" 
//                                     accept="image/*"
//                                     onChange={handleFileChange}
//                                 />
//                             </div>
//                             <button type='submit'> Submit </button>
//                         </div>
//                     </form>
//                 </div>
//             ) : (
//                 <p>Loading...</p>
//             )

//         );
//     }
//     else{
//         return (
//              <h1>PERMISSION DENIED</h1>
             
             
//         );
//     }
    
// };

// export default CreateUserr;

