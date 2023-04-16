import React, {useEffect, useImperativeHandle} from 'react';
import styles from './style.less'
import {Modal, Form, Input} from "antd";
import {useState} from "react";

const AccountEditor = React.forwardRef((props:any, ref) => {
    const {username,onOk} = props
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    // @ts-ignore
    const verifyPassword = ({getFieldValue}) => ({
        validator(_: any, value: string) {
            if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve();
            }
            return Promise.reject(
                new Error('两次输入密码不相同'),
            );
        },
    });

    const handleOk = () => {
        //todo 验证表单，请求接口提交
        form.validateFields().then((res) => {
            console.log(res)
            onOk({
                oldPassword:res.oldPassword,
                newPassword:res.newPassword
            })
        })
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useImperativeHandle(ref, () => ({
        showModal:()=> {
            setIsModalOpen((true))
            form.setFieldsValue({
                username: username
            })
        },
        closeModal:handleCancel
    }))

    return (
        <Modal title="设置信息" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <div className={styles.root}>
                <Form form={form}>
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
                        <Input placeholder="请输入账号" allowClear disabled/>
                    </Form.Item>
                    <Form.Item
                        name="oldPassword"
                        rules={[
                            {required: true, message: '请输入旧密码'},
                        ]}
                        hasFeedback
                    >
                        <Input.Password placeholder="请输入旧密码" allowClear/>
                    </Form.Item>
                    <Form.Item
                        name="newPassword"
                        rules={[
                            {required: true, message: '请输入密码'},
                        ]}
                        hasFeedback
                    >
                        <Input.Password placeholder="请输入密码" allowClear/>
                    </Form.Item>
                    <Form.Item
                        name="confirmNewPassword"
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
                </Form>
            </div>
        </Modal>
    );
});

export default AccountEditor
