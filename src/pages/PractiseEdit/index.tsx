// @flow
import * as React from 'react';
import styles from './style.less'
import PageContainer from "@/components/PageContainer";
import {Radio, Space, Button, notification, Form, Input, Checkbox, Select,DatePicker} from 'antd';
import {useEffect, useRef, useState} from "react";
import {CheckCircleOutlined} from '@ant-design/icons'
import dayjs from "dayjs";
import Box from "@/components/Geometry";
import {useLocation} from "@@/exports";
import {useGlobal} from "@/global";
import Service from '@/api'
import moment from "moment";
import {Editor} from "@toast-ui/react-editor";

type Props = {};
const Practise = (props: Props) => {
    const [form] = Form.useForm()
    const location = useLocation()
    const id:string = location.pathname.split('/').pop() as string
    const type = location?.state?.data;
    const name = location?.state?.name;
    const [size, setSize] = useState({
        depth: 6,
        width: 6,
        height: 6
    });
    const [userInfo] = useGlobal("userInfo")
    const [currentClass] = useGlobal("currentClass")
    const [rotate, setRotate] = useState(false)
    const [color, setColor] = useState('#58b938')
    const [points, setPoints] = useState([
    ])
    const [analysis,setAnalysis] = useState("")
    const [lines, setLines] = useState([
    ])
    const { RangePicker } = DatePicker;
    const [checkedModel,setCheckedModel] = useState<string|null>("0");
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
    const [modelOptions,setModelOptions] = useState([])
    const editorRef = useRef()

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

    const handleSubmit = (type="add") => {
        form.validateFields().then((res) => {
            if (Object.values(res).reduce((a, item) => item && a, true)) {
                //  todo  提交操作
                const startTime = dayjs(res.time[0]).format("YYYY-MM-DD HH:mm:ss")
                const endTime = dayjs(res.time[1]).format("YYYY-MM-DD HH:mm:ss")
                const option = options.map(item=>({...item,desc:res[item.label]}))
                console.log(res)
                const data={
                    title:res.title,
                    desc:res.desc,
                    modelId:res.modelId,
                    answer:JSON.stringify(res.answer),
                    startTime,
                    endTime,
                    teacherId:userInfo.id,
                    classId:currentClass.id,
                    option:JSON.stringify(option),
                    analysis:editorRef?.current?.getInstance()?.getMarkdown()||"暂无解析"
                }
                console.log(option)
                console.log(data)
                if(type==="add"){
                    Service.example.addExample(data).then((res)=>{
                        if(!res.code){
                            console.log(res)
                            notification.success({
                                message:'保存成功'
                            })
                        }else{
                            notification.success({
                                message:'保存失败'
                            })
                        }
                    })
                }else{
                    Service.example.updateExample({
                        id,
                        ...data
                    }).then((res)=>{
                        if(!res.code){
                            console.log(res)
                            notification.success({
                                message:'保存成功'
                            })
                        }else{
                            notification.success({
                                message:'保存失败'
                            })
                        }
                    })
                }
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

    const handleModelSelectChange = (val:string)=>{
        setCheckedModel(val)
        Service.model.getModelDetail({id:val}).then((res)=>{
            if(!res.code){
                const {lines,size,points,color} = res.data
                setLines(JSON.parse(lines))
                setSize(JSON.parse(size))
                setPoints(JSON.parse(points))
                setColor(color)
            }
        })
    }

    useEffect(()=>{
        Service.model.getUserModelOption({userId:userInfo.id}).then(res=>{
            if(!res.code){
                console.log(res.data)
                res.data.unshift({label:'无',value:"0"})
                setModelOptions(res.data)
            }
        })
        Service.example.getExampleDetail({id}).then(res=>{
            if(!res.code){
                let {title,desc,option,startTime,endTime,modelId} = res.data
                option = JSON.parse(option)
                setOptions(option)
                setAnalysis(res.data.analysis||"暂无解析")
                form.setFieldsValue({
                    title,
                    desc,
                    modelId,
                    answer:JSON.parse(res.data.answer),
                    time:[dayjs(startTime),dayjs(endTime)]
                })
                option.forEach((item)=>{
                    form.setFieldValue(item.label,item.desc)
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
        // @ts-ignore
        <PageContainer>
            <div className={styles.root}>
                <div className="practise">
                    <div className="practise__left">
                        {checkedModel!=="0" && <Box
                            size={size}
                            color={color}
                            points={points}
                            lines={lines}
                            type={type}
                            rotate={rotate}
                        />}
                    </div>
                    <div className="practise__right">
                        <div className="main">
                            <Form form={form}>
                                <Form.Item
                                    name="modelId"
                                    label="模型"
                                    required
                                    initialValue="0"
                                >
                                    <Select placeholder="请选择模型" options={modelOptions}
                                            showSearch
                                            onChange={handleModelSelectChange}
                                            filterOption={(input, option) =>
                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                            }
                                    />
                                </Form.Item>
                                <div className="main__title">
                                    <Form.Item
                                        name="title"
                                        label="标题"
                                        required
                                    >
                                        <Input allowClear placeholder="请输入标题"/>
                                    </Form.Item>
                                </div>
                                <div className="main__desc">
                                    <Form.Item
                                        name="desc"
                                        label="题目"
                                        required
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
                                        {/*<Space size={20}>*/}
                                        {/*    <CheckCircleOutlined style={{color: '#67c23a', fontSize: 20}}/>*/}
                                        {/*    <span>*/}
                                        {/*    正确答案：*/}
                                        {/*</span>*/}
                                        {/*</Space>*/}
                                        <Space direction="vertical" size={20}>
                                            <div style={{marginTop: 20}}>
                                                <Form.Item name="answer" label="正确答案" required>
                                                    <Checkbox.Group options={options}/>
                                                </Form.Item>
                                            </div>
                                        </Space>
                                    </div>
                                </div>
                                <Form.Item name="time" label="起止时间" required>
                                    <RangePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                                </Form.Item>
                                <Form.Item label="解析">
                                    {
                                        (analysis||id==="add")&& <Editor
                                            ref={editorRef}
                                            initialValue={analysis}
                                            previewStyle="vertical"
                                            height="600px"
                                            initialEditType="wysiwyg"
                                        />
                                    }
                                </Form.Item>
                            </Form>

                            <div className="main__btn">
                                <Space size={20}>
                                    <Button type="primary" onClick={handleAdd}>添加</Button>
                                    <Button type="primary" onClick={handleReduce}
                                            disabled={options.length === 2}>去除</Button>
                                    <Button type="primary" onClick={()=>handleSubmit("update")}>保存</Button>
                                    <Button type="primary" onClick={()=>handleSubmit()}>{id!=="add"?'保存':'新增例题'}</Button>
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
