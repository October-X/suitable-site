import React, {useEffect, useRef, useState} from 'react';
import styles from "./style.less";
import {Button, Card, Drawer, Empty, Form, Input, message, Modal, notification, Popover, Space, Tooltip} from "antd";
import {
    ArrowRightOutlined, CheckCircleOutlined,
    DeleteOutlined,
    ExclamationCircleFilled,
    LogoutOutlined
} from "@ant-design/icons";
import {useGlobal} from "@/global";
import Service from '@/api'
import {updateClassInfo} from '@/store/features/classSlice'
import {useDispatch} from "react-redux";

const bgUrls = [
    'https://assets.ketangpai.com/theme/min/01.jpg',
    'https://assets.ketangpai.com/theme/min/02.jpg',
    'https://assets.ketangpai.com/theme/min/03.jpg',
    'https://assets.ketangpai.com/theme/min/04.jpg',
    'https://assets.ketangpai.com/theme/min/05.jpg',
    'https://assets.ketangpai.com/theme/min/06.jpg',
]

const Index = (props: any) => {
    const {onClose} = props
    const containerRef = useRef()
    const [isChosen, setIsChosen] = useState<null | string | number>(null)
    const {confirm} = Modal;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen,setAddModalOpen] = useState(false);
    const [isBgChosen, setIsBgChosen] = useState(0);
    const [form] = Form.useForm()
    const [addForm] = Form.useForm()
    const [userInfo] = useGlobal("userInfo")
    const [currentClass,setCurrentClass] = useGlobal("currentClass")
    const [classArr,setClassArr] = useState([]);
    const dispatch = useDispatch();

    const showModal = () => {
        setIsModalOpen(true);
    };
    const showAddModal = ()=>{
        setAddModalOpen(true)
    }

    const getClass = ()=>{
        // @ts-ignore
        const result = JSON.parse(sessionStorage.getItem("currentClass"))||{}
        if(sessionStorage.getItem("currentClass")){
            setCurrentClass(result)
            dispatch(updateClassInfo(result))
        }
        Service.class.getClass({
            teacherId:userInfo.id
        }).then((res)=>{
            if(!res.code){
                sessionStorage.setItem("currentClass",JSON.stringify(res.data?.[0]))
                setClassArr(res.data)
                setCurrentClass(res.data?.[0])
                dispatch(updateClassInfo(res.data?.[0]))
            }
        })
    }

    const getStudentClassInfo = ()=>{
        Service.class.getStudentClassInfo({
            studentId:userInfo.id
        }).then((res)=>{
            if(!res.code){
                setClassArr(res.data)
            }
        })
    }

    const handleAddOk = ()=>{
        addForm.validateFields().then((res)=>{
            Service.class.joinClass({
                studentId:userInfo.id,
                classCode:res.classCode,
            }).then((res)=>{
                if(!res.code){
                    notification.success({
                        message:'加入课程成功'
                    })
                    getStudentClassInfo();
                    setIsModalOpen(false)
                }else{
                    notification.error({
                        message:res.msg
                    })
                }
            })
        })
    }

    const handleOk = () => {
        form.validateFields().then((res)=>{
            Service.class.addClass({
                teacherId:userInfo.id,
                name:res.classname,
                classBg:bgUrls[isBgChosen],
            }).then((res)=>{
                if(!res.code){
                    notification.success({
                        message:'添加成功'
                    })
                    getClass()
                    setIsModalOpen(false);
                }else{
                    notification.success({
                        message:'添加失败'
                    })
                }
            })

        })
    };

    const handleEnter = (val: any) => {
        setIsChosen(val.id)
        setCurrentClass(val)
        dispatch(updateClassInfo(val))
        message.success("进入"+val.name)
        onClose()
    }

    const handleQuit = (val: string) => {
        confirm({
            title: '提示',
            icon: <ExclamationCircleFilled/>,
            content: '确定退课吗？',
            onOk() {
                console.log('OK');
                Service.class.dropClass({
                    studentId:userInfo.id,
                    classId:val,
                }).then((res)=>{
                    if(!res.code){
                        notification.success({
                            message: "退课成功"
                        })
                        getStudentClassInfo();
                    }else{
                        notification.error({
                            message: "退课失败"
                        })
                    }
                })

            },
        });
    }

    const handleDelete = (val: string) => {
        confirm({
            title: '提示',
            icon: <ExclamationCircleFilled/>,
            content: '确定删除吗？',
            onOk() {
                Service.class.deleteClass({
                    teacherId:userInfo.id,
                    id:val
                }).then((res)=>{
                    if(!res.code){
                        notification.success({
                            message: "删除成功"
                        })
                        getClass();
                    }else{
                        notification.error({
                            message: "删除失败"
                        })
                    }
                })

            },
        });
    }

    const handleBgClick = (val: any) => {
        setIsBgChosen(val)
    }

    const handleWheel = (event) => {
        const element = containerRef.current;
        element.scrollLeft -= event.nativeEvent.wheelDeltaY
    }

    useEffect(()=>{
        userInfo.role==='teacher'&&getClass();
        userInfo.role==='student'&&getStudentClassInfo();
    },[])

    return (
        <Drawer {...props}>
            <div>
                {userInfo.role === "teacher" && <Button type="primary" onClick={showModal}>添加课程</Button>}
                {userInfo.role === "student" && <Button type="primary" onClick={showAddModal}>加入课程</Button>}
                <Modal title="添加课程" open={isAddModalOpen} onOk={handleAddOk} onCancel={()=>{setAddModalOpen(false)}}>
                    <Form form={addForm}>
                        <Form.Item
                        label="课程码"
                        name="classCode"
                        rules={[{required:true,message:'请输入课程码'}]}
                        style={{marginTop:20}}
                        >
                            <Input/>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal title="添加课程" open={isModalOpen} onOk={handleOk} onCancel={()=>{setIsModalOpen(false)}} width={800}>
                    <Form form={form}>
                        <Form.Item
                            name="classname"
                            label="班级名称"
                            rules={[{required: true, message: '请输入班级名称'}]}
                        >
                            <Input placeholder="请输入班级名称" style={{width: 400}}/>
                        </Form.Item>
                        <div className={styles.bg}>
                            {
                                bgUrls.map((item, index) => (
                                    <div className="bg__item" onClick={()=>handleBgClick(index)} key={'bg' + index}>
                                        <img src={item} alt=""/>
                                        {isBgChosen === index && <div className="bg__item--active">
                                            <CheckCircleOutlined style={{fontSize: 22, color: '#a0d911'}}/>
                                        </div>}
                                    </div>
                                ))
                            }
                        </div>
                    </Form>
                </Modal>
                <div ref={containerRef} className={styles.container} onWheel={handleWheel}>
                    {
                        !classArr.length&&<div className="empty"><Empty description="无课程！"/></div>
                    }
                    {
                        classArr.map((item, index) => (
                            <div className={item.id === currentClass.id ? styles['class__item']+' '+styles['class__item--active'] : styles['class__item']}
                                 key={'c' + item.id}>
                                <Card
                                    className={styles.antCard}
                                    style={{
                                        width: 300,
                                        marginTop: 16,
                                        backgroundImage: `url(${item.classBg})`,
                                    }}

                                    actions={[
                                        <Tooltip key="enter" placement="top" title="进入">
                                            <ArrowRightOutlined style={{fontSize: 20, color: '#a0d911'}}
                                                                onClick={() => handleEnter(item)}/>
                                        </Tooltip>,
                                        userInfo.role==="teacher"?<Tooltip key="delete" placement="top" title="删除">
                                            <DeleteOutlined style={{fontSize: 20, color: 'red'}}
                                                            onClick={() => handleDelete(item.id)}/>
                                        </Tooltip>:userInfo.role==="student"&&<Tooltip key="exit" placement="top" title="退课">
                                            <LogoutOutlined key="exit" style={{fontSize: 20, color: 'red'}}
                                                            onClick={() => handleQuit(item.id)}/>
                                        </Tooltip>,
                                    ]}
                                >
                                    <div className={styles.card}>
                                        <div className="card__name">
                                            {item.name}
                                        </div>
                                        <div className="card__teacher">
                                            任课老师：{item.teacherName||'未知'}
                                        </div>
                                        <div className="card__code">
                                            加课码：{item.classCode}
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Drawer>
    );
};

export default Index;
