/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from '@mui/material'
import { getOrders } from '../../store/order/ordersThunk'

const OrderUser = () => {
    const dispatch = useDispatch()
    const items = useSelector((state) => state.order.items)

    useEffect(() => {
        dispatch(getOrders())
    }, [])
    return (
        <StyleContainer>
            {items.map((item) =>
                item.items.map((meals) => (
                    <MealContainer key={meals._id}>
                        <h4>{meals.title}</h4>
                        <h4>${meals.price}</h4>
                        <span>X{meals.amount}</span>
                    </MealContainer>
                ))
            )}
        </StyleContainer>
    )
}

export default OrderUser

const StyleContainer = styled('div')(() => ({
    width: '50rem',
    display: 'grid',
    gap: '1rem',
    backgroundColor: '#e7d154',
    color: '#867e7e',
    borderRadius: '11px',
    margin: '8rem 0 0 16rem',
}))

const MealContainer = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottom: '1px solid #222',
}))
