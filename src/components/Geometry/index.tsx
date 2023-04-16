import React, {useEffect, useImperativeHandle, useRef, useState} from 'react'
import {Canvas,} from '@react-three/fiber'
import {OrbitControls, GizmoViewport, GizmoHelper,} from '@react-three/drei'
import {debounce} from '@/utils/common';
import ResizeDetector from "react-resize-detector";
import styles from './style/style.less'
import Box from "@/components/Geometry/components/Box";


const App = React.forwardRef((props: any, ref) => {
    const BoxRef = useRef(null)
    const {
        size = {
            depth: 6,
            width: 6,
            height: 6
        },
        color = "#58b938",
        points = [],
        totalPoints = [],
        lines = [],
        type = "cube",
        rotate = false,
        cubePoints = [],
        cubeLines = [],
        custom = false,
    } = props
    const [flag,setFlag] = useState(0)

    const [containerSize, setContainerSize] = useState({
        width: 0,
        height: 0
    })

    const debounceHandleResize = debounce((width: number, height: number) => {
        setContainerSize({width, height})
    }, 100)

    useImperativeHandle(ref, () => {
        console.log(BoxRef?.current, 123123123)
        return {
            changeCamera: BoxRef?.current?.changeCamera
        }
    });

    useEffect(()=>{
        setFlag(1)
    },[])

    return (

        <ResizeDetector
            handleWidth
            handleHeight
            onResize={debounceHandleResize}
        >
            <div className={styles.container}>
                <Canvas
                    style={{width: containerSize.width, height: containerSize.height}}
                    camera={{
                        fov: 45,
                        aspect: 1,
                        near: 1,
                        far: 1000,
                        position: [4, 3, 6],
                        zoom: 1,
                    }}>
                    <ambientLight/>
                    <pointLight position={[0, 0, 0]}/>
                    {/*{custom && <Grid args={[20, 20]} cellSize={0} position={[0, -3, 0]}/>}*/}
                    <Box
                        ref={BoxRef}
                        position={[0, 0, 0]}
                        type={type}
                        size={size}
                        color={color || "#58b938"}
                        points={totalPoints.length ? totalPoints : points}
                        lines={lines}
                        rotate={rotate}
                        custom={custom}
                        cubePoints={cubePoints}
                        cubeLines={cubeLines}
                    />
                    <OrbitControls/>
                    <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                        <GizmoViewport axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']} labels={["Y", "Z", "X"]}
                                       labelColor="white"/>
                    </GizmoHelper>
                </Canvas>
            </div>
        </ResizeDetector>
    )
})

export default App
