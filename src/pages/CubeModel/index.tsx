/* eslint-disable guard-for-in */
import React, {useRef, useState} from 'react';
import FunctionMenu from '@/components/FunctionMenu';
import Layout from '@/components/Layout';
import Box from "@/components/Geometry"
import {useLocation} from "umi";
import ViewMenu from "@/components/ViewMenu";
import Global from '@/global'

const viewOptions = {
    "front": [0, 0, 10],
    "behind": [0, 0, -10],
    "left": [-10, 0, 0],
    "right": [10, 0, 0],
    "up": [0, 10, 0],
    "down": [0, -10, 0],
}
const App: React.FC = (props: any) => {
    const location = useLocation()
    const type = location?.state?.data;
    const boxRef = useRef()
    const [size, setSize] = useState({
        depth: 6,
        width: 6,
        height: 6
    });
    const [rotate, setRotate] = useState(false)
    const [color, setColor] = useState('')
    const [points, setPoints] = useState([])
    const [lines, setLines] = useState([])

    const handleChangeSize = (val: object) => {
        // geometryRef.current.changeSize(depth, width, height)
        setSize(val)
    }

    const handleChangeColor = (val: string) => {
        setColor(val)
    }

    const handleBtnChange = (val: string | {}) => {
        if (val.rotate !== undefined) {
            setRotate(val.rotate)
            return
        }
        if (val === "reset") {
            setLines([])
            setPoints([])
            setColor('')
            setRotate(false)
            setSize({
                depth: 6,
                width: 6,
                height: 6
            })
        }
    }

    const handleViewChange = (val: string) => {
        const view = viewOptions[val]
        const changeCamera = Global.getStore("pileBlocksChangeCamera")
        changeCamera(view)
    }

    return (
        <Layout
            aside={
                <FunctionMenu
                    size={size}
                    changeSize={handleChangeSize}
                    changeColor={handleChangeColor}
                    type={type}
                    onChange={handleBtnChange}
                    rotateValue={rotate}
                />
            }
            main={
                <Box
                    ref={boxRef}
                    size={size}
                    color={color}
                    points={points}
                    lines={lines}
                    type={type}
                    rotate={rotate}
                />
            }
            rightAside={
                <ViewMenu
                    onChange={handleViewChange}
                />
            }></Layout>
    );
};


export default App;
