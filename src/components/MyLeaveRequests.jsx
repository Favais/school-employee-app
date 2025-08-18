import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Table, Tag } from 'antd'
import axios from 'axios'

const MyLeaveRequests = () => {
  const { user, userLeaves, setUserLeaves } = useContext(AuthContext)



  const column = [
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
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
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
      <Table key={userLeaves.id} columns={column} dataSource={userLeaves} />
    </div>
  )
}

export default MyLeaveRequests