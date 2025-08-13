import { App, Button, Form, Input, Modal, Popover, Space, Tag } from 'antd'
import { CgProfile } from "react-icons/cg";
import { GiGraduateCap } from "react-icons/gi";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { useState } from 'react';

const EmployeeDetails = ({ isModalOpen, handleOk, handleCancel, employee }) => {
    const { message } = App.useApp()
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);
    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleDelete = (name) => {
        handleCancel()
        message.error(`Employee ${employee.firstName} deleted`)
    }

    let color = employee.status === 'terminated' ? 'red' : employee.status === 'active' ? 'green' : ''

    return (
        <div>
            {isEditing ? (
                <Modal
                    title="Employee Details"
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    width={1000}
                    footer={[
                        <Button variant='solid' color='green'>
                            Save
                        </Button>,
                        <Button onClick={() => setIsEditing(false)}>Cancel</Button>
                    ]}
                >
                    <div>
                        <Form form={form} initialValues={employee} layout="vertical">
                            <div className='flex gap-5 p-20'>
                                <div className='flex flex-col gap-7 items-center'>
                                    <CgProfile size={200} />
                                    <div className='flex flex-col items-center'>
                                        <p className='text-lg font-semibold flex gap-2 items-center '>
                                            <span>{`${employee.firstName} ${employee.lastName}`}</span>
                                            <Tag color={color}>
                                                {employee.status}
                                            </Tag>
                                        </p>
                                        <p className='text-neutral-500 font-semibold'>{`${employee.role} | ${employee.department}`}</p>
                                    </div>
                                    <div className='flex flex-col gap-7'>
                                        <Form.Item name='degree'>
                                            <Input prefix={<MdOutlineMail />} />
                                        </Form.Item>
                                        <Form.Item name="phone" rules={[{ required: true, type: "phone" }]}>
                                            <Input prefix={<FiPhoneCall />} />
                                        </Form.Item>
                                        <Form.Item name='email'>
                                            <Input prefix={<MdOutlineMail />} />
                                        </Form.Item>

                                    </div>
                                </div>
                                <div className='flex flex-col p-6 gap-3'>
                                    <h2 className='text-lg'>About</h2>
                                    <Form.Item name='about' className='text-neutral-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, commodi. Vero expedita optio animi eum, quod delectus harum quo necessitatibus, pariatur atque quis! Neque sunt, nihil explicabo facere quas similique.
                                        Aut cupiditate in numquam neque voluptatem pariatur quia est officia labore beatae, cum sint. Enim ipsa soluta incidunt doloribus, officia nostrum, minima quam ut nesciunt perspiciatis, corporis magnam ducimus quaerat!
                                        Ullam magni rerum voluptates necessitatibus doloremque quasi quod consectetur! Modi incidunt sequi dignissimos est quaerat alias praesentium magnam eum, id cum iusto expedita quibusdam blanditiis officiis eligendi hic doloremque aliquam.
                                    </Form.Item>
                                    <div className=' flex justify-between pt-10'>
                                        <span className='flex flex-col gap-2'>
                                            <p className='font-semibold'>Gender</p>
                                            <p>{employee.gender}</p>
                                        </span>
                                        <span className='flex flex-col gap-2'>
                                            <p className='font-semibold'>Date of Employment</p>
                                            <p>{employee.hireDate}</p>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </div>
                </Modal>
            )
                : (
                    <Modal
                        title="Employee Details"
                        closable={{ 'aria-label': 'Custom Close Button' }}
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        width={1000}
                        footer={[
                            <Button key='edit' type='' onClick={handleEdit}>
                                Edit
                            </Button>,
                            <Button type='primary' onClick={() => handleDelete(employee.firstName)} danger>
                                Delete
                            </Button>
                        ]}
                    >
                        <div className='flex gap-5 p-20'>
                            <div className='flex flex-col gap-7 items-center'>
                                <CgProfile size={200} />
                                <div className='flex flex-col items-center'>
                                    <p className='text-lg font-semibold flex gap-2 items-center '>
                                        <span>{`${employee.firstName} ${employee.lastName}`}</span>
                                        <Tag color={color}>
                                            {employee.status}
                                        </Tag>
                                    </p>
                                    <p className='text-neutral-500 font-semibold'>{`${employee.role} | ${employee.department}`}</p>
                                </div>
                                <div className='flex gap-7'>
                                    <Popover content={employee.degree}>
                                        <GiGraduateCap size={20} />
                                    </Popover>
                                    <Popover content={employee.phone}>
                                        <FiPhoneCall size={20} />
                                    </Popover>
                                    <Popover content={employee.email}>
                                        <MdOutlineMail size={20} />
                                    </Popover>
                                </div>
                            </div>
                            <div className='flex flex-col p-6 gap-3'>
                                <h2 className='text-lg'>About</h2>
                                <p className='text-neutral-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, commodi. Vero expedita optio animi eum, quod delectus harum quo necessitatibus, pariatur atque quis! Neque sunt, nihil explicabo facere quas similique.
                                    Aut cupiditate in numquam neque voluptatem pariatur quia est officia labore beatae, cum sint. Enim ipsa soluta incidunt doloribus, officia nostrum, minima quam ut nesciunt perspiciatis, corporis magnam ducimus quaerat!
                                    Ullam magni rerum voluptates necessitatibus doloremque quasi quod consectetur! Modi incidunt sequi dignissimos est quaerat alias praesentium magnam eum, id cum iusto expedita quibusdam blanditiis officiis eligendi hic doloremque aliquam.</p>
                                <div className=' flex justify-between pt-10'>
                                    <span className='flex flex-col gap-2'>
                                        <p className='font-semibold'>Gender</p>
                                        <p>{employee.gender}</p>
                                    </span>
                                    <span className='flex flex-col gap-2'>
                                        <p className='font-semibold'>Date of Employment</p>
                                        <p>{employee.hireDate}</p>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Modal>)
            }
        </div >
    )
}

export default EmployeeDetails