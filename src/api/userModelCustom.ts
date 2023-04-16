import {request} from "umi";


const addUserModelCustom = (data:any)=>{
    return request('/userModelCustom/add',{
        method:'post',
        data
    })
}

const getUserModelCustom = (params:{userId:string})=>{
    return request('/userModelCustom/getUserModelCustom',{
        method:'get',
        params
    })
}

const getModelCustomDetail = (params:{id:string})=>{
    return request('/userModelCustom/getDetail',{
        method:'get',
        params
    })
}

const deleteModelCustom = (data:{id:string})=>{
    return request('/userModelCustom/delete',{
        method:'delete',
        data
    })
}

const updateUserModel = (data:any)=>{
    return request('/userModelCustom/update',{
        method:'put',
        data
    })
}

export default {
    addUserModelCustom,
    getUserModelCustom,
    getModelCustomDetail,
    updateUserModel,
    deleteModelCustom,
}
