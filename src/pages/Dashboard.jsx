import React from 'react'
import SummaryCards from '../components/summaryCards'
import LeaveRequestChart from '../components/LeaveRequestChart'

const Dashboard = () => {
    return (
        <div className='flex flex-col gap-5 p-4'>
            <SummaryCards />
            <div>
                <LeaveRequestChart />
            </div>
        </div>
    )
}

export default Dashboard