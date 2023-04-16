// @flow
import * as React from 'react';
import styles from './style.less'
import PageContainer from "@/components/PageContainer";
import {Radio, Space, Button, notification, Modal, message} from 'antd';
import {useEffect, useState} from "react";
import {CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons'
import Box from "@/components/Geometry";
import {useLocation} from "@@/exports";
import {useGlobal} from "@/global";
import Service from "@/api";
import {compareTimeWithNow} from '@/utils/common'
import ReactMarkdown from "react-markdown";

type Props = {};
const Practise = (props: Props) => {
    const location = useLocation()
    const id:string = location.pathname.split('/').pop() as string
    const type = location?.state?.data;
    const doingPractice = location?.state?.doingPractice||false;
    const [size, setSize] = useState({
        depth: 6,
        width: 6,
        height: 6
    });
    const [analysis,setAnalysis] = useState('')
    const [userInfo] = useGlobal("userInfo")
    const [rotate, setRotate] = useState(false)
    const [color, setColor] = useState('#58b938')
    const [points, setPoints] = useState([])
    const [lines, setLines] = useState([])
    const [practiseInfo,setPractiseInfo] = useState({})
    const [checked, setChecked] = useState<string | number | null>(null)
    const [options,setOption] =useState([])
    const [isAnalysisDrawerOpen,setIsAnalysisDrawerOpen] = useState(false)

    const handleChange = (e: any) => {
        setChecked(e?.target?.value)
    }

    const handleSubmit = () => {
        if (!checked) {
            notification.error({
                message: "选择不能为空"
            })
        }
        Service.userRecord.doPractice({
            exampleId:id,
            studentId:userInfo.id,
            userAnswer:JSON.stringify([checked]),
        }).then(res=>{
            if(!res.code){
                message.success(res.msg)
            }else{
                message.error(res.msg)
            }
        })
    }

    useEffect(()=>{
        Service.example.getExampleDetail({id}).then(res=>{
            if(!res.code){
                const option = JSON.parse(res.data.option)
                setOption(option)
                setAnalysis(res.data.analysis||"暂无解析")
                setPractiseInfo({
                    ...res.data,
                    answer:JSON.parse(res.data.answer).join(' ')
                })
                Service.model.getModelDetail({id:res.data.modelId}).then((res)=>{
                    if(!res.code){
                        const {lines,size,points,color} = res.data
                        setLines(JSON.parse(lines))
                        setSize(JSON.parse(size))
                        setPoints(JSON.parse(points))
                        setColor(color)
                    }
                })
            }
        })
    },[])

    return (
            //@ts-ignore
            <PageContainer>
                <div className={styles.root}>
                    <div className="practise">
                        <div className="practise__left">
                            <Box
                                size={size}
                                color={color}
                                points={points}
                                lines={lines}
                                type={type}
                                rotate={rotate}
                            />
                        </div>
                        <div className="practise__right">
                            <div className="main">
                                <div className="main__title">{practiseInfo.title}</div>
                                <div className="main__desc">
                                    {practiseInfo.desc}
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
                                {doingPractice&&<div className="main__btn">
                                    <Button type="primary" onClick={handleSubmit}>确定</Button>
                                </div>}
                                {<div className="main__analysis">
                                    <div className="analysis_result">
                                        <Space size={30}>
                                            <span>你的答案：A</span>
                                            {!compareTimeWithNow(practiseInfo.endTime) &&
                                                <span>正确答案：{practiseInfo.answer}</span>}
                                            <span>结果：<CheckCircleOutlined
                                                style={{color: '#67c23a', fontSize: 20}}/><CloseCircleOutlined
                                                style={{color: '#f56c6c', fontSize: 20}}/></span>
                                        </Space>
                                    </div>
                                    {/*todo*/}
                                    {!compareTimeWithNow(practiseInfo.endTime) && <div className="analysis_main">
                                        <Space size={20} direction="vertical">
                                            <Button type="primary"
                                                    onClick={() => setIsAnalysisDrawerOpen(!isAnalysisDrawerOpen)}>{!isAnalysisDrawerOpen ? '查看解析' : '收起解析'}</Button>
                                            <div
                                                className={!isAnalysisDrawerOpen ? "transition-container" : "transition-container transition-container--open"}>
                                                <ReactMarkdown children={analysis.replace(/\n/g, "\n\r")}
                                                               className="markdown"/>
                                            </div>
                                        </Space>
                                    </div>}
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </PageContainer>
    );
};

export default Practise
