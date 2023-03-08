// @flow
import * as React from 'react';
import {Tag} from "antd";

type Props = {
    value: number;
};
const status = [
    {
        title: '未完成',
        color: 'red',
    },
    {
        title: '进行中',
        color: 'blue',
    },
    {
        title: '已完成',
        color: 'green',
    }
]
export const StatusTag = (props: Props) => {
    const {value} = props
    return (
        <Tag color={status[value].color}>{status[value].title}</Tag>
    );
};

export default StatusTag
