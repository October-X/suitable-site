// @flow
import * as React from 'react';
import styles from './style.less'
import {Modal} from 'antd';
import {useState} from "react";

type Props = {
    // onFinish:()=>void;
};
export const AvatarSelector = (props: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(true);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={styles.root}>
            <Modal title="头像选择" width={800} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className="selector">
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </div>
            </Modal>

        </div>
    );
};
