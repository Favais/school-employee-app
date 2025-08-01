import React, { useContext, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Button, Col, DatePicker, Drawer, Form, Input, Layout, Menu, Row, Select, Space } from "antd";
import Sider from 'antd/es/layout/Sider';
import { Content, Header } from 'antd/es/layout/layout';
import { TiUploadOutline, TiUserOutline } from 'react-icons/ti';
import { IoCameraOutline } from 'react-icons/io5';
import { RiMenuUnfold2Line } from "react-icons/ri";
import { RiMenuUnfoldLine } from "react-icons/ri";
import logo from "../assets/afriklogo.png"
import { AuthContext } from '../contexts/AuthContext';
import { BiLogOut } from 'react-icons/bi';
import NewEmployee from '../components/NewEmployee';



const MainLayout = () => {
    const [collapsed, setCollapsed] = useState()
    const [open, setOpen] = useState(false);
    const { logoutUser } = useContext(AuthContext)
    const location = useLocation()

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };


    const getHeaderTitle = () => {
        switch (location.pathname) {
            case '/employees':
                return (
                    <div className='flex justify-between items-center w-full px-4'>
                        <h2>Employees</h2>
                        <Button onClick={showDrawer} style={{ backgroundColor: 'darkgreen', color: 'white' }} size="large">
                            Add New Employee
                        </Button>
                    </div>
                )
            case '/dashboard':
                return <h2>Dashboard</h2>
            case '/leaves':
                return <h2>Leave Management</h2>
            default:
                return <h2>School Management</h2>
        }
    }
    return (
        <Layout className='h-screen '>
            <Sider
                collapsible
                collapsed={collapsed}
                className='w-screen'
                style={{ backgroundColor: 'ffffff' }}
                trigger={null}
            >
                <div className='flex flex-col h-full'>
                    <div className='flex justify-center'>
                        <img className='' src={logo} alt="" width={'100px'} />
                    </div>
                    <Menu
                        theme="light"
                        mode="inline"
                        style={{
                            minHeight: '',
                            color: '#'
                        }}
                        defaultSelectedKeys={['1']}
                        items={[
                            {
                                key: '1',
                                icon: <TiUserOutline size={'20'} />,
                                label: <Link to={'/dashboard'}>Dashboard</Link>,

                            },
                            {
                                key: '2',
                                icon: <IoCameraOutline size={'20'} />,
                                label: <Link to={'/employees'}>Employees</Link>,
                            },
                            {
                                key: '3',
                                icon: <TiUploadOutline size={'20'} />,
                                label: <Link to={'/leaves'}>Leave</Link>,
                            },
                        ]}
                    />
                    <div className='flex-1' />
                    <div className='p-5 flex justify-center'>
                        <Button onClick={logoutUser} color="danger" variant='solid' size='large'>
                            <BiLogOut />
                            {!collapsed && <span>Logout</span>}
                        </Button>
                    </div>
                </div>
            </Sider>

            <Layout>
                <Header className='flex bg-amber-500' style={{ background: '#fff', padding: 0, textAlign: 'center' }}>
                    <Button
                        type="text"
                        icon={collapsed ? <RiMenuUnfoldLine /> : <RiMenuUnfold2Line />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    {getHeaderTitle()}
                </Header>
                <Content style={{ margin: '16px', padding: '16px', background: '#fff' }}>
                    {/* This is where nested routes render */}
                    <Outlet />
                </Content>
            </Layout>
            <NewEmployee onClose={onClose} open={open} />
        </Layout>

        // <div className='flex'>

        //     <Sidebar />
        //     <div>
        //         <Navbar />
        //         <Outlet />
        //     </div>
        // </div>
    )
}

export default MainLayout