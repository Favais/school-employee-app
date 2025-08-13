import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import UnAuthorized from '../components/UnAuthorized'
import { Table, Tag } from 'antd'
import { Link } from 'react-router-dom'
import EmployeeDetails from './EmployeeDetails'

const Employees = () => {
    const { isAdmin, allUsers } = useContext(AuthContext)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

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
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
        },
        {
            title: 'Contact',
            dataIndex: 'contact',
            key: 'contact',
            render: (_, record) =>
                <div className='flex flex-col'>
                    <p>{`${record.email}`}</p>
                    <p>{`${record.phone}`}</p>
                </div>
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
            }
        },
        {
            title: 'Date of Employment',
            dataIndex: 'hireDate',
            key: 'hireDate',
        },
    ]
    return (
        <div>
            <Table columns={columns} dataSource={allUsers} />
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