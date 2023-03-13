import axiosInstance from '../config/axiosInstence'

export const signUpRequest = (data) => {
    return axiosInstance.post('/auth/register', data)
}

export const signInRequest = (data) => {
    return axiosInstance.post('/auth/login', data)
}
