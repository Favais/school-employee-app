import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import UnAuthorized from '../components/UnAuthorized'
import { Table, Tag } from 'antd'
import { Link } from 'react-router-dom'
import EmployeeDetails from './EmployeeDetails'

const Employees = () => {
    const { isAdmin, allUsers } = useContext(AuthContext)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    // responsive state
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
    useEffect(() => {
        const onResize = () => setWindowWidth(window.innerWidth)
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])
    const isSmall = windowWidth < 768

    const showModal = (employee) => {
        setSelectedEmployee(employee)
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    if (!isAdmin) {
        return <UnAuthorized />
    }
    const columns = [
        {
            title: 'Staff ID',
            dataIndex: 'staffId',
            key: 'staffId',
            responsive: ['md'], // hide on small screens
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => <Link onClick={() => showModal(record)}>{`${record.firstName} ${record.lastName}`}</Link>,
        },

        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            responsive: ['md'],
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
            responsive: ['md'],
        },
        {
            title: 'Contact',
            dataIndex: 'contact',
            key: 'contact',
            render: (_, record) =>
                <div className='flex flex-col'>
                    <p className='truncate'>{`${record.email}`}</p>
                    <p className='truncate'>{`${record.phone}`}</p>
                </div>,
            responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_, tag) => {
                let color = tag.status === 'terminated' ? 'red' : tag.status === 'active' ? 'green' : ''
                return (
                    <Tag color={color}>
                        {tag.status}
                    </Tag>)
            },
            responsive: ['sm', 'md', 'lg', 'xl']
        },
        {
            title: 'Date of Employment',
            dataIndex: 'hireDate',
            key: 'hireDate',
            responsive: ['md'],
        },
    ]

    // expandable row to show hidden details on small screens
    const expandable = isSmall
        ? {
            expandedRowRender: (record) => (
                <div className='flex flex-col gap-2 sm:flex-row sm:gap-6'>
                    <div>
                        <strong>Department:</strong> {record.department}
                    </div>
                    <div>
                        <strong>Gender:</strong> {record.gender}
                    </div>
                    <div>
                        <strong>Contact:</strong>
                        <div className='flex flex-col'>
                            <span>{record.email}</span>
                            <span>{record.phone}</span>
                        </div>
                    </div>
                    <div>
                        <strong>Status:</strong> <Tag color={record.status === 'terminated' ? 'red' : record.status === 'active' ? 'green' : ''}>{record.status}</Tag>
                    </div>
                    <div>
                        <strong>Hired:</strong> {record.hireDate}
                    </div>
                </div>
            ),
            rowExpandable: () => true,
            expandRowByClick: true,
            showExpandColumn: true,
        }
        : {}

    return (
        <div>
            <Table
                columns={columns}
                dataSource={allUsers}
                rowKey={(r) => r.staffId || `${r.firstName}-${r.lastName}`}
                pagination={{ pageSize: isSmall ? 5 : 10 }}
                scroll={{ x: 'max-content' }}
                {...(isSmall ? { expandable } : {})}
            />
            {selectedEmployee && <EmployeeDetails
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
                employee={selectedEmployee}
            />}
        </div>
    )
}

export default Employees