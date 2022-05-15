import BaseService from './BaseService'

const API_END_POINT = 'auth/'

const AuthService = {
    login: (data = {}) => {
        return BaseService.post(`/users/authenticate`, data)
    },
    register: (data = {}) => {
        return BaseService.post(`${API_END_POINT}register`, data)
    },
    changePass: (data = {}) => {
        return BaseService.post(`${API_END_POINT}change-password`, data)
    },
}

export default AuthService
