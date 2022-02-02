import { Button } from "antd"
import { ColumnsType } from "antd/lib/table"
import { Link } from "react-router-dom"
import { User } from "../features/userSlice"

export const formData = [
    { label: 'Name', rules: [{ required: true, message: 'Name is required' }] },
    { label: 'Email', rules: [{ required: true, message: 'Email is required' }] },
    { label: 'Username', rules: [] },
    { label: 'City', rules: [] }
]

export const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
}

export const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
}

export const getColumns = (showModal: (data: { name: string, id: number }) => void) => {
    const columns: ColumnsType<User> = [
        {
            key: 'id',
            title: 'Id',
            dataIndex: 'id'
        },
        {
            key: 'name',
            title: 'Name',
            dataIndex: 'name'
        },
        {
            key: 'username',
            title: 'Username',
            dataIndex: 'username'
        },
        {
            key: 'email',
            title: 'Email',
            dataIndex: 'email'
        },
        {
            key: 'city',
            title: 'City',
            dataIndex: 'address',
            render: address => address.city
        },
        {
            key: 'edit',
            title: 'Edit',
            render: data =>
                <Link to={`edit/${data.id}`}>
                    <button className='edit-user-btn'>Edit</button>
                </Link>
        },
        {
            key: 'delete',
            title: 'Delete',
            render: data => <Button type='primary' danger onClick={() => showModal(data)}>Delete</Button>
        },
    ]
    return columns
}