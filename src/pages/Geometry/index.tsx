/* eslint-disable guard-for-in */
import React, {useEffect, useState} from 'react';
import FunctionMenu from '@/components/FunctionMenu';
import Layout from '@/components/Layout';
import CoordinateMenu from '@/components/CoordinateMenu'
import Box from "@/components/Geometry"
import {useLocation} from "umi";
import {findChangedFirst} from "@/utils/processData";
import {Button, message, notification, Modal} from "antd";
import {useGlobal} from "@/global";
import styles from './style.less'
import Service from '@/api'

const App: React.FC = (props: any) => {
    const location = useLocation()
    const id: string = location.pathname.split('/').pop() as string
    const type = location?.state?.data;
    const behavior = location?.state?.behavior;
    const name = location?.state?.name;
    const [size, setSize] = useState({
        depth: 6,
        width: 6,
        height: 6
    });
    const [userInfo] = useGlobal("userInfo")
    const [owner, setOwner] = useState(null)
    const [rotate, setRotate] = useState(false)
    const [color, setColor] = useState('#58b938')
    const [points, setPoints] = useState([
        // {
        //     name: 'A',
        //     point: [1, 1, 1],
        // },
        // {
        //     name: 'B',
        //     point: [6, 6, 6],
        // },
        // {
        //     name: 'C',
        //     point: [3, 4, 5],
        // }
    ])
    const [lines, setLines] = useState([
        // {
        //     start: 'A',
        //     end: 'B',
        // }
    ])

    const handleChangeSize = (val: object) => {
        // geometryRef.current.changeSize(depth, width, height)
        setSize(val)
    }

    const handleChangeColor = (val: string) => {
        setColor(val)
    }

    const handlePointsChange = (val: []) => {
        if (points.length === val.length) {
            const changedIndex = findChangedFirst(val, points)
            const name = points[changedIndex].name
            const newName = val[changedIndex].name
            const newLines = lines.map((item) => ({
                start: item.start === name ? newName : item.start,
                end: item.end === name ? newName : item.end
            }))
            console.log(newLines)
            setLines(newLines)
        }
        setPoints([
            ...val
        ])
    }

    const handleLinesChange = (val: []) => {
        setLines([
            ...val
        ])
    }

    const handleBtnChange = (val: any) => {
        if (val.rotate !== undefined) {
            setRotate(val.rotate)
            return
        }
        if (val === "reset") {
            setLines([])
            setPoints([])
            setSize({
                depth: 6,
                width: 6,
                height: 6
            })
            setColor('')
            setRotate(false)
        }
    }

    const handleSave = (saveType = "save") => {
        const data = {
            userId: userInfo.id,
            name,
            type,
            points: JSON.stringify(points),
            lines: JSON.stringify(lines),
            size: JSON.stringify(size),
            color
        }
        if (saveType === 'save') {
            Service.model.addUserModel(data).then(res => {
                if (!res.code) {
                    message.success("保存成功")
                } else {
                    message.success("保存失败")
                }
            })
        } else if (saveType === "modify") {
            Service.model.updateUserModel({
                ...data,
                id
            }).then(res => {
                if (!res.code) {
                    message.success("修改成功")
                } else {
                    message.success("修改失败")
                }
            })
        }

    }

    const handleDelete = () => {
        Modal.confirm({
            title: "确定删除吗?",
            onOk: () => {
                Service.model.deleteUserModel({
                    id
                }).then(res => {
                    if (!res.code) {
                        notification.success({
                            message: "删除成功"
                        })
                        history.back()
                    } else {
                        notification.error({
                            message: "删除失败"
                        })
                    }
                })
            }
        })
    }

    useEffect(() => {
        Service.model.getModelDetail({id}).then((res) => {
            if (!res.code) {
                const {lines, size, points, color, userId} = res.data
                setLines(JSON.parse(lines))
                setSize(JSON.parse(size))
                setPoints(JSON.parse(points))
                setColor(color)
                setOwner(userId)
            }
        })
    }, [])

    return (
        <>
            <div className={styles["edit-tab"]}>
                {behavior && <Button onClick={() => handleSave("save")} type="primary">保存</Button>}
                {userInfo.id === owner && <Button type="primary" onClick={() => handleSave("modify")}>修改</Button>}
                {userInfo.id === owner && <Button type="primary" danger onClick={handleDelete}>删除</Button>}
            </div>

            <Layout
                aside={
                    <FunctionMenu
                        size={size}
                        changeSize={handleChangeSize}
                        changeColor={handleChangeColor}
                        type={type}
                        onChange={handleBtnChange}
                    />
                }
                main={
                    <Box
                        size={size}
                        color={color}
                        points={points}
                        lines={lines}
                        type={type}
                        rotate={rotate}
                    />
                }
                rightAside={
                    <CoordinateMenu
                        points={points}
                        onChange={handlePointsChange}
                        lines={lines}
                        onLineChange={handleLinesChange}
                        type={type}
                    />
                }></Layout>
        </>
    );
};


export default App;
