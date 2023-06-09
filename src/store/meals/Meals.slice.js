import { createSlice } from '@reduxjs/toolkit'
import { getMeal } from './mealsThunk'

export const mealsActionTypes = {
    GET_MEALS_SUCCESS: 'GET_MEALS_SUCCESS',
    GET_MEALS_STARTED: 'GET_MEALS_STARTED',
    GET_MEALS_FAILED: 'GET_MEALS_FAILED',
}

const initialState = {
    meals: [],
    isLoading: false,
    error: '',
}

export const mealsSlice = createSlice({
    name: 'meals',
    initialState,
    reducers: {
        getMealsStarted(state) {
            state.isLoading = true
        },
        getMealsSuccess(state, action) {
            state.meals = action.payload
            state.isLoading = false
            state.error = ''
        },
        getMealsFailed(state, action) {
            state.isLoading = false
            state.error = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getMeal.fulfilled, (state, action) => {
            state.meals = action.payload
            state.isLoading = false
            state.error = ''
        })
        builder.addCase(getMeal.pending, (state, action) => {
            state.isLoading = true
            state.error = action.payload
        })
        builder.addCase(getMeal.rejected, (state, action) => {
            state.meals = action.payload
            state.isLoading = false
            state.error = action.payload
        })
    },
})

export const mealsActions = mealsSlice.actions
