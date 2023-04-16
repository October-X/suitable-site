import {request} from 'umi'

const addExample = (data:any)=>{
    return request('/example/add',{
        method:'post',
        data
    })
}

const updateExample = (data:any)=>{
    return request('/example/update',{
        method:'put',
        data
    })
}

const deleteExample = (data:any)=>{
    return request('/example/delete',{
        method:'delete',
        data
    })
}

const getExampleList = (params:any)=>{
    return request('/example/list',{
        method:'get',
        params
    })
}

const getPractiseList = (params:any)=>{
    return request('/example/getPractiseList',{
        method:'get',
        params
    })
}

const getExampleDetail = (params:{id:string})=>{
    return request('/example/detail',{
        method:'get',
        params
    })
}

const publishExample = (data:{teacherId:string,id:string})=>{
    return request('/example/publish',{
        method:'post',
        data
    })
}

const withdrawExample = (data:{teacherId:string,id:string})=>{
    return request('/example/withdraw',{
        method:'delete',
        data
    })
}

export default {
    addExample,
    getExampleList,
    getExampleDetail,
    updateExample,
    getPractiseList,
    publishExample,
    withdrawExample,
    deleteExample,
}
