import { Button, Card, Modal, Space, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../app/store'
import { deleteUser, User } from '../../features/userSlice'
import './TableDisplay.scss'

const TableDisplay = () => {

    type DeleteTypes = {
        name: string
        id: number
    }

    const initialDeleteState: DeleteTypes = { name: '', id: 0 }

    const [visible, setVisible] = useState(false)
    const [deleteData, setDeleteData] = useState(initialDeleteState)

    const { usersList: users, error, status } = useSelector((state: RootState) => state.users)
    const dispatch = useDispatch()

    const showModal = (data: DeleteTypes) => {
        setVisible(true)
        setDeleteData(data)
    }

    const closeModal = () => setVisible(false)

    const handleDeleteUser = (id: number) => dispatch(deleteUser({ id }))

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

    return (
        <div id='TableContainer'>
            <Card bordered title='User List'
                extra={
                    <Link to='add'>
                        <Button type='primary'>Add user</Button>
                    </Link>
                }>
                <Table dataSource={users} loading={status === 'loading'} columns={columns} rowKey='id' />
                <Modal
                    visible={visible}
                    onCancel={closeModal}
                    closable={false}
                    title='Delete'
                    footer={
                        <Space size={'middle'}>
                            <Button className='cancel-modal-btn' type='primary' size='large' onClick={() => handleDeleteUser(deleteData.id)}>Cancel</Button>
                            <Button type='primary' size='large' loading={status === 'loading'} danger onClick={() => handleDeleteUser(deleteData.id)}>Delete</Button>
                        </Space>
                    }
                    centered
                >
                    You are about to delete user
                    <strong> {deleteData.name} </strong>
                    with id
                    <strong> {deleteData.id}</strong>
                </Modal>
            </Card>
        </div>
    )
}

export default TableDisplay