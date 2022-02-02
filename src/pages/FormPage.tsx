import { Button, Card, Form, Input, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { RootState } from '../app/store'
import { addUser, editUser } from '../features/userSlice'

const FormPage = () => {

    const [form] = Form.useForm()

    const { usersList: users } = useSelector((state: RootState) => state.users)

    const dispatch = useDispatch()
    const { id } = useParams()

    const handleFinish = (values: { name: string, email: string, username: string, city: string }) => {
        // const { name, email, username, city } = values
        id ? dispatch(editUser({ ...values, id: Number(id) })) : dispatch(addUser({ ...values }))
    }

    const editData = users.find(user => user.id === Number(id))

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 8 },
    }

    const tailLayout = {
        wrapperCol: { offset: 8, span: 8 },
    }

    return (
        <Card title='Form' bordered>
            <Link to='/'>HomePage</Link>
            <Form
                {...layout}
                form={form}
                onFinish={handleFinish}
                initialValues={{ name: editData?.name, email: editData?.email }}
                title={'Form'}
            >
                <Form.Item
                    label='Name'
                    name='name'
                    rules={[{ required: true, message: 'Name is required' }]}
                >
                    <Input size='large' style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label='Email'
                    name='email'
                    rules={[{ required: true, message: 'Email is required' }, { type: 'email', message: 'Please enter a valid email' }]}
                >
                    <Input size='large' style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label='Username'
                    name='username'
                >
                    <Input size='large' style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label='City'
                    name='city'
                >
                    <Input size='large' style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Space size={'middle'}>
                        <Button size='large' type='ghost' danger>
                            Cancel
                        </Button>
                        <Button size='large' htmlType='submit' type='primary' className='submit-user-btn'>
                            Submit
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default FormPage