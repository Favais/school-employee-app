import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { App, Button, Space, Table, Tag } from 'antd';
import { IoIosCloseCircle } from 'react-icons/io';
import { CiCircleCheck } from 'react-icons/ci';
import EmployeeDetails from '../pages/EmployeeDetails';
import { Link } from 'react-router-dom';

const LeaveRequests = () => {
    const { leaves, setLeaves } = useContext(AuthContext)
    const { message } = App.useApp()
    const getLeaves = async () => {

        try {
            const res = await axios.get('/api/leaves')
            await setLeaves(res.data)
            console.log(res);

        } catch (error) {

        }

    }
    const handleApprove = async (record) => {

        try {
            const res = await axios.patch(`/api/leaves/${record.id}`, { status: 'approved' })
            setLeaves((prevLeaves) => (
                prevLeaves.map((leave) => leave.id === record.id ? { ...leave, status: 'approved' } : leave)
            ))
            message.success(`Leave approved for ${record.staffId}`)
        } catch (error) {
            console.log(error);

        }
    }

    const handleDecline = async (record) => {
        try {
            const res = await axios.patch(`/api/leaves/${record.id}`, { status: 'rejected' })
            setLeaves((prevLeaves) => (
                prevLeaves.map((leave) => leave.id === record.id ? { ...leave, status: 'rejected' } : leave)
            ))
            message.error(`Leave declined for ${record.staffId}`)
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getLeaves()
    }, [])


    useEffect(() => {

    }, [leaves])
    const column = [
        {
            title: 'Staff ID',
            dataIndex: 'staffId',
            key: 'staffId',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => <Link >{`${record.firstName} ${record.lastName}`}</Link>,
        },
        {
            title: 'Leave Type',
            dataIndex: 'leaveType',
            key: 'leaveType',
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'startDate',
        },
        {
            title: 'End Date',
            dataIndex: 'endDate',
            key: 'endDate',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_, tag) => {
                let color = tag.status === 'rejected' ? 'red' : tag.status === 'approved' ? 'green' : ''
                return (
                    <Tag color={color}>
                        {tag.status}
                    </Tag>
                )
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                if (record.status === 'approved' || record.status === 'rejected') {
                    return null;
                }
                return (
                    <Space size="small">
                        <Button
                            type="primary"
                            icon={<CiCircleCheck />}
                            onClick={() => handleApprove(record)}
                            size="small"
                            style={{ backgroundColor: 'green' }}
                        >
                            Approve
                        </Button >
                        <Button
                            danger
                            icon={<IoIosCloseCircle />}
                            onClick={() => handleDecline(record)}
                            size="small"
                        >
                            Decline
                        </Button>
                    </Space >
                )
            },
        },
    ]

    return (
        <div>
            <Table columns={column} dataSource={leaves} />
        </div>
    )
}

export default LeaveRequests