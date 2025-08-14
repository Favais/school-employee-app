import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Table, Tag } from 'antd'

const MyLeaveRequests = () => {
  const { user } = useContext(AuthContext)

  const [userLeaves, setUserLeaves] = useState(user.leaves)
  console.log(user.leaves);

  const column = [
    {
      title: 'Leave ID',
      dataIndex: 'leaveId',
      key: 'leaveId',
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
    }
  ]
  return (
    <div>
      <Table columns={column} dataSource={userLeaves} />
    </div>
  )
}

export default MyLeaveRequests