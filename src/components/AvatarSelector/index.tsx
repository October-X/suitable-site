// @flow
import React, {useImperativeHandle} from 'react';
import styles from './style.less'
import {Form, Image, Input, Modal, Skeleton, Space} from 'antd';
import {useState} from "react";
import {imageLoaded} from "@/utils/common";

type Props = {
    nickName?: string;
    defaultValue?: number;
}

const images = new Array(21).fill(0).map((item: any, index: number) => {
    return {src: 'https://github.com/October-X/suitable-resources/blob/main/avatars/' + (index + 1) + '.png?raw=true'}
})
const loadedArr = new Array(21).fill(false)

const AvatarSelector = React.forwardRef((props: Props, ref) => {
    const {nickName, defaultValue} = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [checkedAvatar, setCheckedAvatar] = useState(1)
    const [isLoadedArr, setIsLoadedArr] = useState(new Array(21).fill(false))
    const [isInit, setIsInit] = useState(false)
    const [form] = Form.useForm();


    const init = () => {
        if (nickName) {
            form.setFieldsValue({
                nickName: nickName
            })
        }
        if (defaultValue) {
            setCheckedAvatar(defaultValue)
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
        showModal
    }))

    const handleOk = () => {
        //todo 验证表单，请求接口提交
        form.validateFields().then((res) => {
            const nickName = res.nickName
            console.log(nickName)
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
                                               src={'https://github.com/October-X/suitable-resources/blob/main/avatars/' + checkedAvatar + '.png?raw=true'}
                                               alt=''/>
                                    </div>
                                    <Form form={form}>
                                        <Form.Item
                                            name="nickName"
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
                                                 onClick={() => setCheckedAvatar(index + 1)}>
                                                <Image width={50}
                                                       preview={false}
                                                       src={'https://github.com/October-X/suitable-resources/blob/main/avatars/' + (index + 1) + '.png?raw=true'}
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
