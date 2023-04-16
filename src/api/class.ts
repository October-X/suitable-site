import {request} from 'umi'

const addClass = (data:{teacherId:string,name:string,classBg:string})=>{
    return request('/class/addClass',{
        method:'post',
        data
    })
}

const getClass = (params:{teacherId:string})=>{
    return request('/class/getClass',{
        method:'get',
        params
    })
}

const joinClass = (data:{studentId:string,classCode:string})=>{
    return request('/class/joinClass',{
        method:'post',
        data
    })
}

const getStudentClassInfo = (params:{studentId:string})=>{
    return request('/class/getStudentClassInfo',{
        method:'get',
        params
    })
}

const dropClass = (data:{studentId:string,classId:string})=>{
    return request('/class/dropClass',{
        method:'post',
        data
    })
}

const deleteClass = (data:{teacherId:string,id:string})=>{
    return request('/class/deleteClass',{
        method:'delete',
        data
    })
}

const getStudents = (params:any)=>{
    return request('/class/getStudents',{
        method:'get',
        params
    })
}

export default {
    addClass,
    getClass,
    joinClass,
    getStudentClassInfo,
    dropClass,
    deleteClass,
    getStudents
}
