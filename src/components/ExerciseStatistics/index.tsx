// @flow
import * as React from 'react';
import Rechart from '@/components/Rechart'
import {Modal} from 'antd'
import {useImperativeHandle, useState} from "react";
import styles from './style.less'
import {ProTable} from "@ant-design/pro-table";

type Props = {};
const dataSource = new Array(20).fill(0).map((item,index)=>({
    key: index,
    name: '2023'+index+1,
    age: '胡歌',
    address: 'A',
}));

const columns = [
    {
        title: '序号',
        dataIndex: 'index',
        valueType: 'indexBorder',
        width:80,
    },
    {
        title: '学号',
        dataIndex: 'name',
        key: 'name',
        width:180,
    },
    {
        title: '姓名',
        dataIndex: 'age',
        key: 'age',
        width:150,
    },
    {
        title: '选项',
        dataIndex: 'address',
        key: 'address',
        width:100,
    },
];
const ExerciseStatistics = React.forwardRef((props: Props,ref) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [option, setOption] = useState({})

    const init = ()=>{
        setOption(
            {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '5%',
                    left: 'center'
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 40,
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            {value: 30, name: 'A'},
                            {value: 50, name: 'B'},
                            {value: 20, name: 'C'},
                            {value: 40, name: 'D'},
                        ]
                    }
                ]
            }
        )
    }

    const showModal = () => {
        setIsModalOpen(true);
        init()
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useImperativeHandle(ref, () => ({
        showModal
    }))

    return (
        <Modal title="答题统计" width={750} open={isModalOpen} onCancel={handleCancel}>
            <div className={styles.root}>
                <div style={{width: 300, height: 300}}>
                    <Rechart option={option}/>
                </div>
                <ProTable
                    dataSource={dataSource}
                    columns={columns}
                    pagination={{
                        pageSize: 5,
                    }}
                    search={false}
                    options={{
                        setting: {
                            draggable: true,
                            extra: [<a key="confirm">确认</a>],
                        },
                    }}
                />
            </div>
        </Modal>
    );
});

export default ExerciseStatistics
