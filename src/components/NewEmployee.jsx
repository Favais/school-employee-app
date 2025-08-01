import { App, Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd'
import axios from 'axios';
import React, { useState } from 'react'

const NewEmployee = ({ onClose, open }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)

    const { message } = App.useApp()


    const handleSubmit = async (values) => {
        try {
            setLoading(true)
            const res = await axios.post('/api/employees', values)
            if (res.data.success === true) {
                message.success(res.data.message)
                form.resetFields()
                onClose()
            }
        } catch (error) {
            message.error('Failed to register new employeez')
        } finally {
            setLoading(false)
            console.log();

        }
    }
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const onDateChange = (date, dateString) => {
    };
    return (
        <div>
            <Drawer
                title='Add New Employee'
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
                    name='newEmployee'
                    onFinish={handleSubmit}
                    onFinishFailed={onFinishFailed}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="firstName"
                                label="First Name"
                                rules={[{ required: true, message: 'Please enter first name' }]}
                            >
                                <Input placeholder="Please enter first name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="lastName"
                                label="Last Name"
                                rules={[{ required: true, message: 'Please enter last name' }]}
                            >
                                <Input placeholder="Please enter last name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="gender"
                                label="Gender"
                                rules={[{ required: true, message: 'Please select gender' }]}
                            >
                                <Select
                                    placeholder="Select a Gender"
                                    optionFilterProp="label"
                                    options={[
                                        {
                                            value: 'male',
                                            label: 'Male',
                                        },
                                        {
                                            value: 'female',
                                            label: 'Female',
                                        },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="employmentType"
                                label="Type of employment"
                                rules={[{ required: true, message: 'Please select type of employment' }]}
                            >
                                <Select
                                    placeholder="Type of employment"
                                    optionFilterProp="label"
                                    options={[
                                        {
                                            value: 'Full-time',
                                            label: 'Full-time',
                                        },
                                        {
                                            value: 'Part-time',
                                            label: 'Part-time',
                                        },
                                        {
                                            value: 'Contract',
                                            label: 'Contract',
                                        },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="department"
                                label="Department"
                                rules={[{ required: true, message: 'Enter employee department' }]}
                            >
                                <Input placeholder="Department" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    { required: true, message: 'Enter employee email' },
                                    { type: 'email', message: 'Please enter a valid email' }
                                ]}
                            >
                                <Input placeholder="Email" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="phone"
                                label="Phone No"
                                rules={[{ required: true, message: 'Enter employee Phone No' }]}
                            >
                                <Input type='tel' placeholder="Phone No" />
                            </Form.Item>
                        </Col>
                        <Col span={10}>
                            <Form.Item
                                name="hireDate"
                                label="Date of Employment"
                                rules={[{ required: true, message: 'Pick a date' }]}
                            >
                                <DatePicker
                                    onChange={onDateChange}
                                    format="YYYY-MM-DD"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    {/* Add more form fields as needed */}
                </Form>
            </Drawer>
        </div>
    )
}

export default NewEmployee