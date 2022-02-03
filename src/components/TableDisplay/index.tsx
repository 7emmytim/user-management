import { Button, Card, Modal, Space, Table } from 'antd'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../app/store'
import { deleteUser } from '../../features/userSlice'
import { getColumns } from '../../utils/constants'
import './TableDisplay.scss'

const TableDisplay = () => {

    type DeleteTypes = {
        name: string
        id: number
    }

    const initialDeleteState: DeleteTypes = { name: '', id: 0 }

    const [visible, setVisible] = useState(false)
    const [deleteData, setDeleteData] = useState(initialDeleteState)

    const { usersList: users, fetch, delete: deleteUserFn } = useSelector((state: RootState) => state.users)
    const dispatch = useDispatch()

    const showModal = (data: DeleteTypes) => {
        setVisible(true)
        setDeleteData(data)
    }

    const closeModal = () => setVisible(false)

    const handleDeleteUser = (id: number) => dispatch(deleteUser({ id, callback: closeModal }))

    return (
        <div id='TableContainer'>
            <Card bordered title='User List'
                extra={
                    <Link to='add'>
                        <Button type='primary'>Add user</Button>
                    </Link>
                }>
                <Table dataSource={users} loading={fetch.status === 'loading'} columns={getColumns(showModal)} rowKey='id' bordered size='large' pagination={false} scroll={{ x: true }} />
                <Modal
                    visible={visible}
                    onCancel={closeModal}
                    closable={false}
                    title='Delete'
                    footer={
                        <Space size={'middle'}>
                            <Button className='cancel-modal-btn' type='primary' size='large' onClick={closeModal}>Cancel</Button>
                            <Button type='primary' size='large' loading={deleteUserFn.status === 'loading'} danger onClick={() => handleDeleteUser(deleteData.id)}>Delete</Button>
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