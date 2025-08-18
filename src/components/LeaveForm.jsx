import { Button, Col, Drawer, Form, Row, Select, Space, DatePicker, Input } from 'antd'
const { RangePicker } = DatePicker;
import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import dayjs from 'dayjs';

const LeaveForm = ({ onClose, open }) => {
    const { user, setUserLeaves } = useContext(AuthContext)
    const [form] = Form.useForm()

    const handleSubmit = async (values) => {
        const leaveData = {
            ...values,
            startDate: dayjs(values.endDate).format('YYYY-MM-DD'),
            endDate: dayjs(values.endDate).format('YYYY-MM-DD'),
            status: 'pending',

        };
        console.log(leaveData);

        try {
            const res = await axios.post('/api/leaves', { leaveData, user })
            form.resetFields()
            setUserLeaves((prevLeaveData) => {
                return [
                    ...prevLeaveData, leaveData
                ]
            })
            // console.log(user.leaves);

            onClose()
        } catch (error) {

        }
    }

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };


    return (
        <div>
            <Drawer
                title='Request Leave'
                width={500}
                open={open}
                onClose={onClose}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={() => form.submit()} type='submit' variant='solid' color='default'>
                            Submit
                        </Button>
                    </Space>
                }
            >
                <Form
                    form={form}
                    layout="vertical"
                    name='newLeave'
                    onFinish={handleSubmit}
                    onFinishFailed={onFinishFailed}
                >
                    <Row gutter={16}>
                        <Col span={15}>
                            <Form.Item
                                name='leaveType'
                                label='Leave Type'
                                rules={[{ required: true, message: 'Please select leave type' }]}
                            >
                                <Select
                                    placeholder="Select Leave Type"
                                    optionFilterProp="label"
                                    options={[
                                        {
                                            value: 'Sick',
                                            label: 'Sick'
                                        },
                                        {
                                            value: 'Vacation',
                                            label: 'Vacation'
                                        }
                                    ]}
                                />
                            </Form.Item>
                            <Row>
                                <Col span={12}>
                                    <Form.Item
                                        name='startDate'
                                        label='Start Date'
                                        rules={[{ required: true, message: 'Select start date' }]}
                                    >
                                        <DatePicker
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name='endDate'
                                        label='End Date'
                                        rules={[{ required: true, message: 'Select end date' }]}
                                    >
                                        <DatePicker
                                            format="YYYY-MM-DD"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item
                                name='reason'
                                label='Reason'
                                rules={[{ required: true, message: 'Reason cant be empty' }]}
                            >
                                <Input
                                    placeholder='Reason for leave'
                                />
                            </Form.Item>
                        </Col>

                    </Row>

                </Form>
            </Drawer>
        </div>
    )
}

export default LeaveForm