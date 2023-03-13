import { Grid, TextField, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/UI/Button'
import UserRoles from '../lib/constants/common'
import signUp from '../store/auth/auth.thunk'

const SignUp = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState()

    const submitHandler = async ({ email, name, password }) => {
        const data = {
            email,
            name,
            password,
            role: UserRoles.ADMIN,
        }
        await dispatch(signUp(data))
            .unwrap()
            .then(() => navigate('/'))
            .catch((e) => setError(e.response.data.message))
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        onSubmit: submitHandler,
    })

    const { values, handleChange, handleSubmit } = formik

    const isNameValid = () => {
        return (
            values.name.length === 0 ||
            (values.name.length > 0 && values.name.length > 3)
        )
    }
    const isEmailValid = () => {
        return (
            values.email.length === 0 ||
            (values.email.length > 0 && values.email.includes('@'))
        )
    }
    const ispasswordValid = () => {
        return (
            values.password.length === 0 ||
            (values.password.length > 0 && values.password >= 6)
        )
    }
    const isConfirmPasswordValid = () => {
        return values.confirmPassword === values.password
    }
    return (
        <MainGrid>
            <GridContainer>
                <form onSubmit={handleSubmit}>
                    <FormGrid>
                        <TextField
                            value={values.name}
                            error={!isNameValid()}
                            onChange={handleChange}
                            label="Name"
                            name="name"
                            type="text"
                        />
                        <TextField
                            value={values.email}
                            error={!isEmailValid()}
                            onChange={handleChange}
                            name="email"
                            label="Email"
                        />
                        <TextField
                            value={values.password}
                            error={!ispasswordValid()}
                            onChange={handleChange}
                            name="password"
                            label="Password"
                        />
                        <TextField
                            value={values.confirmPassword}
                            error={!isConfirmPasswordValid()}
                            onChange={handleChange}
                            name="confirmPassword"
                            label="Confirm Password"
                        />
                        {error && <Error>{error}</Error>}
                        <Button type="submit">Sign up</Button>
                        <Link to="/signin">Have an account</Link>
                    </FormGrid>
                </form>
            </GridContainer>
        </MainGrid>
    )
}

export default SignUp

const MainGrid = styled(Grid)(() => ({
    display: 'flex',
    justifyContent: 'center',
    marginTop: '200px',
}))

const GridContainer = styled(Grid)(() => ({
    background: '#f57927',
    borderRadius: '9px',
    width: '500px',
    padding: '20px',
}))

const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
}))

const Error = styled(Typography)(({ theme }) => ({
    color: theme.palette.error.main,
}))
