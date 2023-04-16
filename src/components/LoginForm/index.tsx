import React, {useState} from 'react';
import styles from './style.less';
import {Button, Checkbox, Form, Input, message, notification} from 'antd';
import {history} from 'umi';
import Service from '@/api/index'
import {useSelector} from "react-redux";
import global from '@/global'

export default function Login() {
    const [messageApi, contextHolder] = message.useMessage();
    const [type, setType] = useState<string>('login');
    const [loginForm] = Form.useForm();
    const [registerForm] = Form.useForm();
    const count = global.store.count;
    // const {count} = useSelector((state)=>state.userInfo)

    const verifyLoginName = () => ({
        validator(_: any, value: string) {
            const reg = /^[a-zA-Z0-9_@.]*$/
            if ((value.length < 6 && value.length > 15) || !reg.test(value)) {
                return Promise.reject(
                    new Error('请输入正确的用户名'),
                );
            }
            return Promise.resolve();
        },
    })

    const verifyUsername = () => ({
        async validator(_: any, value: string) {
            const reg = /^[a-zA-Z0-9_@.]*$/
            const result = await Service.user.checkUsername({
                username: value
            })
            if ((value.length>=5&&value.length<=15)&&result?.code) {
                return Promise.reject(
                    new Error('用户名已被使用'),
                );
            }
            if (!reg.test(value)) {
                return Promise.reject(
                    new Error('不能使用特殊字符'),
                );
            }
            return Promise.resolve();
        },
    })

    const verifyPassword = () => ({
        validator(_: any, value: string) {
            const reg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!.]).+$/
            if ((value.length>=8&&value.length<=20)&&!reg.test(value)) {
                return Promise.reject(
                    new Error('密码必须包含字母、数字和特殊字符'),
                );
            }
            return Promise.resolve();
        },
    })

    // @ts-ignore
    const verifyConfirmPassword = ({getFieldValue}) => ({
        validator(_: any, value: string) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject(
                new Error('两次输入密码不相同'),
            );
        },
    });

    const handleLogin = () => {
        // @ts-ignore
        loginForm?.validateFields().then((values: any) => {
            Service.user.login({
                username: values.username,
                password: values.password
            }).then((res: any) => {
                // 登录表单的提交
                if (!res.code) {
                    const token = res.data.token
                    localStorage.setItem('token', token)
                    Service.user.getUserInfo({token}).then(res => {
                        global.setStore("userInfo", res.data)
                        history.replace('/home')
                        notification.success({
                            message: res.data.msg || "欢迎使用"
                        })
                    })
                } else {
                    messageApi.error(res.msg)
                }
            }).catch(error=>{
                messageApi.error(error)
            })
        })
    };

    const handleRegister = ()=>{
        registerForm?.validateFields().then((values:any)=>{
            Service.user.register({
                username: values.username,
                password: values.password
            }).then((res: any) => {
                // 登录表单的提交
                if (!res.code) {
                    messageApi.success(res.msg)
                    setType("login")
                } else {
                    messageApi.error(res.msg)
                }
            })
        })
    }
    // @ts-ignore
    return (
        <div className={styles.root}>
            {contextHolder}
            <div className="login-form login__right">
                <div className="login-form__title">
                    <div
                        className={
                            type === 'login' ? 'title_item title_item--login' : 'title_item '
                        }
                        onClick={() => setType('login')}
                    >
                        登录
                    </div>
                    <div
                        className={
                            type === 'register'
                                ? 'title_item title_item--register'
                                : 'title_item '
                        }
                        onClick={() => setType('register')}
                    >
                        注册
                    </div>
                    <div className="title_bar"></div>
                </div>
                <div className="login-form__main">
                    {type === 'login' ? (
                        <Form autoComplete="off" key={1} form={loginForm}>
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入账号',
                                    },
                                    verifyLoginName
                                ]}
                            >
                                <Input placeholder="请输入账号" allowClear/>
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {required: true, message: '请输入密码'},
                                ]}
                            >
                                <Input.Password placeholder="请输入密码" allowClear/>
                            </Form.Item>
                            <Form.Item
                            >
                                <div className="item__verification">
                                    <Form.Item
                                        name="verificationCode"
                                        rules={[
                                            {
                                                required: true, message: '请输入验证码',
                                            },
                                        ]}
                                        noStyle
                                    >
                                        <Input placeholder="请输入验证码" allowClear/>
                                    </Form.Item>
                                    <div className="item__verification_img"></div>
                                </div>
                            </Form.Item>
                            <Form.Item name="remember" valuePropName="checked">
                                <Checkbox>记住我</Checkbox>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" style={{width: '100%'}} onClick={handleLogin} htmlType="submit">
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    ) : (
                        <Form autoComplete="off" key={2} form={registerForm}>
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        min: 5, max: 15,
                                        message: '请输入长度为5-15的字符'
                                    },
                                    verifyUsername
                                ]}
                                hasFeedback
                            >
                                <Input placeholder="请输入账号" allowClear/>
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true, min: 8, max: 20,
                                        message: '请输入长度为8-20的字符'
                                    },
                                    verifyPassword
                                ]}
                                hasFeedback
                            >
                                <Input.Password placeholder="请输入密码" allowClear/>
                            </Form.Item>
                            <Form.Item
                                name="confirmPassword"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入确认密码',
                                    },
                                    verifyConfirmPassword,
                                ]}
                                hasFeedback
                            >
                                <Input.Password placeholder="请输入确认密码" allowClear/>
                            </Form.Item>
                            <Form.Item name="agree" valuePropName="checked">
                                <Checkbox>阅读并同意隐私政策</Checkbox>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" style={{width: '100%'}} onClick={handleRegister}>
                                    注册
                                </Button>
                            </Form.Item>
                        </Form>
                    )}
                </div>
            </div>
        </div>
    );
}
