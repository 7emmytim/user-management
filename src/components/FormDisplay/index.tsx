import { Button, Card, Form, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../app/store'
import { addUser, editUser } from '../../features/userSlice'
import { formData, layout, tailLayout } from '../../utils/constants'

const FormDisplay = () => {

    const [form] = Form.useForm()

    const { usersList: users, add, edit } = useSelector((state: RootState) => state.users)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()

    const handleFinish = (values: { name: string, email: string, username: string, city: string }) => {

        const { name, email, username, city } = values

        const userName = username ? username : `user ${name}`
        const userCity = username ? city : 'World'

        const newValues = { name, username: userName, email, address: { city: userCity }, callback: () => navigate('/') }

        id ? dispatch(editUser({ ...newValues, id: Number(id) })) : dispatch(addUser({ ...newValues }))
    }

    const editData = users.find(user => user.id === Number(id))

    return (
        <Card title='Form' bordered id='FormContainer'>
            <Form
                {...layout}
                form={form}
                onFinish={handleFinish}
                initialValues={{ name: editData?.name, email: editData?.email, username: editData?.username, city: editData?.address.city }}
                title={'Form'}
            >
                {
                    formData.map(item => {
                        return (
                            <Form.Item
                                key={item.label}
                                label={item.label}
                                name={item.label.toLocaleLowerCase()}
                                rules={item.label === 'Email' ? [...item.rules, { type: 'email', message: 'Please enter a valid email' }] : [...item.rules]}
                            >
                                <Input size='large' />
                            </Form.Item>
                        )
                    })
                }

                <Form.Item {...tailLayout}>
                    <Button type='ghost' danger onClick={() => navigate('/')}>
                        Cancel
                    </Button>
                    <Button htmlType='submit' type='primary' loading={id ? edit.status === 'loading' : add.status === 'loading'} className='submit-user-btn'>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default FormDisplay