import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    postOrderRequest,
    getOrderRequest,
    getAllRequest,
} from '../../api/orderService'

export const getOrders = createAsyncThunk(
    'order/getOrder',
    async (_, { rejectWithValue, getState }) => {
        try {
            const { token } = getState().auth
            const { data } = await getOrderRequest(token)
            return data.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const getAllOrders = createAsyncThunk(
    'order/getAllOrders',
    async (_, { rejectWithValue, getState }) => {
        try {
            const { token } = getState().auth
            const { data } = await getAllRequest(token)
            return data.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const postOrders = createAsyncThunk(
    'order/postOrder',
    async (totalPrice, { rejectWithValue, dispatch, getState }) => {
        try {
            const { token } = getState().auth
            await postOrderRequest(totalPrice, token)
            return dispatch(getOrders())
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
