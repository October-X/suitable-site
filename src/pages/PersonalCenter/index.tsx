import {PageContainer,} from '@ant-design/pro-components';
import styles from './style.less'
import {Divider, Image, Space, Tooltip} from 'antd';
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
import React, {useRef} from "react";
import {history} from "umi";
import moment from "moment";

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
const exercises = [
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
        title: 'ABE与DEF平行',
        status: 2,
        time: moment(new Date()).format('YYYY-MM-DD-hh:mm:ss'),
    },
];

const AccessPage: React.FC = () => {

    const avatarSelectorRef = useRef(null)
    const accountEditorRef = useRef(null)

    const editInfo = () => {
        // @ts-ignore
        avatarSelectorRef?.current?.showModal()
    }

    const editAccount = () => {
        // @ts-ignore
        accountEditorRef?.current?.showModal()
    }

    const exitLogin = () => {
        localStorage.removeItem('login')
        history.replace('/login')
    }

    const handleClick = () => {
        history.push('/cube/hexahedron')
    }

    return (
        <PageContainer ghost
        >
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
                                           src="https://github.com/October-X/suitable-resources/blob/main/avatars/2.png?raw=true"
                                           alt=''/>
                                </div>
                                <div className="user__info_name">
                                    牛牛
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
                        <Divider orientation="left">我的广场</Divider>
                        <div className="main__item">
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
                        <Divider orientation="left">我的例题</Divider>
                        <div className="main__item">
                            {exercises.map((item, index) => (
                                <div className={styles.card__item} key={index} onClick={handleClick}>
                                    <div className="item_title">
                                        <span>{item.title}</span>
                                        <StatusTag value={item.status}/>
                                    </div>
                                    <div className="item_desc">
                                        <div className="desc__type">
                                            <FieldTimeOutlined style={{fontSize: 14, marginRight: 5}}/>
                                            截止时间：{item.time}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <AvatarSelector ref={avatarSelectorRef} key="avatarSelector" nickName="牛牛" defaultValue={2}/>
                <AccountEditor ref={accountEditorRef} key="accountEditor"/>
            </div>
        </PageContainer>
    );
};

export default AccessPage;
