/* eslint-disable no-underscore-dangle */
import React from 'react'
import styled from 'styled-components'
import Button from '../../components/UI/Button'

const MealItem = ({ item, removeHandler, editHandler }) => {
    return (
        <Container>
            <h3>{item.title}</h3>
            <h4>{item.description}</h4>
            <h4>${item.price}</h4>
            <StyleBtn>
                <Button onClick={() => removeHandler(item._id)}>Delete</Button>
                <Button onClick={editHandler}>Edit</Button>
            </StyleBtn>
        </Container>
    )
}

export default MealItem

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 1rem;
`
const StyleBtn = styled.div`
    display: flex;
    gap: 1rem;
`
