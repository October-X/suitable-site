import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable, PageContainer} from '@ant-design/pro-components';
import {Button, message, Space, Tag} from 'antd';
import React, {useEffect, useMemo, useRef} from 'react';
import {request, history} from 'umi'
import HeadBar from "@/components/HeadBar";
import Service from "@/api"
import {useGlobal} from "@/global";
import {useSelector} from "react-redux";
import Global from '@/global'

type GithubIssueItem = {
    url: string;
    id: number;
    number: number;
    title: string;
    labels: {
        name: string;
        color: string;
    }[];
    state: string;
    comments: number;
    created_at: string;
    updated_at: string;
    closed_at?: string;
};

export default () => {
    const actionRef = useRef<ActionType>();
    const [userInfo] = useGlobal("userInfo");
    const {currentClass} = useSelector((store) => store.currentClass)

    const handleViewStatisticRecord = (exampleId:string)=>{
        Service.userRecord.countRecord({
            teacherId:userInfo.id,
            exampleId
        }).then(res=>{
            if(!res.code){
                console.log(res.data)
            }
        })
    }

    const columns: ProColumns<GithubIssueItem>[] = useMemo(()=>(
        [
            {
                dataIndex: 'index',
                valueType: 'indexBorder',
                width: 48,
            },
            {
                title: '标题',
                dataIndex: 'title',
                key: 'title',
                copyable: true,
                ellipsis: true,
                tip: '标题过长会自动收缩',
            },
            {
                disable: true,
                title: '完成状态',
                key: 'status',
                dataIndex: 'status',
                search: false,
                render: (_, record) => {
                    const status = [
                        {
                            label: '未开始',
                            color: '#2db7f5'
                        },
                        {
                            label: '进行中',
                            color: '#87d068'
                        },
                        {
                            label: '已结束',
                            color: '#f50'
                        },
                    ]
                    const startTime = new Date(record.startTime)
                    const endTime = new Date(record.endTime)
                    const nowTime = new Date();
                    let result = null
                    if (nowTime.valueOf() > startTime.valueOf() && nowTime.valueOf() < endTime.valueOf()) {
                        result = status[1]
                    } else if (nowTime.valueOf() < startTime.valueOf()) {
                        result = status[0]
                    } else {
                        result = status[2]
                    }
                    return (<Space>
                        <Tag color={result.color}>
                            {result.label}
                        </Tag>
                    </Space>)
                }
            },
            {
                title: '创建时间',
                key: 'startTime',
                dataIndex: 'startTime',
                sorter: true,
                hideInSearch: true,
            },
            {
                title: '截止时间',
                key: 'endTime',
                dataIndex: 'endTime',
                sorter: true,
                hideInSearch: true,
            },
            {
                title: '操作',
                valueType: 'option',
                key: 'option',
                render: (text, record, _, action) => {
                    return (
                        <Space size={10}>
                            {!record?.isPublish ? <a
                                    key="publish"
                                    onClick={() => {
                                        Service.example.publishExample({
                                            teacherId: Global.getStore("userInfo").id,
                                            id: record.id + ''
                                        }).then((res) => {
                                            if (!res.code) {
                                                message.success(res.msg);
                                                actionRef.current?.reload();
                                            } else {
                                                message.error(res.msg);
                                            }
                                        })
                                    }}
                                >
                                    发布
                                </a> :
                                <a
                                    key="withdraw"
                                    onClick={() => {
                                        Service.example.withdrawExample({
                                            teacherId: Global.getStore("userInfo").id,
                                            id: record.id + ''
                                        }).then((res) => {
                                            if (!res.code) {
                                                message.success(res.msg);
                                                actionRef.current?.reload();
                                            } else {
                                                message.error(res.msg);
                                            }
                                        })
                                    }}
                                >
                                    撤销
                                </a>
                            }
                            <a
                                key="edit"
                                onClick={() => {
                                    history.push('/practiseEdit/' + record.id)
                                }}
                            >
                                编辑
                            </a>
                            <a href={record.url} target="_blank" rel="noopener noreferrer" key="view"
                               onClick={() => {
                                   handleViewStatisticRecord(record.id)
                               }}
                            >
                                查看
                            </a>
                            <a href={record.url} target="_blank" rel="noopener noreferrer" key="delete">
                                删除
                            </a>
                        </Space>
                    )
                }
            },

            // {
            //     title: '创建时间',
            //     dataIndex: 'created_at',
            //     valueType: 'dateRange',
            //     hideInTable: true,
            //     search: {
            //         transform: (value) => {
            //             return {
            //                 startTime: value[0],
            //                 endTime: value[1],
            //             };
            //         },
            //     },
            // },
            {
                title: '完成状态',
                dataIndex: 'created_at',
                valueType: 'select',
                hideInTable: true,
                fieldProps: {
                    options: [
                        {
                            label: '未完成',
                            value: 0,
                        },
                        {
                            label: '进行中',
                            value: 1,
                        },
                        {
                            label: '已完成',
                            value: 2,
                        },
                    ]
                }
            }
        ]
    ),[]);


    const handleAdd = () => {
        history.push('/practiseEdit/add')
    }

    const getExampleList = (params: any) => {
        return Service.example.getExampleList({
            userId: userInfo.id,
            classId: currentClass.id,
            ...params
        }).then((res) => {
            return res.data
        })
    }

    useEffect(() => {
        actionRef.current?.reload();
    }, [currentClass])

    return (
        <PageContainer ghost
        >
            <HeadBar title="例题解析"/>
            <ProTable<GithubIssueItem>
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={async (params, sort, filter) => {
                    console.log(params);
                    return getExampleList(params);
                }}
                editable={{
                    type: 'multiple',
                }}
                columnsState={{
                    persistenceKey: 'pro-table-singe-demos',
                    persistenceType: 'localStorage',
                    onChange(value) {
                        console.log('value: ', value);
                    },
                }}
                rowKey="id"
                search={{
                    labelWidth: 'auto',
                }}
                options={{
                    setting: {
                        listsHeight: 400,
                    },
                }}
                pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                }}
                dateFormatter="string"
                headerTitle="高级表格"
                toolBarRender={() => [
                    <Button key="button" icon={<PlusOutlined/>} type="primary" onClick={handleAdd}>
                        新建
                    </Button>
                ]}
            />
        </PageContainer>
    );
};
