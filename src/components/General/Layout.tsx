// import { Alert } from 'antd'
import Alert from 'antd/es/alert'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import './Layout.scss'

type LayoutTypes = {
    children: React.ReactNode
}

const Layout = (props: LayoutTypes) => {

    const { fetch, add, edit, delete: deleteUserFn } = useSelector((state: RootState) => state.users)
    const error = fetch.error || add.error || edit.error || deleteUserFn.error

    return (
        <div>
            {error && <Alert description={error} banner type='error' />}
            <div id='Layout'>
                <h1>Dashboard</h1>
                {props.children}
            </div>
        </div>
    )
}

export default Layout