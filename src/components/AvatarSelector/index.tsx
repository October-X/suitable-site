// @flow
import React, {useImperativeHandle} from 'react';
import styles from './style.less'
import {Form, Image, Input, Modal, Skeleton, Space} from 'antd';
import {useState} from "react";
import {imageLoaded} from "@/utils/common";

type Props = {
    nickname?: string;
    defaultValue?: number;
    onOk?:(val:{avatar:string,nickName:string})=>void;
}

const images = new Array(21).fill(0).map((item: any, index: number) => {
    return {src: 'https://github.com/October-X/suitable-resources/blob/main/avatars/' + (index + 1) + '.png?raw=true'}
})
const loadedArr = new Array(21).fill(false)

const AvatarSelector = React.forwardRef((props: Props, ref) => {
    const {nickname, defaultValue,onOk} = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [checkedAvatar, setCheckedAvatar] = useState('')
    const [isLoadedArr, setIsLoadedArr] = useState(new Array(21).fill(false))
    const [isInit, setIsInit] = useState(false)
    const [form] = Form.useForm();


    const init = () => {
        if (nickname) {
            form.setFieldsValue({
                nickname: nickname
            })
        }
        if(defaultValue){
            setCheckedAvatar(defaultValue+'')
        }
        if (isInit) return
        images.forEach((item, index) => {
            imageLoaded(item.src, () => {
                loadedArr[index] = true
                setIsLoadedArr([...loadedArr])
            })
        })
        setIsInit(true)
    }

    const showModal = () => {
        setIsModalOpen(true);
        init()
    };

    useImperativeHandle(ref, () => ({
        showModal,
        closeModal:()=>setIsModalOpen(false)
    }))

    const handleOk = () => {
        //todo 验证表单，请求接口提交
        form.validateFields().then((res) => {
            const nickname = res.nickname
            onOk?.({
                avatar:checkedAvatar,
                nickname
            })
            setIsModalOpen(false);
        })
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Modal title="设置信息" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <div className={styles.root}>
                <div className="info-editor">
                    <div className="info-editor__item info-editor__item--left">
                        <div className="user-avatar">
                            <div className="avatar__header">
                                <Space size={40}>
                                    <div className="header_avatar">
                                        <Image width={60}
                                               preview={false}
                                               src={checkedAvatar+''}
                                               alt=''/>
                                    </div>
                                    <Form form={form}>
                                        <Form.Item
                                            name="nickname"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '请输入昵称',
                                                },
                                            ]}
                                            hasFeedback
                                        >
                                            <Input placeholder="请输入昵称" allowClear autoComplete="off"/>
                                        </Form.Item>
                                    </Form>
                                </Space>
                            </div>
                            <div className="avatar__main">
                                {
                                    images.map((item, index: number) => {
                                        return isLoadedArr[index] ?
                                            <div className="avatar__main_item" key={'avatar' + index}
                                                 onClick={() => setCheckedAvatar(item.src)}>
                                                <Image width={50}
                                                       preview={false}
                                                       src={item.src}
                                                       alt=''/>
                                            </div> : <Skeleton.Avatar active shape="circle" size={50}
                                                                      key={'avatarLoading' + index}/>
                                    })
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Modal>
    );
});


export default AvatarSelector;
