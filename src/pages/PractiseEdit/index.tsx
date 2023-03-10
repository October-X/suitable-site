// @flow
import * as React from 'react';
import styles from './style.less'
import PageContainer from "@/components/PageContainer";
import {Radio, Space, Button, notification, Form, Input, Checkbox, Select} from 'antd';
import Geometry from "@/components/Geometry";
import {useState} from "react";
import {CheckCircleOutlined} from '@ant-design/icons'

type Props = {};
const Practise = (props: Props) => {
    const [form] = Form.useForm()
    const [options, setOptions] = useState([
        {
            label: 'A',
            value: 'A',
        },
        {
            label: 'B',
            value: 'B',
        },
    ])

    const handleAdd = () => {
        const count = options.length
        console.log(count)
        const newOption = String.fromCharCode(65 + count)
        setOptions([
            ...options,
            {
                label: newOption,
                value: newOption
            }
        ])
    }

    const handleReduce = () => {
        const newOptions = options.slice(0, -1)
        setOptions([
            ...newOptions
        ])
    }

    const handleSubmit = () => {
        form.validateFields().then((res) => {
            if (Object.values(res).reduce((a, item) => item && a, true)) {
                //  todo  提交操作
                console.log(res)
            } else {
                notification.error({
                    message: '请输入完整'
                })
            }
        }).catch((err) => {
            notification.error({
                message: err
            })
        })
    }

    return (
        // @ts-ignore
        <PageContainer>
            <div className={styles.root}>
                <div className="practise">
                    <div className="practise__left">
                        <Geometry/>
                    </div>
                    <div className="practise__right">
                        <div className="main">
                            <Form form={form}>
                                <Form.Item
                                    name="modelId"
                                >
                                    <Select placeholder="请选择模型" options={[
                                        {label: '无模型', value: -1},
                                        {label: '模型1', value: 1},
                                        {label: '模型2', value: 2},
                                        {label: '模型3', value: 3},
                                        {label: '模型4', value: 4}]}
                                    />
                                </Form.Item>
                                <div className="main__title">
                                    <Form.Item
                                        name="title"
                                    >
                                        <Input allowClear placeholder="请输入标题"/>
                                    </Form.Item>
                                </div>
                                <div className="main__desc">
                                    <Form.Item
                                        name="desc"
                                    >
                                        <Input.TextArea allowClear placeholder="请输入题目"/>
                                    </Form.Item>
                                </div>
                                <div className="main__selector">
                                    <Radio.Group>
                                        <Space direction="vertical" size={30}>
                                            {
                                                options.map((item) => (
                                                    <div className="selector_item" key={item.value}>
                                                        <div className="selector_item__option">{item.label}</div>
                                                        <Form.Item
                                                            name={item.label}
                                                        >
                                                            <Input className="selector_item__desc" allowClear/>
                                                        </Form.Item>
                                                    </div>
                                                ))
                                            }
                                        </Space>
                                    </Radio.Group>
                                </div>
                                <div className="main__analysis">
                                    <div className="analysis_result">
                                        <Space size={20}>
                                            <CheckCircleOutlined style={{color: '#67c23a', fontSize: 20}}/>
                                            <span>
                                            正确答案：
                                        </span>
                                        </Space>
                                        <Space direction="vertical" size={20}>
                                            <div style={{marginTop: 20}}>
                                                <Form.Item name="answer">
                                                    <Checkbox.Group options={options}/>
                                                </Form.Item>
                                            </div>
                                        </Space>
                                    </div>
                                </div>
                            </Form>
                            <div className="main__btn">
                                <Space size={20}>
                                    <Button type="primary" onClick={handleAdd}>添加</Button>
                                    <Button type="primary" onClick={handleReduce}
                                            disabled={options.length === 2}>去除</Button>
                                    <Button type="primary" onClick={handleSubmit}>确定</Button>

                                </Space>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default Practise
