import {request} from 'umi'

const checkUsername = (params: { username: string }) => {
    console.log(123123123)
    return request('/user/check_username',{
        method: 'get',
        params
    })
}

const login = (data: { username: string, password: string }) => {
    return request('/user/login',{
        method: 'post',
        data
    })
}

const register = (data: { username: string, password: string }) => {
    return request('/user/register',{
        method: 'post',
        data
    })
}

const getUserInfo = (params: { token: string }) => {
    return request('/user/info',{
        method: 'get',
        params
    })
}

const modifyUserInfo = (id:string,data: {nickname?:string,password?:string,avatar?:string,}) => {
    return request(`/user/${id}`,{
        method: 'put',
        data
    })
}

const getUsers = (params:any)=>{
    return request('/user/list',{
        method:'get',
        params
    })
}

export default {
    login,
    checkUsername,
    register,
    getUserInfo,
    modifyUserInfo,
    getUsers
}
