import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    getBasketReq,
    updateBasketItemReq,
    addToBasketReq,
    deleteBasketItemReq,
} from '../../api/basketService'

export const getBasket = createAsyncThunk(
    'basket/getBasket',
    async (_, { rejectWithValue, getState }) => {
        try {
            const { token } = getState().auth
            const { data } = await getBasketReq(token)
            return data.data.items
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const addToBasket = createAsyncThunk(
    'basket/addNewBasket',
    async (newItem, { dispatch, rejectWithValue, getState }) => {
        try {
            const { token } = getState().auth
            await addToBasketReq(newItem, token)
            dispatch(getBasket())
        } catch (error) {
            rejectWithValue(error)
        }
    }
)
export const updateBasketItem = createAsyncThunk(
    'basket/updateBasket',
    async ({ id, amount }, { dispatch, rejectWithValue, getState }) => {
        try {
            const { token } = getState().auth
            await updateBasketItemReq(id, amount, token)
            dispatch(getBasket())
        } catch (error) {
            rejectWithValue(error)
        }
    }
)

export const deleteBasketItem = createAsyncThunk(
    'basket/deleteBasket',
    async (id, { dispatch, rejectWithValue, getState }) => {
        try {
            const { token } = getState().auth
            await deleteBasketItemReq(id, token)
            dispatch(getBasket())
        } catch (error) {
            rejectWithValue(error)
        }
    }
)

// export const submitOrder = createAsyncThunk(
//     'basket/submitOrder',
//     async ({ orderData }, { dispatch, rejectWithValue }) => {
//         try {
//             await fetchAPI(`https://jsonplaceholder.typicode.com/postssad`, {
//                 method: 'POST',
//                 body: orderData,
//             })
//             return dispatch(getBasket())
//         } catch (error) {
//             return rejectWithValue('Something went wrong')
//         }
//     }
// )
