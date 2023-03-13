import React from 'react'
import { AppBar, Button, Grid, Toolbar } from '@mui/material'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { styled } from '@mui/system'
import { signOut } from '../../store/auth/auth.thunk'

const menus = [
    {
        path: 'meals',
        title: 'Meals',
    },
    {
        path: 'orders',
        title: 'Orders',
    },
]

const AdminHeader = () => {
    const dispath = useDispatch()

    const signOutHandler = () => {
        dispath(signOut())
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <StyleBar>
                    <StyledGrid>
                        {menus.map((item) => (
                            <StyledNavLink key={item.path} to={item.path}>
                                {item.title}
                            </StyledNavLink>
                        ))}
                    </StyledGrid>
                    <Button color="inherit" onClick={signOutHandler}>
                        SignOut
                    </Button>
                </StyleBar>
            </Toolbar>
        </AppBar>
    )
}

export default AdminHeader

const StyleBar = styled(Grid)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
}))

const StyledGrid = styled(Grid)(() => ({
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
}))

const StyledNavLink = styled(NavLink)(() => ({
    textDecoration: 'none',
    color: '#fff',
    fontSize: '18px',

    '&:hover': {
        color: '#dacc0d',
    },

    '&.active': {
        color: '#0d738d',
    },
}))
