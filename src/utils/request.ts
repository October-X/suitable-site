import axios from 'axios';
import {message,notification} from 'antd'
import {history} from "umi";

// 创建一个axios实例
const service = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 5000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
    config => {
        // 在请求发送之前可以做一些处理，比如添加token
        if (localStorage.getItem('token')) {
            config.headers['Authorization'] = localStorage.getItem('token');
        }
        return config;
    },
    error => {
        // 请求错误处理
        console.log(error);
        Promise.reject(error);
    }
);

// response拦截器
service.interceptors.response.use(
    response => {
        if(response.data.code===20004){
            //说明token无效
            history.replace('/login');
        }
        // 对响应数据做处理
        return response.data;
    },
    error => {
        // 响应错误处理
        console.log('err' + error);
        notification.error({
            message:error
        })
        message.error(error);
        return Promise.reject(error);
    }
);

export default service;
