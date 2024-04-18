// import {Button, message, Popconfirm, Spin, Table} from "antd";
import { Select, Button, message, Popconfirm, Spin, Table } from "antd";

import {useCallback, useEffect, useMemo, useState} from "react";
import CreateNewLesson from "./CreateNewLesson";
import {useGetLessonsMutation,useGetCoursesQuery} from "../../features/classApi";
import {SERVER_HOST_IP} from "../../constants/config";
import * as auth from "../../helpers/auth";
import {setLoading} from "../../slice/authSlice";
import PermissionWrapper from "../PermissionWrapper/PermissionWrapper";
import axios from 'axios';

const { Option } = Select;

const lessonTimes = [
    '9:30 - 10:50',
    '11:00 - 12:20',
    '12:50 - 14:10',
    '14:20 - 15:40'
]

const weekDays = [['Monday', 'Երկուշաբթի'], ['Tuesday', 'Երեքշաբթի'], ['Wednesday', 'Չորեքշաբթի'], ['Thursday', 'Հինգշաբթի'], ['Friday', 'Ուրբաթ']];

const columns = [
    {
        title: 'Դասաժամ',
        dataIndex: 'classTime',
        key: 'classTime',
    },
    ...weekDays.map(day => {
        return {
            title: day[1],
            dataIndex: day[1],
            key: day[0]
        }
    })
];
const ClassTable = () => {
    const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
    const [getLessons, {data, isLoading}] = useGetLessonsMutation();
    const [selectedCourse, setSelectedCourse] = useState('');
    const { data: coursesData, isLoading: coursesLoading } = useGetCoursesQuery();
    const [MyROLE, setMyROLE] = useState('');
    
    // console.log("coursesData: ", coursesData)
    
    const handleCourseChange = (value) => {
        // console.log(value)
        setSelectedCourse(value);
        // Call getLessons function with the selected course ID as argument
        getLessons(value);
    };

    const [dasacucakowner, setDasacucakowner] = useState('');
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = auth.getToken();
                const response = await axios.get(`${SERVER_HOST_IP}/user`, {
                    headers: {
                        Authorization: `${token}` // Include the JWT token in the authorization header
                    }
                });
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();

    }, []);
    useEffect(() => {
        // Check if userData is available and user is a student or teacher
        if (userData && (userData.role.name == 'Student')) {
            // Call getLessons only for students and teachers
            getLessons();
            // console.log(userData.course.name)
            setDasacucakowner(userData.course.name)
        }
        else if (userData &&  (userData.role.name == 'Teacher')) {
            // Call getLessons only for students and teachers
            getLessons();
            setDasacucakowner(userData.username)
        }
        if (userData && userData.role.name){
            setMyROLE(userData.role.name)
        }
    }, [userData]);


    // useEffect(() => {
    //     // Check if the user is not an admin
    //     if () {
    //         // If the user is not an admin, call getLessons without a value
    //         getLessons();
    //     }
    // }, [getLessons]);


    const handleRemove = useCallback((lessonScheduleId, groupId) => {
        setLoading(true)
        try {
            const token = auth.getToken();
            setTimeout(() => {
                fetch(
                    `${SERVER_HOST_IP}/class/delete`,
                    {
                        method: 'POST',
                        body: JSON.stringify({lessonScheduleId, groupId}),
                        headers: {'Content-Type': 'application/json', Authorization: token}
                    },
                ).then(() => {
                    message.success('Դասաժամը հաջողությամբ հեռացված է:');
                    // getLessons();
                    window.location.reload();
                })
            }, 1500)
        } catch (e) {
            message.error('Սխալմունք:');
        } finally {
            setLoading(false)
        }
    }, []);

    const renderTableItem = useCallback((i, index) => {
        const weekSeparator = i.onEvenWeek && i.onOddWeek ? '' : i.onOddWeek ? 'I' : 'II'
        // console.log(i)
        // console.log("myROLEE: ", MyROLE)
        if(MyROLE == 'Admin' || MyROLE == 'SuperAdmin'){
            return (
                <Popconfirm
                    title="Հեռացնել դասաժամը"
                    description="Արդյո՞ք ցանկանում եք հեռացնել դասաժամը:"
                    onConfirm={() => handleRemove(i.lessonScheduleId, i.groupId)}
                    okText="Այո"
                    cancelText="Ոչ"
                >
                    <p style={{cursor: 'pointer'}}>
                        <span style={{textTransform: 'capitalize'}}>{i.groupName + ' '}</span>
                        <span style={{color: "gray"}}>{i.classType + ' '}</span>
                        <span style={{color: 'red'}}>{i.teacher + ' '}</span>
                        <span style={{color: 'purple'}}>{i.room}</span>
                        {weekSeparator && (
                            <span style={{
                                fontWeight: 'bold',
                                fontSize: 12,
                                fontFamily: 'monospace'
                            }}
                            > - {weekSeparator}</span>
                        )}
                    </p>
                </Popconfirm>
            )
        }
        else if(MyROLE == 'Teacher'){
            return (
                <p style={{cursor: 'pointer'}}>
                    <span style={{textTransform: 'capitalize'}}>{i.groupName + ' '}</span>
                    <span style={{color: "red"}}>{i.classType.course.name + ' '}</span>
                    <span style={{color: "red"}}>{i.classType.name + ' '}</span>
                    {/* <span style={{color: 'red'}}>{i.teacher + ' '}</span> */}
                    <span style={{color: 'purple'}}>{i.room}</span>
                    {weekSeparator && (
                        <span style={{
                            fontWeight: 'bold',
                            fontSize: 12,
                            fontFamily: 'monospace'
                        }}
                        > - {weekSeparator}</span>
                    )}
                </p>
        )
        }

        else if (MyROLE == 'Student'){ 
            return (
                <p style={{cursor: 'pointer'}}>
                     <span style={{textTransform: 'capitalize'}}>{i.groupName + ' '}</span>
                        <span style={{color: "gray"}}>{i.classType + ' '}</span>
                        <span style={{color: 'red'}}>{i.teacher + ' '}</span>
                        <span style={{color: 'purple'}}>{i.room}</span>
                    {weekSeparator && (
                        <span style={{
                            fontWeight: 'bold',
                            fontSize: 12,
                            fontFamily: 'monospace'
                        }}
                        > - {weekSeparator}</span>
                    )}
                </p>
            )
        }
    }, [MyROLE]);

    const dataSource = useMemo(() => {
        if (!data) return [];

        const dataArr = lessonTimes.map(lessonTime => {
            const obj = {
                classTime: lessonTime
            }
            weekDays.map(weekDay => {
                obj[weekDay[1]] = data?.[weekDay[1]]?.[lessonTime]?.map(renderTableItem)
            })
            return obj
        })
        return dataArr
    }, [data]);
    // console.log("DataSource:", dataSource);
    return (
        <div style={{padding: '20px'}}>
            <div>
                <CreateNewLesson
                    isOpen={isLessonModalOpen}
                    onCancel={() => setIsLessonModalOpen(false)}
                    getLessons={getLessons}
                />

                {isLoading ? <Spin/> : (
                    <>
                        <h4 style={{ width: 100, marginLeft: 20, float: "left" }}>Դասացուցակ</h4>
                        <PermissionWrapper userPermissions={['Student','Teacher']}>
                            <h4 style={{ width: 400, marginLeft: 20, float: "left" }}>{dasacucakowner}</h4>
                        </PermissionWrapper>

                        <PermissionWrapper userPermissions={['SuperAdmin','Admin']}>
                            <Select
                                style={{ width: 200, marginLeft: 20 , float: "left", marginTop: 15}}
                                placeholder="Ընտրել դասը"
                                onChange={handleCourseChange}
                                loading={coursesLoading}
                                value={selectedCourse}
                                >
                                {coursesData?.map(course => (
                                    <Option key={course._id} value={course._id}>{course.name}</Option>
                                ))}
                            </Select>
                        </PermissionWrapper>
                        <PermissionWrapper userPermissions={['SuperAdmin','Admin']}>
                            <Button type="primary"style={{ width: 200, marginLeft: 20,marginTop: 15}}  onClick={() => setIsLessonModalOpen(true)}>
                                Ստեղծել նոր դասաժամ
                            </Button>
                        </PermissionWrapper>
                        <Table
                            dataSource={dataSource}
                            columns={columns}
                            pagination={false}
                        />
                    </>
                )}

            </div>
        </div>
    )
};

export default ClassTable;