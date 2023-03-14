import axiosInstance from '../config/axiosInstence'

export const postOrderRequest = (price, token) => {
    return axiosInstance.post('/orders', price, {
        headers: { Authorization: token },
    })
}

export const getOrderRequest = (token) => {
    return axiosInstance.get('/orders', {
        headers: { Authorization: token },
    })
}

export const getAllRequest = (token) => {
    return axiosInstance.get('/orders/all', {
        headers: { Authorization: token },
    })
}
