import {EllipsisOutlined, PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable, TableDropdown, PageContainer} from '@ant-design/pro-components';
import {Button, Dropdown, Space, Tag} from 'antd';
import React, {useRef} from 'react';
import {request} from 'umi'
import HeadBar from "@/components/HeadBar";
import Transition from "@/components/Transition";
import Service from "@/api";
import global from "@/global";

const roles = [
    '管理员',
    '老师',
    '学生'
]

const columns: ProColumns[] = [
    {
        dataIndex: 'index',
        valueType: 'indexBorder',
        width: 48,
    },
    {
        title: 'ID',
        dataIndex: 'id',
        ellipsis: true,
        hideInSearch:true,
    },
    {
        title: '学号',
        dataIndex: 'username',
        copyable: true,
        ellipsis: true,
    },
    {
        title: '姓名',
        dataIndex: 'nickname',
        copyable: true,
        ellipsis: true,
    },
    {
        title: '角色',
        dataIndex: 'role',
        ellipsis: true,
        render:(text,recode)=>(roles[recode.role-1])
    },
    // {
    //     title: '班级',
    //     dataIndex: 'title',
    //     copyable: true,
    //     ellipsis: true,
    //     tip: '标题过长会自动收缩',
    // },
    {
        title: '操作',
        valueType: 'option',
        key: 'option',
        render: (text, record,) => [
            <a
                key="edit"
            >
                编辑
            </a>,
            <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
                查看
            </a>,
            <a href={record.url} target="_blank" rel="noopener noreferrer" key="delete">
                删除
            </a>,
        ],
    },

];



export default () => {
    const actionRef = useRef<ActionType>();
    const [userInfo] = global.useGlobal("userInfo")
    const [currentClass] = global.useGlobal("currentClass")

    const getStudents = (params:any)=>{
        return Service.user.getUsers({
            classId: currentClass.id,
            teacherId: userInfo.id,
            ...params
        }).then((res)=>{
            if(!res.code){
                return res.data
            }
        })
    }
    return (
        <Transition>
        <PageContainer ghost
        >
            <HeadBar title="用户管理"/>
            <ProTable
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={async (params , sort, filter) => {
                    console.log(params);
                    return getStudents(params);
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
                    defaultPageSize:10,
                    showSizeChanger: true,
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
        </Transition>
    );
};
