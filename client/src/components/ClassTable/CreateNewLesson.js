import {Button, Form, Modal, Select} from "antd";
import { useCreateLessonMutation } from "../../features/classApi";
import {useEffect, useState} from "react";
import {SERVER_HOST_IP} from "../../constants/config";
import * as auth from "../../helpers/auth";

const labelTranslate = {
	group: 'Առարկա',
	teacher: 'Դասախոս',
	course: 'Կուրս',
	room: 'Սենյակ',
	classType: 'Տեսակ',
	timeSlot: 'Ժամ',
	dayOfWeek: 'Օր'
};

const CreateNewLesson = ({isOpen, onCancel, getLessons}) => {
	const [createLesson, {isLoading, error}] = useCreateLessonMutation();
	const [params, setParams] = useState(null);

	useEffect(() => {
		const token = auth.getToken();
		fetch(`${SERVER_HOST_IP}/class/params`, {headers: {Authorization: token}}).then(res => res.json()).then(val => {
			val.group.forEach(i => {
				i.label = i.label.split(' ').map( w =>  w.substring(0,1).toUpperCase()+ w.substring(1)).join(' ')
			})
 			setParams(val)
		})
	}, []);

	const onFinish = async(values) => {
		try {
			// console.log("VALUES:", values.course)
			await createLesson({
				...values,
				onEvenWeek: values.onWhichWeek === 2 || values.onWhichWeek === 0,
				onOddWeek: values.onWhichWeek === 1 || values.onWhichWeek === 0,
			});
			await window.location.reload();
			// await getLessons(values.course);
			// await getLessons();
			onCancel();
		} catch (error) {
			console.error('Login error:', error);
		}
	};

	return (
		<Modal title="Ստեղծել նոր դասաժամ" open={isOpen} onCancel={onCancel} footer={null}>

			{!!params && (
				<Form
					name="basic"
					labelCol={{
						span: 8,
					}}
					wrapperCol={{
						span: 16,
					}}
					style={{
						maxWidth: 600,
					}}
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}
					autoComplete="off"
				>

					{Object.keys(params).map(key => {
						return (
							<Form.Item key={key} name={key} label={labelTranslate[key]} rules={[{ required: true, message: 'Պարտադիտ դաշտ:' }]}>
								<Select
									// placeholder="Պարտադիտ դաշտ:"
									options={params[key]}
								>
								</Select>
							</Form.Item>
						)
					})}

					<Form.Item name={'onWhichWeek'} label={'Շաբաթ'} rules={[{ required: true, message: 'Պարտադիտ դաշտ:' }]}>
						<Select
							options={[
								{value: 0, label: 'Բոլոր'},
								{value: 1, label: 'I'},
								{value: 2, label: 'II'}
							]}
						>
						</Select>
					</Form.Item>

					<div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
						<Form.Item
							wrapperCol={{
								offset: 8,
								span: 16,
							}}
							style={{marginRight: 10}}
						>
							<Button type="primary" htmlType="submit">
								Ներկայացնել
							</Button>
						</Form.Item>

						<Form.Item
							wrapperCol={{
								offset: 8,
								span: 16,
							}}
							style={{marginLeft: 10}}
						>
							<Button type="default" onClick={onCancel}>
								Չեղարկել
							</Button>
						</Form.Item>
					</div>
				</Form>
			)}

			{isLoading && <p>Բեռնվում է...</p>}
			{error && <p>Սխալ: {console.log("Sxal: ", error.message)}</p>}
		</Modal>
	)
}

export default CreateNewLesson;