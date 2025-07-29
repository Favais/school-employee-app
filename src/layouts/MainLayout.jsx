import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { Link, Outlet } from 'react-router-dom'
import { Button, Layout, Menu } from "antd";
import Sider from 'antd/es/layout/Sider';
import { Content, Header } from 'antd/es/layout/layout';
import { TiUploadOutline, TiUserOutline } from 'react-icons/ti';
import { IoCameraOutline } from 'react-icons/io5';
import { RiMenuUnfold2Line } from "react-icons/ri";
import { RiMenuUnfoldLine } from "react-icons/ri";
import logo from "../assets/afriklogo.png"



const MainLayout = () => {
    const [collapsed, setCollapsed] = useState()

    return (
        <Layout className='h-screen'>
            <Sider collapsible collapsed={collapsed} className='w-screen'>
                <div className='flex justify-center'>
                    <img className='' src={logo} alt="" width={'100px'} />
                </div>
                <Menu
                    theme="light"
                    mode="inline"
                    item
                    style={{
                        minHeight: '',
                        color: '#'
                    }}
                    defaultSelectedKeys={['3']}
                    items={[
                        {
                            key: '1',
                            icon: <TiUserOutline />,
                            label: <Link to={'/dashboard'}>Dashboard</Link>,

                        },
                        {
                            key: '2',
                            icon: <IoCameraOutline />,
                            label: <Link to={'/employees'}>Employees</Link>,
                        },
                        {
                            key: '3',
                            icon: <TiUploadOutline />,
                            label: <Link to={'/leaves'}>Leave</Link>,
                        },
                    ]}
                />
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
                    <h2>School Management</h2>
                </Header>
                <Content style={{ margin: '16px', padding: '16px', background: '#fff' }}>
                    {/* This is where nested routes render */}
                    <Outlet />
                </Content>
            </Layout>
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