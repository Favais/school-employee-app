import { http, HttpResponse } from 'msw'
import { jwtVerify, SignJWT } from 'jose'
import { db, leaveRequests } from './db'
import bcrypt from 'bcryptjs'
import { useState } from 'react'
import { message } from 'antd'
import { ObjectId } from 'bson'

const SECRET = new TextEncoder().encode('sankara') // convert string to Uint8Array


export const handlers = [
    http.get('/api/employees', () => {
        return HttpResponse.json(db)
    }),

    http.get('/api/leaves', () => {
        return HttpResponse.json(leaveRequests)
    }),

    http.post('/api/userLeaves', async ({ request }) => {
        const { user } = await request.json()
        const userLeaves = leaveRequests.filter((leave) => {
            return user.leaves.includes(leave._id)
        })
        return HttpResponse.json(userLeaves)
    }),

    http.patch('/api/leaves/:id', async ({ params, request }) => {
        const { id } = params;
        const { status } = request.json()
        const updatedLeave = leaveRequests.map(leave => leave.id === id ? { ...leave, status } : leave)

        return HttpResponse.json({ message: 'Leave Updated', id, status })
    }),

    http.post('/api/leaves', async ({ request }) => {
        const { leaveData, user } = await request.json()
        const leaveId = new ObjectId().toString();
        const newLeave = {
            _id: leaveId,
            staffId: user.staffId,
            ...leaveData,
            firstName: user.firstName,
            lastName: user.lastName,
            submittedBy: user.staffId
        };
        leaveRequests.push(newLeave)

        const isUser = db.users.find(u => u.staffId === user.staffId);
        if (isUser) {
            isUser.leaves.push(leaveId);
        }
        console.log(isUser);

        return HttpResponse.json({ message: 'Leave request sent', leaveRequests })
    }),

    http.post('/api/employees', async ({ request }) => {
        try {

            const formData = await request.json()
            console.log(formData);

            const newEmployee = {
                id: Date.now().toString(),
                ...formData,
                createdAt: new Date().toISOString()
            }
            db.users.push(newEmployee)
            console.log(db);

            return HttpResponse.json(
                { success: true, message: 'Employee added successfully' }
            )
        } catch (error) {
            return HttpResponse.json(
                { message: 'Failed' }
            )
        }


    }),

    http.post('/api/login', async ({ request }) => {
        const { staffId, password } = await request.json()

        const user = db.users.find((u) => (
            u.staffId === staffId
        ))
        console.log(user);

        if (!user) {
            return HttpResponse.json({ message: 'User not found' }, { status: 401 })

        }

        // const hasedPassword = await bcrypt.hash(body.password, 10)
        const isMatch = await bcrypt.compare(password, user.password)



        if (isMatch) {
            const token = await new SignJWT({
                id: user.id,
                staffId: user.staffId,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                email: user.email,
                department: user.department,
                status: user.status,
                phone: user.phone,
                gender: user.gender,
                leaves: user.leaves
            })
                .setProtectedHeader({ alg: 'HS256' })
                .setExpirationTime('2h')
                .sign(SECRET)


            const safeUser = {
                id: user.id,
                staffId: user.staffId,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                email: user.email,
                department: user.department,
                status: user.status,
                phone: user.phone,
                gender: user.gender
                // Add other non-sensitive fields you need
            }


            return HttpResponse.json({ token, safeUser })

        }

        return new HttpResponse('Unauthorized', { status: 401 })
    }),

]
