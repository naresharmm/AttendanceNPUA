import {Button, DatePicker, Form, message, Modal, Select} from "antd";
import React, {useEffect, useMemo, useState} from "react";
import {SERVER_HOST_IP} from "../../constants/config";
import * as auth from "../../helpers/auth";
import moment from "moment";
import {attendanceStatus, attendanceStatusTranslate} from "../../constants/utils";
import {getRoles} from "../../helpers/auth";
import UserRoles from "../../constants/userRoles";


const StatusChangeModal = ({isOpen, onCancel, onSuccess, students, dataList, selectedStudent}) => {
	const [selectedDate, setSelectedDate] = useState('');
	const [selectedLessonId, setSelectedLessonId] = useState('');
	const [selectedStatus, setSelectedStatus] = useState('');
	const roles = getRoles();
	const isAdminRole  = useMemo(() => roles.includes(UserRoles.admin), []);

	const studentAttendanceSelectOptions = useMemo(() => {
		if (selectedDate) {
			const student = students.find(s => s.id === selectedStudent);
			const filteredAttendanceList = student?.attendanceList?.filter(i => i.date === selectedDate);

			filteredAttendanceList.forEach((i, index) => {
				dataList.groups.forEach(group => {
					const item = group.lessonSchedule.find(l => l._id === i.lessonId);
					if (item) {
						filteredAttendanceList[index].groupName = group.shortName;
						filteredAttendanceList[index].classType = item.classType.name;
					}
				})
			})

			return filteredAttendanceList.map(a => {
				return {value: a['_id'], label: `${a.groupName} - ${a.classType} - ${a.timeSlot} - ${attendanceStatusTranslate[a.status] || 'Բացակա'}` }
			})
		}

		return []
	}, [selectedDate, students]);
	const onFinish = () => {
		try {
			const obj = {selectedStatus, selectedLessonId, selectedDate, selectedStudentId: selectedStudent}
			const token = auth.getToken();

			fetch(`${SERVER_HOST_IP}/students`, {
				method: 'POST',
				body: JSON.stringify(obj),
				headers: {'Content-Type': 'application/json', Authorization: token}
			},).then(() => {
				message.success('Դասաժամը հաջողությամբ թարմացված է:');
				onSuccess(); //Fetch new data
				onCancel(); //Close Modal
			}).catch(() => {
				message.error('Սխալմունք')
			})

		} catch (error) {
			console.error('Login error:', error);
		}
	};

	// const studentOptions = useMemo(() => {
	// 	return students.map(s => {
	// 		return {value: s.id, label: s.username, key: s.id}
	// 	})
	// }, [students])

	return (<Modal title="Փոխել կարգավիճակը" open={isOpen} onCancel={onCancel} footer={null} destroyOnClose={true}>
			{/*<Form.Item key={'student'} name={'student'} label={'Ուսանող'}*/}
			{/*           rules={[{required: true, message: 'Պարտադիտ դաշտ:'}]}>*/}
			{/*	<Select*/}
			{/*		options={studentOptions}*/}
			{/*		onSelect={(e) => {*/}
			{/*			setSelectedStudentId(e)*/}
			{/*			setSelectedStatus('')*/}
			{/*			setSelectedLessonId('')*/}
			{/*		}}*/}
			{/*		onClear={() => {*/}
			{/*			setSelectedDate('')*/}
			{/*		}}*/}
			{/*	>*/}
			{/*	</Select>*/}
			{/*</Form.Item>*/}

			<Form.Item key={'date'} name={'date'} label={'Ժամանակ'}
			           rules={[{required: true, message: 'Պարտադիտ դաշտ:'}]}>
				<DatePicker onChange={(date, dateString) => {
					setSelectedDate(moment(dateString, 'YYYY-MM-DD').format('DD-MM-YYYY'))
					setSelectedStatus('')
					setSelectedLessonId('')
				}}/>
			</Form.Item>
			{/* {console.log(attendanceStatus)} */}
			{!!studentAttendanceSelectOptions.length && (<>
					<Form.Item key={'studentAttendance'} name={'studentAttendance'} label={'Դասաժամ'}
					           rules={[{required: true, message: 'Պարտադիտ դաշտ:'}]}>
						<Select
							options={studentAttendanceSelectOptions}
							onSelect={(e) => setSelectedLessonId(e)}
						>
						</Select>
					</Form.Item>

					<Form.Item key={'status'} name={'status'} label={'Կարգավիճակ'}
					           rules={[{required: true, message: 'Պարտադիտ դաշտ:'}]}>
						<Select
							options={Object.keys(attendanceStatus)
								.filter(key => {
									if (isAdminRole) {
										return attendanceStatus[key] !== 'Late';
									}else {
										return true; // Show all options for other roles
									}
								})
								.map(key => {
									// console.log(key)
									return {
										value: attendanceStatus[key],
										label: attendanceStatusTranslate[attendanceStatus[key]]
									};
								})}
							onSelect={e => setSelectedStatus(e)}
						>
						</Select>
					</Form.Item>
				</>)}

			<div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
				<Form.Item
					key={'submit'}
					wrapperCol={{
						offset: 8, span: 16,
					}}
					style={{marginRight: 10}}
				>
					<Button
						type="primary"
						htmlType="submit"
						disabled={!selectedDate || !selectedLessonId || !selectedStatus}
						onClick={onFinish}
					>
						Ներկայացնել
					</Button>
				</Form.Item>

				<Form.Item
					key={'cancel'}
					wrapperCol={{
						offset: 8, span: 16,
					}}
					style={{marginLeft: 10}}
				>
					<Button type="default" onClick={onCancel}>
						Չեղարկել
					</Button>
				</Form.Item>
			</div>
		</Modal>)
}

export default StatusChangeModal;