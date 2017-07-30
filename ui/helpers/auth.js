import {post} from './request'

let token = false

export const check = () => token

export const login = (data) => {
    return post('users/login', {
        headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(response => {
        token = response.token
        return true
    })
    .catch(err => {
        token = false
    })
}

export const logout = () => {

}

export default {check, login, logout}
