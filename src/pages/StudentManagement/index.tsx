import {EllipsisOutlined, PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable, TableDropdown, PageContainer} from '@ant-design/pro-components';
import {Button, Dropdown, message, Modal, Space, Tag} from 'antd';
import React, {useEffect, useRef} from 'react';
import {request} from 'umi'
import HeadBar from "@/components/HeadBar";
import Transition from "@/components/Transition";
import Service from "@/api";
import global from "@/global";
import {useSelector} from "react-redux";





export default () => {

    const actionRef = useRef<ActionType>();
    const [userInfo] = global.useGlobal("userInfo")
    const {currentClass} = useSelector((store)=>store.currentClass)
    const {confirm} = Modal;

    const handleDropClass = (studentId:string)=>{
        confirm({
            content: '确定退课吗？',
            onOk() {
                Service.class.dropClass({
                    studentId,
                    classId:currentClass.id
                }).then((res)=>{
                    if(!res.code){
                        message.success("退课成功")
                        actionRef.current?.reload()
                    }
                    else{
                        message.error("退课失败")
                    }
                }).catch((err)=>{
                    message.error(err)
                })
            }
        })
    }

    const getStudents = (params:any)=>{
        return Service.class.getStudents({
            classId: currentClass.id,
            teacherId: userInfo.id,
            ...params
        }).then((res)=>{
            if(!res.code){
                return res.data
            }
        })
    }

    useEffect(()=>{
        actionRef.current?.reload();
    },[currentClass])

    const columns: ProColumns[] = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        {
            title: 'ID',
            dataIndex: 'id',
            copyable: true,
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
                <a href={record.url} target="_blank" rel="noopener noreferrer" key="drop" onClick={()=>handleDropClass(record.id)}>
                    退课
                </a>,
            ],
        },
    ];

    return (
        <Transition>
        <PageContainer ghost
        >
            <HeadBar title="学生管理"/>
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
        </Transition>
    );
};
