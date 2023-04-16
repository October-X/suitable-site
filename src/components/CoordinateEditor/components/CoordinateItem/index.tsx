import React, {useState} from 'react';
import styles from './style.less';
import {
    MinusCircleOutlined,
    CloseOutlined,
    CheckOutlined,
} from '@ant-design/icons';
import {Input, notification} from 'antd';
import {copyData, shallowExist, emptyExist} from '@/utils/processData';

const CoordinateItem = (props: any) => {
    const {
        pointData: propsData,
        delete: propsDelete,
        modify: propsModify,
        allPoints,
        status: propsStatus,
        type
    } = props;
    const originData = copyData(propsData);
    const [edit, setEdit] = useState(false);
    const pointData = copyData(propsData);
    const [inputs, setInputs] = useState(originData);
    const [api, contextHolder] = notification.useNotification();
    const [status, setStatus] = useState(propsStatus);

    const handleDelete = (val: string) => {
        propsDelete(val);
    };

    const handleClose = () => {
        setEdit(false);
        setStatus(null);
        setInputs(originData);
        if (propsStatus && shallowExist(allPoints, inputs.name)) {
            propsDelete('0')
        }
    };

    const handleConfirm = () => {
        if (emptyExist(inputs) || inputs.name === '0') {
            api.error({
                message: '修改提示',
                description: '输入未完成',
            });
            return;
        }
        if (
            shallowExist(allPoints, inputs.name) &&
            inputs.name !== originData.name
        ) {
            api.error({
                message: '修改提示',
                description: '该点已存在',
            });
            return;
        }
        propsModify(propsData.name, {
            name: inputs.name,
            point: [inputs.point[0], inputs.point[1], inputs.point[2]],
        });
        setEdit(false);
    };

    const handleInputChange = (event: any, num: number) => {
        inputs.point[num] = +event.target.value
        setInputs({...inputs});
    }

    return (
        <div className={styles.root}>
            <div className="container">
                {contextHolder}
                <div
                    className="coordinate-item"
                    onClick={() => {
                        setEdit(true);
                    }}
                >
                    <div className="coordinate-item__header">
                        <div className="header_container">
                            <div className="header_container__point">{pointData.name}</div>
                            <div
                                className="header_container__btn"
                                onClick={() => handleDelete(pointData.name)}
                            >
                                <MinusCircleOutlined/>
                            </div>
                        </div>
                    </div>
                    <div className="coordinate-item__main">
                        <div className="main_item">
                            <div className="main_item__point-detail">
                                (
                                <span>{pointData.point[0]},</span>
                                {
                                    type !== "oblong" && type !== "circle" && <span>{pointData.point[1]},</span>
                                }
                                <span>{pointData.point[2]}</span>
                                )
                            </div>
                        </div>
                    </div>
                </div>
                {edit || status === 'add' ? (
                    <div className="coordinate-item coordinate-item-editor">
                        <div className="coordinate-item__header">
                            <div className="header_container">
                                <div className="header_container__point">
                                    <Input
                                        className="input--small"
                                        key="name"
                                        value={inputs.name}
                                        onChange={(event) => {
                                            setInputs({...inputs, name: event.target.value});
                                        }}
                                    />
                                </div>
                                <div className="header_container__btns">
                                    <div
                                        className=" btns_item header_container__btn"
                                        onClick={handleConfirm}
                                    >
                                        <CheckOutlined/>
                                    </div>
                                    <div
                                        className="btns_item header_container__btn"
                                        onClick={handleClose}
                                    >
                                        <CloseOutlined/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="coordinate-item__main">
                            <div className="main_item">
                                <div className="main_item__point-detail">
                                    <Input
                                        className="input--small"
                                        key="p1"
                                        value={inputs.point[0]}
                                        onChange={(event) => {
                                            handleInputChange(event, 0)
                                        }}
                                        type="number"
                                    />
                                    {
                                        type !== "oblong" && type !== "circle" && <Input
                                            className="input--small"
                                            key="p2"
                                            value={inputs.point[1]}
                                            type="number"
                                            onChange={(event) => {
                                                handleInputChange(event, 1)
                                            }}
                                        />
                                    }
                                    <Input
                                        className="input--small"
                                        key="p3"
                                        value={inputs.point[2]}
                                        type="number"
                                        onChange={(event) => {
                                            handleInputChange(event, 2)
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default CoordinateItem;
