import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable, PageContainer} from '@ant-design/pro-components';
import {Button, Space, Tag} from 'antd';
import React, {useRef} from 'react';
import {request, history} from 'umi'
import HeadBar from "@/components/HeadBar";

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

const columns: ProColumns<GithubIssueItem>[] = [
    {
        dataIndex: 'index',
        valueType: 'indexBorder',
        width: 48,
    },
    {
        title: '标题',
        dataIndex: 'title',
        copyable: true,
        ellipsis: true,
        tip: '标题过长会自动收缩',
    },
    {
        disable: true,
        title: '完成状态',
        dataIndex: 'labels',
        search: false,
        renderFormItem: (_, {defaultRender}) => {
            return defaultRender(_);
        },
        render: (_, record) => (
            <Space>
                {record.labels.map(({name, color}) => (
                    <Tag color={color} key={name}>
                        {name}
                    </Tag>
                ))}
            </Space>
        ),
    },
    {
        title: '创建时间',
        key: 'created_at',
        dataIndex: 'created_at',
        valueType: 'date',
        sorter: true,
        hideInSearch: true,
    },
    {
        title: '截止时间',
        key: 'end_at',
        dataIndex: 'end_at',
        valueType: 'date',
        sorter: true,
        hideInSearch: true,
    },
    {
        title: '操作',
        valueType: 'option',
        key: 'option',
        render: (text, record, _, action) => [
            <a
                key="editable"
                onClick={()=>{history.push('/practiseEdit/123321')}}
            >
                编辑
            </a>,
            <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
                查看
            </a>,
            <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
                删除
            </a>,
        ],
    },

    {
        title: '创建时间',
        dataIndex: 'created_at',
        valueType: 'dateRange',
        hideInTable: true,
        search: {
            transform: (value) => {
                return {
                    startTime: value[0],
                    endTime: value[1],
                };
            },
        },
    },
    {
        title: '完成状态',
        dataIndex: 'created_at',
        valueType: 'select',
        hideInTable: true,
        fieldProps: {
            options: [
                {
                    label: '未完成',
                    value: '0',
                },
                {
                    label: '进行中',
                    value: '1',
                },
                {
                    label: '已完成',
                    value: '2',
                },
            ]
        }
    }
];

export default () => {
    const actionRef = useRef<ActionType>();
    return (
        <PageContainer ghost
        >
            <HeadBar title="例题解析"/>
            <ProTable<GithubIssueItem>
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={async (params = {}, sort, filter) => {
                    console.log(sort, filter);
                    return request<{
                        data: GithubIssueItem[];
                    }>('https://proapi.azurewebsites.net/github/issues', {
                        params,
                    });
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
                form={{
                    // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
                    syncToUrl: (values, type) => {
                        if (type === 'get') {
                            return {
                                ...values,
                                created_at: [values.startTime, values.endTime],
                            };
                        }
                        return values;
                    },
                }}
                pagination={{
                    pageSize: 5,
                    onChange: (page) => console.log(page),
                }}
                dateFormatter="string"
                headerTitle="高级表格"
                toolBarRender={() => [
                    <Button key="button" icon={<PlusOutlined/>} type="primary">
                        新建
                    </Button>
                ]}
            />
        </PageContainer>
    );
};
