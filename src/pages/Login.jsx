import { Form, Input, Button, Spin, App } from 'antd'
import Password from 'antd/es/input/Password'
import React, { useContext, useEffect, useState } from 'react'
import { BiLock } from 'react-icons/bi'
import { FaUser } from 'react-icons/fa'
import { getUsers } from '../api'
import axios from 'axios'
import { AuthContext } from '../contexts/AuthContext'


const Login = () => {
    const [loading, setLoading] = useState(false)
    const { token, setToken, setUser, navigate, setIsAdmin } = useContext(AuthContext)

    const { message } = App.useApp();
    const onFinish = async data => {
        console.log('Success:', data);
        try {
            setLoading(true)
            const res = await axios.post('/api/login', { ...data })
            setToken(res.data.token)
            localStorage.setItem('authToken', res.data.token)
            message.success('Login Succesful')
        } catch (error) {
            console.log(error.message);
            message.error(
                error.message || 'Login failed. Please try again.'
            )
        } finally {
            setLoading(false)
        }
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [token])
    return (
        <div className='w-screen h-screen bg-neutral-100 flex flex-col items-center justify-center' >
            <h1 className='text-4xl mb-14'>Welcome, Log  into your account</h1>
            <div className='bg-white rounded-lg'>
                <div className='py-10 px-16 flex flex-col items-center'>
                    <p className='mb-7 text-2xl'>Management Only</p>
                    <Spin spinning={loading}>
                        <Form
                            name='login'
                            initialValues={{ remember: true }}
                            style={{ width: 300 }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            onLoad={() => <div>Loading</div>}
                        >
                            <Form.Item
                                name='staffId'
                                rules={[{ required: true, message: 'Staff ID is missing' }]}
                            >
                                <Input type='text' className='!px-3 !py-3' width={'20px'} prefix={<FaUser />} placeholder='Staff ID' />
                            </Form.Item>
                            <Form.Item
                                name='password'
                                rules={[{ required: true, message: 'Password cant be empty' }]}
                            >
                                <Input className='!px-3 !py-3' prefix={<BiLock />} type='password' placeholder='Password' />
                            </Form.Item>

                            <Form.Item>
                                <Button className='!py-6' block color='default' variant='solid' htmlType="submit">
                                    Log in
                                </Button>
                                or <a href="">Register now!</a>
                            </Form.Item>
                        </Form>
                    </Spin>
                </div>
            </div>
        </div>
    )
}

export default Login