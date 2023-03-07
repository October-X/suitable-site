import React, {useState} from 'react';
import styles from './style.less';
import {Button, Checkbox, Form, Input} from 'antd';
import {history} from 'umi';

export default function Login() {
    const [type, setType] = useState<string>('login');

    // @ts-ignore
    const verifyPassword = ({getFieldValue}) => ({
        validator(_: any, value: string) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject(
                new Error('两次输入密码不相同'),
            );
        },
    });
    const onFinish = (values: any) => {
        console.log('Success:', values);
        if (values.confirmPassword) {
            // 说明为注册表单的提交
        }
        // 登录表单的提交
        localStorage.setItem('login', '1')
        history.replace('/home')
    };
    return (
        <div className={styles.root}>
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
                        <Form onFinish={onFinish} autoComplete="off" key={1}>
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入账号',
                                    },
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
                                name="verificationCode"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入验证码',
                                    },
                                ]}
                            >
                                <div className="item__verigication">
                                    <Input placeholder="请输入验证码" allowClear/>
                                    <div className="item__verigication_img"></div>
                                </div>
                            </Form.Item>
                            <Form.Item name="remember" valuePropName="checked">
                                <Checkbox>记住我</Checkbox>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    ) : (
                        <Form onFinish={onFinish} autoComplete="off" key={2}>
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入账号',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input placeholder="请输入账号" allowClear/>
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {required: true, message: '请输入密码'},
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
                                    verifyPassword,
                                ]}
                                hasFeedback
                            >
                                <Input.Password placeholder="请输入确认密码" allowClear/>
                            </Form.Item>
                            <Form.Item name="agree" valuePropName="checked">
                                <Checkbox>阅读并同意隐私政策</Checkbox>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                                    下一步
                                </Button>
                            </Form.Item>
                        </Form>
                    )}
                </div>
            </div>
        </div>
    );
}
