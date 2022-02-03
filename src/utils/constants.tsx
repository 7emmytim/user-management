import { Button } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { Link } from 'react-router-dom'

export type User = {
    id: string | number
    name: string
    username: string
    email: string
    address: {
        city: string
    }
}

export type UserState = {
    usersList: User[]
    fetch: { status: 'loading' | 'idle', error: string | null }
    add: { status: 'loading' | 'idle', error: string | null }
    edit: { status: 'loading' | 'idle', error: string | null }
    delete: { status: 'loading' | 'idle', error: string | null }
}

export type UserActionPayloadTypes = {
    name: string 
    email: string
    username: string
    address: { city: string }
    id: number
    callback: () => void
}

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
            dataIndex: 'id',
        },
        {
            key: 'name',
            title: 'Name',
            dataIndex: 'name'
        },
        {
            key: 'username',
            title: 'Username',
            dataIndex: 'username',
            sorter: (a, b) => a.username.localeCompare(b.username)
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