/* eslint-disable guard-for-in */
import React, {useEffect, useState} from 'react';
import Layout from '@/components/Layout';
import CoordinateMenu from '@/components/CoordinateMenu'
import Box from "@/components/Geometry"
import {findChangedFirst} from "@/utils/processData";
import Transition from "@/components/Transition";
import styles from "@/components/EditTab/style.less";
import {Button, message} from "antd";
import {useGlobal} from "@/global";
import {useLocation} from "umi";
import Service from '@/api'

const App: React.FC = (props: any) => {
    const location = useLocation()
    const id:string = location.pathname.split('/').pop() as string
    const behavior = location?.state?.behavior;
    const name = location?.state?.name;
    console.log(behavior,name)
    const [userInfo] = useGlobal("userInfo")
    const [cubePoints, setCubePoints] = useState([
        {
            name: 'A',
            point: [1, 1, 1],
        },
        {
            name: 'B',
            point: [6, 6, 6],
        }
    ])
    const [cubeLines, setCubeLines] = useState([
        {
            start: 'A',
            end: 'B',
        }
    ])
    const [points, setPoints] = useState([
        {
            name: 'E',
            point: [2, 0, 1],
        },
        {
            name: 'F',
            point: [6, 4, 3],
        }
    ])
    const [lines, setLines] = useState([
        {
            start: 'E',
            end: 'F',
        }
    ])
    const [totalPoints, setTotalPoints] = useState([
        ...cubePoints,
        ...points
    ])
    console.log(totalPoints)

    const handlePointsChange = (val: [], type?: string) => {
        console.log(type)

        if (cubePoints.length === val.length) {
            let changedIndex,name,newName;
            if(type==="cube"){
                 changedIndex = findChangedFirst(val, points)
                 name = cubePoints[changedIndex].name
                 newName = val[changedIndex].name
            }else{
                 changedIndex = findChangedFirst(val, points)
                 name = points[changedIndex].name
                 newName = val[changedIndex].name
            }
            const newCubeLines = cubeLines.map((item) => ({
                start: item.start === name ? newName : item.start,
                end: item.end === name ? newName : item.end
            }))
            const newLines = lines.map((item) => ({
                start: item.start === name ? newName : item.start,
                end: item.end === name ? newName : item.end
            }))
            setCubeLines(newCubeLines)
            setLines(newLines)
        }
        if (type === "cube") {
            console.log(123123123)
            setCubePoints([
                ...val
            ])
            setTotalPoints([
                ...val,
                ...points
            ])
            return
        }
        setPoints([
            ...val
        ])
        setTotalPoints([
            ...cubePoints,
            ...val
        ])
        console.log(points)
        console.log(lines)
    }

    const handleLinesChange = (val: [], type?: string) => {
        if (type === "cube") {
            console.log(val)
            setCubeLines([
                ...val
            ])
            return
        }
        setLines([
            ...val
        ])
    }

    const handleSave = (saveType:string)=>{
        const data = {
            name,
            userId:userInfo.id,
            cubeLines:JSON.stringify(cubeLines),
            points:JSON.stringify(points),
            cubePoints:JSON.stringify(cubePoints),
            lines:JSON.stringify(lines),
        }
        if(saveType==="save"){
            Service.userModelCustom.addUserModelCustom(data).then((res)=>{
                if(!res.code){
                    message.success("保存成功")
                }else {
                    message.success("保存失败")
                }
            })
        }else{
            Service.userModelCustom.updateUserModel({
                id,
                ...data
            }).then((res)=>{
                if(!res.code){
                    message.success("修改成功")
                }else {
                    message.success("修改失败")
                }
            })
        }

        console.log(data)
    }

    const handleDelete = ()=>{
        Service.userModelCustom.deleteModelCustom({id}).then((res)=>{
            if(!res.code){
                message.success("删除成功")
            }else {
                message.success("删除失败")
            }
        })
    }

    useEffect(()=>{
        Service.userModelCustom.getModelCustomDetail({id}).then(res=>{
            if(!res.code){
                let {name,points,cubePoints,cubeLines,lines} = res.data
                points = JSON.parse(points)
                cubePoints = JSON.parse(cubePoints)
                setLines(JSON.parse(lines))
                setPoints(points)
                setCubeLines(JSON.parse(cubeLines))
                setCubePoints(cubePoints)
                setTotalPoints([
                    ...cubePoints,
                    ...points,
                ])
            }
        })
    },[])

    return (
        <Transition>
            <div className={styles["edit-tab"]}>
                {behavior&&<Button onClick={()=>handleSave("save")} type="primary">保存</Button>}
                {!behavior&&<Button type="primary"  onClick={()=>handleSave("modify")}>修改</Button>}
                {<Button type="primary" danger onClick={handleDelete}>删除</Button>}
            </div>
            <Layout
                aside={
                    <CoordinateMenu
                        points={cubePoints}
                        onChange={(val) => {
                            handlePointsChange(val, "cube")
                        }}
                        lines={cubeLines}
                        onLineChange={(val) => handleLinesChange(val, "cube")}
                        back
                        title="自定义模板"
                    />
                }
                main={
                    <Box
                        cubePoints={points}
                        cubeLines={cubeLines}
                        points={points}
                        lines={lines}
                        custom={true}
                        totalPoints={totalPoints}
                    />
                }
                rightAside={
                    <CoordinateMenu
                        points={points}
                        totalPoints={totalPoints}
                        onChange={handlePointsChange}
                        lines={lines}
                        onLineChange={handleLinesChange}
                    />
                }></Layout>
        </Transition>
    );
};


export default App;
