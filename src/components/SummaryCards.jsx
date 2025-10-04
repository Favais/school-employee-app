import { Card, Col, Row } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { LuUsersRound } from "react-icons/lu";
import { CiCalendarDate, CiTimer, CiCircleCheck } from "react-icons/ci";


const SummaryCards = () => {
    const { leaves, allUsers } = useContext(AuthContext)

    // responsive state
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
    useEffect(() => {
        const onResize = () => setWindowWidth(window.innerWidth)
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])
    const isSmall = windowWidth < 640

    const numberClass = isSmall ? 'text-2xl' : 'text-3xl'
    const iconSize = isSmall ? 18 : 22

    return (
        <div>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                    <Card title={<span className='flex justify-between items-center'>Total Employees <LuUsersRound size={iconSize} /></span>} >
                        <div className={`${numberClass} font-semibold`}>{allUsers?.length}</div>
                        <p className={isSmall ? 'text-sm' : ''}>Active employees</p>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                    <Card title={<span className='flex justify-between items-center'>Total Leave Requests<CiCalendarDate size={iconSize} /></span>}>
                        <div className={`${numberClass} font-semibold`}>{leaves?.length}</div>
                        <p className={isSmall ? 'text-sm' : ''}>This month</p>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                    <Card title={<span className='flex justify-between items-center'>Pending Leave Request<CiTimer size={iconSize} /></span>}>
                        <div className={`${numberClass} font-semibold`}>{leaves?.filter(l => l.status === 'pending').length}</div>
                        <p className={isSmall ? 'text-sm' : ''}>Pending Leaves</p>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                    <Card title={<span className='flex justify-between items-center'>Approved Leave Request<CiCircleCheck size={iconSize} /></span>}>
                        <div className={`${numberClass} font-semibold`}>{leaves?.filter(l => l.status === 'approved').length}</div>
                        <p className={isSmall ? 'text-sm' : ''}>Approved Leaves</p>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default SummaryCards