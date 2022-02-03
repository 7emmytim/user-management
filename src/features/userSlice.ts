import { AnyAction, createAsyncThunk, createSlice, PayloadAction, ThunkDispatch } from '@reduxjs/toolkit'
import axios from '../utils/axios-orders'
import { User, UserActionPayloadTypes, UserState } from '../utils/constants'

const dispatchLoadingBlock = (dispatch: ThunkDispatch<unknown, unknown, AnyAction>, type: 'fetch' | 'add' | 'edit' | 'delete') => {
    dispatch(userSlice.actions.toggleError({ type, message: null }))
    dispatch(userSlice.actions.toggleLoadingStatus({ type, status: 'loading' }))
}

const dispatchErrorBlock = (dispatch: ThunkDispatch<unknown, unknown, AnyAction>, type: 'fetch' | 'add' | 'edit' | 'delete', message: string) => {
    dispatch(userSlice.actions.toggleLoadingStatus({ type, status: 'idle' }))
    dispatch(userSlice.actions.toggleError({ type, message: `Failed to ${type} ${type === 'fetch' ? 'users' : 'user'} (${message})` }))
}

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    (_, { dispatch }) => {
        dispatchLoadingBlock(dispatch, 'fetch')
        axios.get(`/`).then(response => {
            dispatch(userSlice.actions.fetchUsersSuccess(response.data))
            dispatch(userSlice.actions.toggleLoadingStatus({ type: 'fetch', status: 'idle' }))
        }).catch(error => {
            dispatchErrorBlock(dispatch, 'fetch', error.message)
        })

    })

export const addUser = createAsyncThunk(
    'users/addUser',
    (payload: UserActionPayloadTypes, { dispatch }) => {
        dispatchLoadingBlock(dispatch, 'add')
        axios.post(`/`, { ...payload }).then(response => {
            dispatch(userSlice.actions.addUserSuccess(response.data))
            dispatch(userSlice.actions.toggleLoadingStatus({ type: 'add', status: 'idle' }))
            payload.callback()
        }).catch(error => {
            dispatchErrorBlock(dispatch, 'add', error.message)
        })
    })

export const editUser = createAsyncThunk(
    'users/editUser',
    ({ name, email, username, address, id, callback }: UserActionPayloadTypes, { dispatch }) => {
        dispatchLoadingBlock(dispatch, 'edit')
        axios.put(`/${id}`, { name, email, username, address }).then(response => {
            dispatch(userSlice.actions.editUserSuccess(response.data))
            dispatch(userSlice.actions.toggleLoadingStatus({ type: 'edit', status: 'idle' }))
            callback()
        }).catch(error => {
            dispatchErrorBlock(dispatch, 'edit', error.message)
        })
    })

export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    (payload: { id: number, callback: () => void }, { dispatch }) => {
        dispatchLoadingBlock(dispatch, 'delete')
        axios.delete(`/${payload.id}`).then(() => {
            dispatch(userSlice.actions.deleteUserSuccess(payload.id))
            dispatch(userSlice.actions.toggleLoadingStatus({ type: 'delete', status: 'idle' }))
            payload.callback()
        }).catch(error => {
            dispatchErrorBlock(dispatch, 'delete', error.message)
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
            state.usersList = payload
        },
        addUserSuccess: (state, { payload }: PayloadAction<User>) => {
            state.usersList.push(payload)
        },
        editUserSuccess: (state, { payload }: PayloadAction<User>) => {
            const findUser = state.usersList.find(user => user.id === payload.id)
            const { name, username, email, address } = payload
            if (findUser) {
                findUser.name = name
                findUser.username = username
                findUser.email = email
                findUser.address = address
            }
        },
        deleteUserSuccess: (state, { payload }: PayloadAction<number>) => {
            state.usersList = state.usersList.filter(user => user.id !== payload)
        },
        toggleLoadingStatus: (state, { payload }: PayloadAction<{ type: 'fetch' | 'add' | 'edit' | 'delete', status: 'loading' | 'idle' }>) => {
            if (payload.type === 'fetch') state['fetch'].status = payload.status
            else if (payload.type === 'add') state['add'].status = payload.status
            else if (payload.type === 'edit') state['edit'].status = payload.status
            else if (payload.type === 'delete') state['delete'].status = payload.status
        },
        toggleError: (state, { payload }: PayloadAction<{ type: 'fetch' | 'add' | 'edit' | 'delete', message: string | null }>) => {
            if (payload.type === 'fetch') state['fetch'].error = payload.message
            else if (payload.type === 'add') state['add'].error = payload.message
            else if (payload.type === 'edit') state['edit'].error = payload.message
            else if (payload.type === 'delete') state['delete'].error = payload.message
        },
    }
})

export default userSlice.reducer