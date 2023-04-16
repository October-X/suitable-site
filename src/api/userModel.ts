import {request} from "umi";


const addUserModel = (data:any)=>{
    return request('/userModel/add',{
        method:'post',
        data
    })
}

const deleteUserModel = (data:{id:string})=>{
    return request('/userModel/delete',{
        method:'delete',
        data
    })
}

const updateUserModel = (data:any)=>{
    return request('/userModel/update',{
        method:'put',
        data
    })
}

const getModel = (params:{userId:string})=>{
    return request('/userModel/getUserModel',{
        method:'get',
        params
    })
}

const getModelDetail = (params:{id:string})=>{
    return request('/userModel/getDetail',{
        method:'get',
        params
    })
}

const getUserModelOption = (params:{userId:string})=>{
    return request('/userModel/getUserModelOption',{
        method:'get',
        params
    })
}

export default {
    addUserModel,
    updateUserModel,
    getModel,
    getModelDetail,
    deleteUserModel,
    getUserModelOption
}
