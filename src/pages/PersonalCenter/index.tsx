import {PageContainer,} from '@ant-design/pro-components';
import styles from './style.less'
import {Divider, Image, message, Modal, notification, Space, Tabs, Tooltip} from 'antd';
import {
    AppstoreOutlined,
    FormOutlined,
    IdcardOutlined,
    ImportOutlined,
    UserOutlined,
    FieldTimeOutlined
} from '@ant-design/icons'
import AvatarSelector from "@/components/AvatarSelector";
import AccountEditor from "@/components/AccountEditor";
import StatusTag from "@/components/statusTag";
import React, {useEffect, useRef, useState} from "react";
import {history} from "umi";
import moment from "moment";
import HeadBar from "@/components/HeadBar";
import Transition from "@/components/Transition";
import global from '@/global'
import Service from '@/api'
import {useSelector} from "react-redux";
import {compareTimeWithNow} from "@/utils/common";

const cubes = [
    {
        title: '示例广场-自定义',
        type: '自定义广场',
        user: 'admin',
    },
    {
        title: '示例广场-自定义',
        type: '自定义广场',
        user: 'admin',
    },
    {
        title: '示例广场-自定义',
        type: '自定义广场',
        user: 'admin',
    },
    {
        title: '示例广场-自定义',
        type: '自定义广场',
        user: 'admin',
    },
];
const exercisesOrigin = [
    {
        id: 'e1',
        title: 'M到截面的距离',
        status: 0,
        time: moment(new Date()).format('YYYY-MM-DD-hh:mm:ss'),
    },
    {
        id: 'e2',
        title: 'ABE的正弦值',
        status: 1,
        time: moment(new Date()).format('YYYY-MM-DD-hh:mm:ss'),
    },
    {
        id: 'e3',
        title: 'ABE与DGF平行',
        status: 2,
        time: moment(new Date()).format('YYYY-MM-DD-hh:mm:ss'),
    },
];

const AccessPage: React.FC = () => {

    const avatarSelectorRef = useRef(null)
    const accountEditorRef = useRef(null)
    const [userInfo, setUserInfo] = global.useGlobal("userInfo")
    const {currentClass} = useSelector((store)=>store.currentClass)
    const [checkedTab, setCheckedTab] = useState("example")
    const [exercises,setExercises] = useState([])
    const updateUserInfo = (id, val, notip) => {
        return Service.user.modifyUserInfo(id, val).then((res: any) => {
            if (!res.code) {
                setUserInfo({
                    ...userInfo,
                    ...val
                })
                if (notip) {
                    notification.success({
                        message: '修改成功'
                    })
                }
            } else {
                notification.error({
                    message: res.msg
                })
                return 0
            }
            return 1
        }).catch(() => {
            notification.error({
                message: '修改失败'
            })
            return 0
        })
    }

    const editInfo = () => {
        // @ts-ignore
        avatarSelectorRef?.current?.showModal()
    }

    const editAccount = () => {
        // @ts-ignore
        accountEditorRef?.current?.showModal()
    }

    const exitLogin = () => {
        localStorage.removeItem('token')
        history.replace('/login')
    }

    const handleClick = () => {
        history.push('/cube/hexahedron')
    }

    const handlePractiseClick = (val) => {
        if(val.status===1){
            history.push('/practise/' + val.id,{doingPractice:true})
        }else{
            history.push('/practise/' + val.id)
        }
    }

    const handleAvatarOk = (val: { avatar: string, nickName: string }) => {
        updateUserInfo(userInfo.id, val).then(() => {
            avatarSelectorRef.current?.closeModal()
        })
    }
    const handleAccountOk = (val: { password: string }) => {
        updateUserInfo(userInfo.id, val, true).then((res) => {
            if (res) {
                accountEditorRef.current?.closeModal()
                Modal.confirm({
                    content: "修改成功！重新登录",
                    onOk: () => {
                        history.replace('/login')
                    }
                })
            }
        })
    }

    const handleTabChange = (val: string) => {
        setCheckedTab(val)
    }

    useEffect(() => {
        if(!currentClass.id)return
    //    获取例题
    //     if(userInfo.role){
            if(checkedTab==="example"&&!exercises.length){
                Service.example.getPractiseList({
                    userId:userInfo.id,
                    classId:currentClass.id,
                    current:1
                }).then(res=>{
                    if(!res.code){
                        const data = res?.data?.data?.map(item=>{
                            let status = 0
                            if(item.isCorrect!=null){
                                status=2
                            }else if(item.isCorrect===null&&!compareTimeWithNow(item.endTime)){
                                status=0
                            }else{
                                status=1
                            }
                            return {
                                ...item,
                                status,
                            }
                        })
                        setExercises(data)
                    }
                })
            }
        // }
    }, [currentClass])

    return (
        <Transition>
            <PageContainer ghost
            >
                <HeadBar title="个人中心"/>
                <div className={styles.root}>
                    <div className="personal-center">
                        <div className="header">
                            <h2 className="header__title"><span>SUITABLE</span><span>STUDIO</span></h2>
                        </div>
                        <div className="user">
                            <div className="user__info">
                                <Space size={40}>
                                    <div className="user__info_img">
                                        <Image width={60}
                                               src={userInfo.avatar}
                                               alt=''/>
                                    </div>
                                    <div className="user__info_name">
                                        {userInfo.nickname}
                                    </div>
                                </Space>

                            </div>
                            <Space size={20}>
                                <Tooltip title="设置信息">
                                    <div className="user__btn" onClick={editInfo}>
                                        <IdcardOutlined style={{fontSize: 18}}/>
                                    </div>
                                </Tooltip>

                                <Tooltip title="修改密码">
                                    <div className="user__btn" onClick={editAccount}>
                                        <FormOutlined style={{fontSize: 18}}/>
                                    </div>
                                </Tooltip>

                                <Tooltip title="退出登录">
                                    <div className="user__btn" onClick={exitLogin}>
                                        <ImportOutlined style={{fontSize: 18}}/>
                                    </div>
                                </Tooltip>
                            </Space>
                        </div>
                        <div className="main">
                            <Tabs
                                style={{marginTop: 20}}
                                onChange={handleTabChange}
                                items={[
                                    {
                                        label: '我的例题',
                                        key: 'example',
                                        children:<div className="main__item">
                                            {exercises.map((item, index) => (
                                                <div className={styles.card__item} key={index} onClick={()=>handlePractiseClick(item)}>
                                                    <div className="item_title">
                                                        <span>{item?.title}</span>
                                                        <StatusTag value={item.status}/>
                                                    </div>
                                                    <div className="item_desc">
                                                        <div className="desc__type">
                                                            <FieldTimeOutlined style={{fontSize: 14, marginRight: 5}}/>
                                                            截止时间：{item?.endTime}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    },
                                    {
                                        label: '我的示例',
                                        key: 'cube',
                                        children: <div className="main__item">
                                            {cubes.map((item, index) => (
                                                <div className={styles.card__item} key={index} onClick={handleClick}>
                                                    <div className="item_title">{item.title}</div>
                                                    <div className="item_desc">
                                                        <div className="desc__type"><AppstoreOutlined
                                                            style={{fontSize: 14, marginRight: 5}}/>{item.type}</div>
                                                        <div className="desc__user"><UserOutlined
                                                            style={{fontSize: 14, marginRight: 5}}/>{item.user}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    }
                                ]}
                            >

                            </Tabs>
                            {/*{*/}
                            {/*    checkedTab === "cube" &&*/}
                            {/*    <div className="main__item">*/}
                            {/*        {cubes.map((item, index) => (*/}
                            {/*            <div className={styles.card__item} key={index} onClick={handleClick}>*/}
                            {/*                <div className="item_title">{item.title}</div>*/}
                            {/*                <div className="item_desc">*/}
                            {/*                    <div className="desc__type"><AppstoreOutlined*/}
                            {/*                        style={{fontSize: 14, marginRight: 5}}/>{item.type}</div>*/}
                            {/*                    <div className="desc__user"><UserOutlined*/}
                            {/*                        style={{fontSize: 14, marginRight: 5}}/>{item.user}</div>*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*        ))}*/}
                            {/*    </div>*/}
                            {/*}*/}
                            {/*{*/}
                            {/*    checkedTab === "example" &&*/}
                            {/*    <div className="main__item">*/}
                            {/*        {exercises.map((item, index) => (*/}
                            {/*            <div className={styles.card__item} key={index} onClick={handlePractiseClick}>*/}
                            {/*                <div className="item_title">*/}
                            {/*                    <span>{item.title}</span>*/}
                            {/*                    <StatusTag value={item.status}/>*/}
                            {/*                </div>*/}
                            {/*                <div className="item_desc">*/}
                            {/*                    <div className="desc__type">*/}
                            {/*                        <FieldTimeOutlined style={{fontSize: 14, marginRight: 5}}/>*/}
                            {/*                        截止时间：{item.time}*/}
                            {/*                    </div>*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*        ))}*/}
                            {/*    </div>*/}
                            {/*}*/}
                        </div>
                    </div>
                    <AvatarSelector ref={avatarSelectorRef} key="avatarSelector" nickname={userInfo.nickname}
                                    onOk={handleAvatarOk}
                                    defaultValue={userInfo.avatar || 'https://github.com/October-X/suitable-resources/blob/main/avatars/1.png?raw=true'}/>
                    <AccountEditor ref={accountEditorRef} key="accountEditor" username={userInfo.username}
                                   onOk={handleAccountOk}/>
                </div>
            </PageContainer>
        </Transition>
    );
};

export default AccessPage;
