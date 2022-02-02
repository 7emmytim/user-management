import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from '../utils/axios-orders'

type UserState = {
    usersList: User[]
    fetch: { status: 'loading' | 'idle', error: string | null }
    add: { status: 'loading' | 'idle', error: string | null }
    edit: { status: 'loading' | 'idle', error: string | null }
    delete: { status: 'loading' | 'idle', error: string | null }
}

export type User = {
    id: string | number
    name: string
    username: string
    email: string
    address: {
        city: string
    }
}

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    (_, { dispatch }) => {
        dispatch(userSlice.actions.initiateLoading('fetch'))
        axios.get(`/`).then(response => {
            dispatch(userSlice.actions.fetchUsersSuccess(response.data))
            dispatch(userSlice.actions.clearLoading('fetch'))
        }).catch(error => {
            console.log(error)
            dispatch(userSlice.actions.clearLoading('fetch'))
        })

    })

export const addUser = createAsyncThunk(
    'users/addUser',
    (payload: { name: string, email: string, username: string, address: { city: string }, callback: () => void }, { dispatch }) => {
        dispatch(userSlice.actions.initiateLoading('add'))
        axios.post(`/`, { ...payload }).then(response => {
            dispatch(userSlice.actions.addUserSuccess(response.data))
            dispatch(userSlice.actions.clearLoading('add'))
            payload.callback()
        }).catch(error => {
            console.log(error)
            dispatch(userSlice.actions.clearLoading('add'))
        })
    })

export const editUser = createAsyncThunk(
    'users/editUser',
    ({ name, email, username, address, id, callback }: { name: string, email: string, username: string, address: { city: string }, id: number, callback: () => void }, { dispatch }) => {
        dispatch(userSlice.actions.initiateLoading('edit'))
        axios.put(`/${id}`, { name, email, username, address }).then(response => {
            dispatch(userSlice.actions.editUserSuccess(response.data))
            dispatch(userSlice.actions.clearLoading('edit'))
            callback()
        }).catch(error => {
            console.log(error)
            dispatch(userSlice.actions.clearLoading('edit'))
        })
    })

export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    (payload: { id: number, callback: () => void }, { dispatch }) => {
        dispatch(userSlice.actions.initiateLoading('delete'))
        axios.delete(`/${payload.id}`).then(response => {
            dispatch(userSlice.actions.deleteUserSuccess({ ...response.data, ...payload }))
            dispatch(userSlice.actions.clearLoading('delete'))
            payload.callback()
        }).catch(error => {
            console.log(error)
            dispatch(userSlice.actions.clearLoading('delete'))
        })
    })

const initialState: UserState = {
    usersList: [],
    fetch: { status: 'idle', error: null },
    add: { status: 'idle', error: null },
    edit: { status: 'idle', error: null },
    delete: { status: 'idle', error: null }
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        fetchUsersSuccess: (state, { payload }: PayloadAction<User[]>) => {
            console.log('successful', payload);
            state.usersList = payload
        },
        addUserSuccess: (state, { payload }: PayloadAction<User>) => {
            console.log('successful', payload);
            state.usersList.push(payload)
        },
        editUserSuccess: (state, { payload }: PayloadAction<User>) => {
            console.log('successful', payload)
            const findUser = state.usersList.find(user => user.id === payload.id)
            const { name, username, email, address } = payload
            if (findUser) {
                findUser.name = name
                findUser.username = username
                findUser.email = email
                findUser.address = address
            }
        },
        deleteUserSuccess: (state, { payload }: PayloadAction<User>) => {
            console.log('successful', payload);
            state.usersList = state.usersList.filter(user => user.id !== payload.id)
        },
        initiateLoading: (state, { payload }: PayloadAction<'fetch' | 'add' | 'edit' | 'delete'>) => {
            if (payload === 'fetch') state['fetch'].status = 'loading'
            else if (payload === 'add') state['add'].status = 'loading'
            else if (payload === 'edit') state['edit'].status = 'loading'
            else if (payload === 'delete') state['delete'].status = 'loading'
        },
        clearLoading: (state, { payload }: PayloadAction<'fetch' | 'add' | 'edit' | 'delete'>) => {
            if (payload === 'fetch') state['fetch'].status = 'idle'
            else if (payload === 'add') state['add'].status = 'idle'
            else if (payload === 'edit') state['edit'].status = 'idle'
            else if (payload === 'delete') state['delete'].status = 'idle'
        },
    }
})

export const { } = userSlice.actions
export default userSlice.reducer