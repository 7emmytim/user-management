import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router-dom'
import axios from '../utils/axios-orders'

type UserState = {
    usersList: User[],
    status: 'loading' | 'success' | 'error' | 'idle',
    error: string | null
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

type UsersActionError = {
    message: string
}

export const fetchUsers = createAsyncThunk<User[], number, { rejectValue: UsersActionError }>(
    'users/fetchUsers',
    async (limit: number, thunkApi) => {
        const response = await axios.get(`/`)
        if (response.status !== 200) {
            return thunkApi.rejectWithValue({
                message: `${response.status} error, Unable to fetch users.`
            })
        }
        const data: User[] = await response.data
        return data
    })

export const addUser = createAsyncThunk<User, { name: string, email: string }, { rejectValue: UsersActionError }>(
    'users/addUser',
    async (payload, thunkApi) => {
        const response = await axios.post(`/`, { ...payload })
        if (response.status !== 201) {
            return thunkApi.rejectWithValue({
                message: `${response.status} error, Unable to add user.`
            })
        }
        const data: User = await {...response.data, username: `user_${payload.name}`, address: { city: 'Dubai' }}
        return data
    })

export const editUser = createAsyncThunk<User, { name: string, email: string, id: number }, { rejectValue: UsersActionError }>(
    'users/editUser',
    async ({ name, email, id }, thunkApi) => {
        const response = await axios.put(`${id}`, { name, email })
        console.log(response)
        if (response.status !== 200) {
            return thunkApi.rejectWithValue({
                message: `${response.status} error, Unable to edit user.`
            })
        }
        const data: User = await response.data
        return data
    })

export const deleteUser = createAsyncThunk<User, { id: number }, { rejectValue: UsersActionError }>(
    'users/deleteUser',
    async (payload, thunkApi) => {
        const response = await axios.delete(`${payload.id}`)
        if (response.status !== 200) {
            return thunkApi.rejectWithValue({
                message: `${response.status} error, Unable to delete user.`
            })
        }
        const data: User = await { ...response.data, ...payload }
        return data
    })


const initialState: UserState = {
    usersList: [],
    status: 'idle',
    error: null
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // addUser: (state, { payload }: PayloadAction<User>) => {
        //     state.usersList.push(payload)
        // },
        // editUser: (state, { payload }: PayloadAction<User>) => {
        //     state.usersList.push(payload)
        // },
        // deleteUser: (state, { payload }: PayloadAction<User>) => {
        //     console.log(payload);
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.status = 'loading'
            state.error = null
            console.log('loading');
        })
        builder.addCase(addUser.pending, (state) => {
            state.status = 'loading'
            state.error = null
            console.log('loading');
        })
        builder.addCase(editUser.pending, (state) => {
            state.status = 'loading'
            state.error = null
            console.log('loading');
        })
        builder.addCase(deleteUser.pending, (state) => {
            state.status = 'loading'
            state.error = null
            console.log('loading');
        })
        builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
            state.usersList = payload
            state.status = 'idle'
        })
        builder.addCase(addUser.fulfilled, (state, { payload }: PayloadAction<User>) => {
            state.usersList.push(payload)
            state.status = 'idle'
        })
        builder.addCase(editUser.fulfilled, (state, { payload }: PayloadAction<User>) => {
            console.log(payload)
            // state.usersList.push(payload)
            // state.status = 'idle'
        })
        builder.addCase(deleteUser.fulfilled, (state, { payload }: PayloadAction<User>) => {
            state.usersList = state.usersList.filter(user => user.id !== payload.id)
            state.status = 'idle'            
        })
        builder.addCase(fetchUsers.rejected || addUser.fulfilled || editUser.rejected || deleteUser.rejected, (state, { payload }) => {
            if (payload) state.error = payload.message
            state.status = 'idle'
        })
    },
})

export const { } = userSlice.actions
export default userSlice.reducer