// @flow
import * as React from 'react';
import styles from './style.less'
import PageContainer from "@/components/PageContainer";
import {Radio, Space, Button, notification} from 'antd';
import Geometry from "@/components/Geometry";
import {useState} from "react";
import {CheckCircleOutlined,CloseCircleOutlined} from '@ant-design/icons'

type Props = {};
const Practise = (props: Props) => {
    const [checked, setChecked] = useState<string | number | null>(null)
    const options = [
        {
            label: 'A',
            value: 'A',
            desc: '3/4'
        },
        {
            label: 'B',
            value: 'B',
            desc: '3/7'
        },
        {
            label: 'C',
            value: 'C',
            desc: '2/5'
        },
        {
            label: 'D',
            value: 'D',
            desc: '以上都有可能'
        },
    ]

    const handleChange = (e: any) => {
        setChecked(e?.target?.value)
    }

    const handleSubmit = () => {
        if (!checked) {
            notification.error({
                message: "选择不能为空"
            })
        }
        //  todo  提交操作
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
                            <div className="main__title">M到截面的距离</div>
                            <div
                                className="main__desc">如图，正方体的棱长为1，C、D分别是两条棱的中点，A、B、M是顶点，那么点M到截面的距离是?
                            </div>
                            <div className="main__selector">
                                <Radio.Group onChange={handleChange}>
                                    <Space direction="vertical" size={30}>
                                        {
                                            options.map((item) => (<Radio value={item.value} key={item.value}>
                                                <div
                                                    className={item.value === checked ? "selector_item selector_item--success" : "selector_item "}>
                                                    <div className="selector_item__option">{item.label}</div>
                                                    <div className="selector_item__desc">{item.desc}</div>
                                                </div>
                                            </Radio>))
                                        }
                                    </Space>
                                </Radio.Group>
                            </div>
                            <div className="main__btn">
                                <Button type="primary" onClick={handleSubmit}>确定</Button>
                            </div>
                            <div className="main__analysis">
                                <div className="analysis_result">
                                    <Space size={30}>
                                        <span>你的答案：A</span>
                                        <span>正确答案：A</span>
                                        <span>结果：<CheckCircleOutlined style={{color:'#67c23a',fontSize:20}}/><CloseCircleOutlined style={{color:'#f56c6c',fontSize:20}}/></span>
                                    </Space>
                                </div>
                                <div className="analysis_main">
                                    题目的简易解析，主要是老师讲解，立体几何解析需要作图，相对比较麻烦。
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default Practise
