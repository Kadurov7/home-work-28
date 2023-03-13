/* eslint-disable no-underscore-dangle */
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { styled, TextField } from '@mui/material'
import Button from '../../components/UI/Button'

const UpdateMealForm = ({ item, setEdit }) => {
    const dispatch = useDispatch()

    const updateHandler = ({ title, description, price }) => {
        const updateMeal = {
            title,
            description,
            price,
        }

        const data = {
            id: item._id,
            editData: updateMeal,
        }
        dispatch(updateMeal(data))
        setEdit(false)
    }

    const updateFormik = useFormik({
        initialValues: {
            title: item.title,
            description: item.description,
            price: item.price,
        },
        onSubmit: updateHandler,
    })
    const { values, handleChange, handleSubmit } = updateFormik

    return (
        <Form onSubmit={handleSubmit}>
            <TextField
                value={values.title}
                onChange={handleChange}
                name="title"
                label="Name"
                type="text"
            />

            <TextField
                value={values.description}
                onChange={handleChange}
                name="description"
                label="Description"
                type="text"
            />

            <TextField
                value={values.price}
                onChange={handleChange}
                name="price"
                label="Price"
                type="number"
            />
            <Button type="submit">Save</Button>
            <Button onClick={() => setEdit(false)}>Cancel</Button>
        </Form>
    )
}

export default UpdateMealForm

const Form = styled('form')(() => ({
    display: 'grid',
    gap: '20px',
    width: '50%',
}))
