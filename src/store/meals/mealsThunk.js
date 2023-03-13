import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    getMealRequest,
    deleteMealRequest,
    updateMealRequest,
    postMealRequest,
} from '../../api/mealService'

export const getMeal = createAsyncThunk(
    'meals/getMeal',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await getMealRequest()
            return data.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const postMeal = createAsyncThunk(
    'meal/postMeal',
    async (newMeal, { rejectWithValue, dispatch, getState }) => {
        try {
            const { token } = getState().auth

            await postMealRequest(newMeal, token)
            return dispatch(getMeal())
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const deleteMeal = createAsyncThunk(
    'meal/deleteMeal',
    async (id, { dispatch, rejectWithValue, getState }) => {
        try {
            const { token } = getState().auth
            await deleteMealRequest(token, id)
            return dispatch(getMeal())
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const updateMeal = createAsyncThunk(
    'meal/updateMeal',
    async (data, { dispatch, rejectWithValue, getState }) => {
        try {
            const { token } = getState().auth
            await updateMealRequest(token, data)
            return dispatch(getMeal())
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
