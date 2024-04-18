import React, { useState } from 'react';
import axios from 'axios';
import { SERVER_HOST_IP } from "../../constants/config";
import {  message } from "antd";
import { Form, Input, Button, Select, Popconfirm} from 'antd';
import { useEffect } from 'react';
import * as auth from "../../helpers/auth";

const CreateUserr = () => {

    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [students, setStudents] = useState([]);
	const [selectedStudent, setSelectedStudent] = useState(null);


    const onFinish = async (e) => {
        try {
            if (!selectedStudent) {
                message.error('Խնդրում ենք Ընտրել Ուսանողին');
                return;
            }
            const formData = new FormData();
            formData.append('selectedStudent', selectedStudent);
            console.log("selectedStudent: ", selectedStudent)
            const token = auth.getToken();
            axios.post(`${SERVER_HOST_IP}/deletestudent`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token 
                }
            }).then(function(response){
                if(response.data.retcode){
                    message.success('Ուսանողը հաջողությամբ Հեռացվել է:');
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                }
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
		const token = auth.getToken();
		fetch(`${SERVER_HOST_IP}/students`, {headers: {Authorization: token}}).then(res => res.json()).then(val => {
			setStudents(val)
		})
	}, []);

    useEffect(() => {
        const token = auth.getToken();
        fetch(`${SERVER_HOST_IP}/course`, { headers: { Authorization: token } })
            .then(res => res.json())
            .then(coursesData => setCourses(coursesData));
    }, []);

    const handleCourseSelect = (courseId) => {
        setSelectedCourse(courseId);
    };

	const handleStudentSelect = (studentId) => {
        setSelectedStudent(studentId);
    };

    const courseOptions = courses.map(course => ({ value: course._id, label: course.name }));

    const studentOptions = students
			.filter(student => student.course === selectedCourse)
			.map(student => ({ value: student.id, label: student.username }));

    return (
        <div style={{maxWidth: 400, marginLeft: 50}}>
            <h1> Հեռացնել ՈՒսանողի</h1>
            <Form onFinish={onFinish}>
                <Form.Item
                    key={'course'}
                    name={'course'}
                    label={'Խումբ'}
                    style={{minWidth: 150, marginTop: 20, display: 'block'}}
                >
                    <Select
                        options={courseOptions}
                        onSelect={handleCourseSelect}
                    />
                </Form.Item>

                <Form.Item
                    key={'student'}
                    name={'student'}
                    label={'Ուսանող'}
                    style={{minWidth: 400, display: 'block', marginTop:20}}
                >
                    <Select
                        options={studentOptions}
                        onSelect={handleStudentSelect}
                    />
                </Form.Item>
                <Form.Item
                        style={{maxWidth: 100, marginBottom: 0}}>
                <Popconfirm
                    title='Հեռացնենք ՈՒսանողին?'
                    onConfirm={onFinish}
                    cancelText='Ոչ'
                    okText='Այո'
                    >
                    <Button type='primary'>
                        Հեռացնել
                    </Button>
                </Popconfirm>
                    {/* <Button type='primary' htmlType='submit'> Հեռացնել </Button> */}
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateUserr;