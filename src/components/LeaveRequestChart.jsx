import { Card } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { Pie } from '@ant-design/charts';
import { AuthContext } from '../contexts/AuthContext';

const LeaveRequestChart = () => {
    const { leaves } = useContext(AuthContext)

    const approved = leaves ? leaves.filter(l => l.status === 'approved').length : 0
    const pending = leaves ? leaves.filter(l => l.status === 'pending').length : 0
    const rejected = leaves ? leaves.filter(l => l.status === 'rejected').length : 0

    const data = [
        { type: 'Approved', value: approved },
        { type: 'Pending', value: pending },
        { type: 'Rejected', value: rejected },
    ];

    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

    useEffect(() => {
        const onResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const isSmall = windowWidth < 640;      // tailwind sm
    const isMedium = windowWidth >= 640 && windowWidth < 1024;

    const config = {
        appendPadding: isSmall ? 20 : isMedium ? 60 : 200,
        data,
        autoFit: true,
        angleField: 'value',
        colorField: 'type',
        radius: isSmall ? 0.8 : 0.7,
        color: ({ type }) => {
            const colorMap = {
                Approved: "#52c41a",
                Pending: "#faad14",
                Rejected: "#f5222d",
            };
            return colorMap[type];
        },
        label: isSmall
            ? {
                type: 'outer',
                offset: 8,
                formatter: (d) => `${d.type}: ${d.value}`,
            }
            : {
                position: 'spider',
                text: (d) => `${d.type}\n ${d.value}`,
            },
    };

    return (
        <Card bodyStyle={{ padding: isSmall ? 12 : 24 }}>
            <div className='py-2'>
                <p className={isSmall ? 'text-sm' : ''}>Leave Request Status Distribution</p>
            </div>
            <div style={{ width: '100%', height: isSmall ? 240 : isMedium ? 360 : 420 }}>
                <Pie {...config} />
            </div>
        </Card>
    )
}

export default LeaveRequestChart