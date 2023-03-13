/* eslint-disable no-underscore-dangle */
import { useFormik } from 'formik'
import { styled } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import Button from '../../components/UI/Button'
import { deleteMeal, getMeal, postMeal } from '../../store/meals/mealsThunk'
import { uiActions } from '../../store/UI/ui.slice'
import MealForm from './MealForm'
import MealItem from './MealItem'
import UpdateMealForm from './UpdateMealForm'

const Meals = () => {
    const dispath = useDispatch()
    const { meals } = useSelector((state) => state.meals)
    const [isEdit, setEdit] = useState(false)
    const [editingMealId, setEditingMealId] = useState(null)
    const [mealModal, setMealModal] = useSearchParams()

    useEffect(() => {
        dispath(getMeal())
    }, [])

    const openModalHandler = () => {
        mealModal.set('modal', 'addMeals')
        setMealModal(mealModal)
    }

    const closeModalHandler = () => {
        mealModal.delete('modal')
        setMealModal(mealModal)
    }

    const submitHandler = async ({ title, description, price }) => {
        try {
            const newMeal = {
                title,
                description,
                price,
            }
            await dispath(postMeal(newMeal)).unwrap()
            dispath(
                uiActions.showSnackbar({
                    isOpen: true,
                    severity: 'success',
                    message: 'oreder has been added successfully.',
                })
            )
        } catch (error) {
            dispath(
                uiActions.showSnackbar({
                    isOpen: true,
                    severity: 'error',
                    message: 'Failed',
                })
            )
        } finally {
            closeModalHandler()
        }
    }

    const removeHandler = (id) => {
        dispath(deleteMeal(id))
    }
    const editHandler = (id) => {
        setEditingMealId(id)
        setEdit(true)
    }

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            price: '',
        },
        onSubmit: submitHandler,
    })
    const { values, handleChange, handleSubmit } = formik

    return (
        <Container>
            {mealModal.has('modal') && (
                <MealForm
                    open={mealModal}
                    values={values}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    onClose={closeModalHandler}
                />
            )}
            <div>
                <h1>Meals</h1>
                {meals.map((item) => (
                    <Meal key={item._id}>
                        {editingMealId === item._id ? (
                            <UpdateMealForm
                                item={item}
                                setEdit={setEdit}
                                onClose={closeModalHandler}
                                onOpen={isEdit}
                            />
                        ) : (
                            <MealItem
                                item={item}
                                removeHandler={removeHandler}
                                editHandler={() => editHandler(item._id)}
                            />
                        )}
                    </Meal>
                ))}
                <StyleButton onClick={openModalHandler}>Add Meal</StyleButton>
            </div>
        </Container>
    )
}

export default Meals

const Container = styled('div')(() => ({
    background: '#fff',
    width: '55rem',
    margin: 'auto ',
    padding: '1rem',
    marginTop: '2rem',
    borderRadius: '8px',
    'h1 ': {
        textAlign: 'center',
    },
}))

const Meal = styled('div')(() => ({
    border: '1px solid #928f8f',
    borderRadius: '9px',
    marginBottom: '1rem',
    width: '62vw',
}))

const StyleButton = styled(Button)`
    margin-left: 23rem;
`
