import {PageContainer,} from '@ant-design/pro-components';
import styles from './style.less'
import {Image, Space, Tooltip} from 'antd';
import {FormOutlined, IdcardOutlined, ImportOutlined} from '@ant-design/icons'
import AvatarSelector from "@/components/AvatarSelector";
import React, {useRef} from "react";
import {history} from "umi";

const AccessPage: React.FC = () => {

    const avatarSelectorRef = useRef(null)

    const editInfo = () => {
        avatarSelectorRef?.current?.showModal()
    }

    const exitLogin = () => {
        localStorage.removeItem('login')
        history.replace('/login')
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
                                           src="https://github.com/October-X/suitable-resources/blob/main/avatars/1.png?raw=true"
                                           alt=''/>
                                </div>
                                <div className="user__info_name">
                                    牛牛
                                </div>
                            </Space>

                        </div>
                        <Space size={20}>
                            <Tooltip title="设置信息" color="white">
                                <div className="user__btn" onClick={editInfo}>
                                    <IdcardOutlined style={{fontSize: 18}}/>
                                </div>
                            </Tooltip>

                            <Tooltip title="修改密码" color="white">
                                <div className="user__btn">
                                    <FormOutlined style={{fontSize: 18}}/>
                                </div>
                            </Tooltip>

                            <Tooltip title="退出登录" color="white">
                                <div className="user__btn" onClick={exitLogin}>
                                    <ImportOutlined style={{fontSize: 18}}/>
                                </div>
                            </Tooltip>
                        </Space>
                    </div>
                    <div className="main">

                    </div>
                </div>
                <AvatarSelector ref={avatarSelectorRef}/>
            </div>
        </PageContainer>
    );
};

export default AccessPage;
