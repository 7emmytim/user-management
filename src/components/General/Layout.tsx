import { Col, Row } from "antd"
import React from "react"
import './Layout.scss'

type LayoutTypes = {
    children: React.ReactNode
}

const Layout = (props: LayoutTypes) => {
    return (
        <Row justify='center' align='middle' id="Layout">
            <Col span={24} sm={24} lg={24} xl={18} xxl={14}>
                <h1>Dashboard</h1>
                {props.children}
            </Col>
        </Row>
    )
}

export default Layout