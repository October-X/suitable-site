import {request} from "umi";

const doPractice = (data:any)=>{
    return request('/record/doPractice',{
        method:'post',
        data
    })
}

const countRecord = (params:{teacherId:string,exampleId:string})=>{
    return request('/record/countRecord',{
        method:'get',
        params
    })
}

//@ts-ignore
export default {
    doPractice,
    countRecord,
};
