import { Col, Row } from 'antd'
import TableDisplay from '../components/TableDisplay'

const HomePage = () => {
    return (
        <Row>
            <Col span={16} offset={4}>
                <TableDisplay />
            </Col>
        </Row>
    )
}

export default HomePage