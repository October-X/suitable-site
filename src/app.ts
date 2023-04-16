// 运行时配置
/* eslint-disable guard-for-in */

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate

// import logo from './assets/logo.png'
// export async function getInitialState(): Promise<{ name: string }> {
//   return { name: '@umijs/max' };
// }

// export const layout = () => {
//   return {
//     // logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
//     menu: {
//       locale: false,
//     },
//   };
// };
import {message, notification} from 'antd'
import Service from "@/api";
import global from "@/global";
import {history} from "umi";


//初始化主题
const defaultTheme = {
    '--background-color': '#f4f7ff',
    '--theme-color': '#fd8b35',
    '--font-color': '#97a09b',
    '--nav-active-color': '#0b2021',
    '--box-background-color': '#ffffff',
    '--main-shadow-color': '#eeeeee',
};
const changeTheme = (datas: object) => {
    for (const key in datas) {
        //@ts-ignore
        document.documentElement.style.setProperty(key, datas[key]);
    }
};

let theme = localStorage.getItem('theme');
if (theme) {
    changeTheme(theme ? JSON.parse(theme) : defaultTheme);
}


// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState() {
    const token = localStorage.getItem('token');

    if (location.pathname === '/login') {
        // 强行跳登录页
        // 判断是否有有效的 token
        if (token) {
            // 不仅有 token，而且 token 是有效的
            // 不允许你去 login
            message.warning('请先退出后在登录');
            location.href = "/home";
        }
    } else {
        // 强行要跳内部页面
        if (!token) {
            history.replace('/login');
            message.warning('请先登录');
            return
        }
        Service.user.getUserInfo({token}).then(res => {
            if(!res.code){
                global.setStore("userInfo", res.data)
                console.log(global.getStore("userInfo"))
                if(location.pathname === '/'){
                    history.replace('/home')
                }
            }else{
                message.error('token无效,请重新登录');
                localStorage.removeItem("token")
                history.replace('/login');
            }
        })
    }
}


//配置请求拦截器

import type { RequestConfig } from 'umi';

export const request: RequestConfig = {
    timeout: 1000,
    baseURL:'http://localhost:9999',
    // other axios options you want
    errorConfig: {
        errorHandler(error){
            message.error(error.message);
        },
        errorThrower(error){
            throw error;
        }
    },
    requestInterceptors: [
        (url, options) => {
            // 获取 token
            const token = localStorage.getItem('token');
            // 如果有 token，则在请求头中添加 Authorization 字段
            if (token) {
                options.headers = {
                    ...options.headers,
                    Authorization: `${token}`,
                };
            }
            return { url, options };
        },
    ],
    responseInterceptors: [
        //@ts-ignore
        (response)=>{
        if(response.status===200){
            if(response.data.code===20004){
                //说明token无效
                notification.error({
                    message:response?.data?.msg||"jwt无效，请重新登录！"
                })
                history.replace('/login');
            }
            return response;
        }
            return response;
        }
    ]
};
