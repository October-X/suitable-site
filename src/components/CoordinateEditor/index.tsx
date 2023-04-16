import React, {useEffect, useRef, useState} from 'react';
import ProBtn from '@/components/ProBtn';
import CoordinateItem from './components/CoordinateItem';
import styles from './style.less';
import {PlusOutlined} from '@ant-design/icons';
import {copyData} from '@/utils/processData';
import {Button, Form, Modal, notification, Select, Space} from 'antd';
import {
    MinusCircleOutlined,
} from '@ant-design/icons';

const CoordinateEditor: React.FC = (props: any) => {
    const [form] = Form.useForm()
    const {points, onChange, lines, onLineChange,type,totalPoints} = props
    const [api, contextHolder] = notification.useNotification();
    const [pointOption, setPointOption] = useState({
        first: [],
        second: []
    });
    const mainRef = useRef();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showAddLineModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleLineChange = (val) => {
        setPointOption({
            ...pointOption,
            second: pointOption.first.filter(item => item.label !== val)
        })
        form.setFieldValue("point2",'')
    }

    const handleAddLine = () => {
        form.validateFields().then((res) => {
            onLineChange([
                ...lines,
                res
            ])
        })

    }

    const handleLineDelete = (index: number) => {
        const _lines = copyData(lines)
        _lines.splice(index, 1)
        onLineChange(_lines)
    }

    useEffect(() => {
        const data = totalPoints.length?totalPoints:points
        setPointOption({
            first: data.map(item => ({label: item.name, value: item.name})),
            second: [],
        })
    }, [points,totalPoints])

    const handleAddPoint = () => {
        // @ts-ignore
        mainRef.current.scrollTop = 0;
        const result = points.find((item) => item.name === '0');
        if (result) {
            api.error({
                message: '修改提示',
                description: '上次新增未编辑完成',
            });
            return;
        }
        const newData = {
            status: 'add',
            name: '0',
            point: [0, 0, 0],
        };
        points.unshift(newData);
        onChange([...points])
    };
    const handleDelete = (val: string) => {
        const data = points.filter((item) => item.name !== val);
        const newlines = lines.filter((item)=>item.start !==val&&item.end!==val)
        onChange(data)
        onLineChange(newlines)
    };
    const modifyPoint = (name: string, data: any) => {
        const newPoints = copyData(points);
        const index = newPoints.findIndex((item: any) => item.name === name);
        newPoints.splice(index, 1, data);
        onChange(newPoints)
    };
    return (
        <div className={styles.root}>
            <div className="coordinate-editor">
                {contextHolder}
                <div className="coordinate-editor__item">
                    <Space size={20}>
                        <ProBtn
                            type="btn"
                            onChange={handleAddPoint}
                            label="标点"
                            name="add"
                            icon={PlusOutlined}
                            width={80}
                        ></ProBtn>
                        <ProBtn
                            type="btn"
                            onChange={showAddLineModal}
                            label="连线"
                            name="add"
                            icon={PlusOutlined}
                            width={80}
                        ></ProBtn>
                    </Space>
                </div>
                <div className="shadow-container coordinate-editor__container">
                    <div className="shadow"></div>
                    <div className="main-container" ref={mainRef}>
                        {points.map((item) => (
                            <div className="coordinate-editor__item" key={item.name}>
                                <CoordinateItem
                                    pointData={item}
                                    delete={handleDelete}
                                    modify={modifyPoint}
                                    allPoints={points.map((item) => item.name)}
                                    status={item.status || "display"}
                                    type={type}
                                ></CoordinateItem>
                            </div>
                        ))}
                    </div>
                    <div className="shadow"></div>
                </div>
            </div>
            <Modal title="辅助线" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} style={{position:"fixed",top:30,left:30}} mask={false}>
                <div className={styles.line}>
                    <Form form={form}>
                        <div className="line__selector">
                            <div>
                                <Form.Item name="start">
                                    <Select
                                        style={{width: 120}}
                                        options={pointOption.first}
                                        onChange={handleLineChange}
                                    />
                                </Form.Item>
                            </div>
                            <div>
                                <Form.Item name="end">
                                    <Select
                                        style={{width: 120}}
                                        options={pointOption.second}
                                        // disabled={pointOption.second.length === 0}
                                    />
                                </Form.Item>
                            </div>
                            <Button type="primary" onClick={handleAddLine}>
                                确定
                            </Button>
                        </div>
                    </Form>

                    <div className="line__result">
                        {
                            lines.map((item, index:number) => (
                                <div key={'l' + index} className="line__result_item">
                                    <span>{item.start}-{item.end}</span>
                                    <div className="line__result_item__btn" onClick={() => {
                                        handleLineDelete(index)
                                    }}>
                                        <MinusCircleOutlined/>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default CoordinateEditor;
