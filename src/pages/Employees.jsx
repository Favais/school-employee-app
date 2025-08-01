import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import UnAuthorized from '../components/UnAuthorized'
import { Table, Tag } from 'antd'

const Employees = () => {
    const { isAdmin, allUsers } = useContext(AuthContext)

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
            render: (_, record) => <a href="">{`${record.firstName} ${record.lastName}`}</a>,
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
            title: 'Sttus',
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
        </div>
    )
}

export default Employees