import React from 'react'
import { Box, Modal, TextField } from '@mui/material'
import { styled } from '@mui/system'
import Button from '../../components/UI/Button'

const MealForm = ({ open, values, handleChange, handleSubmit, onClose }) => {
    return (
        <Modal open={open}>
            <Container>
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
                    <Button type="submit">Add</Button>
                    <Button onClick={onClose}>Close</Button>
                </Form>
            </Container>
        </Modal>
    )
}

export default MealForm

const Container = styled(Box)(() => ({
    position: 'absolute',
    top: '20%',
    left: '32%',
    width: '30rem',
}))

const Form = styled('form')(() => ({
    display: 'grid',
    gap: '20px',
    width: '100%',
    borderRadius: '9px',
    padding: '1rem',
    background: '#fff',
    // width: '30rem',
}))
