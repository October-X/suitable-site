import React, {useEffect, useImperativeHandle, useRef, useState} from 'react';
import {Canvas, useThree} from '@react-three/fiber'
import {Grid, OrbitControls, GizmoHelper, GizmoViewport, Edges } from '@react-three/drei'
import styles from "@/components/Geometry/style/style.less";
import ResizeDetector from "react-resize-detector";
import {debounce} from "@/utils/common";
import Global from '@/global'

const Box = React.forwardRef((props:any,ref)=>{
    const {coordinate} = props
    const { camera } = useThree();
    const changeCamera = (val:number[]=[0,0,0]) => {
        camera.position.set(...val);
    };
    useImperativeHandle(ref, () => ({
        changeCamera
    }));
    useEffect(()=>{
        Global.setStore("pileBlocksChangeCamera",changeCamera)
    },[])
    return (
        <mesh position={coordinate}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color={"#eb5b72"} transparent={true} depthWrite={false} opacity={0.5}/>
            <Edges color={'#ffffff'}/>
        </mesh>
    );
})

const PileBlocks =  React.forwardRef((props,ref) => {
    const {coordinate,cubes} = props
    const BoxRef = useRef()
    const [containerSize, setContainerSize] = useState({
        width: 0,
        height: 0
    })
    useImperativeHandle(ref, () => ({
        changeCamera:BoxRef?.current?.changeCamera
    }),[[BoxRef]]);
    const debounceHandleResize = debounce((width: number, height: number) => {
        setContainerSize({width, height})
    }, 100)


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
                        near: 0.1,
                        far: 200,
                        position: [4, 3, 6],
                        zoom: 1
                    }}>
                    <Grid args={[20, 20]} cellSize={0} position={[0.5,0,0.5]}/>
                    <Box ref={BoxRef} coordinate={coordinate} key={coordinate}/>
                    {
                        cubes.map((item,index:number)=>(
                            <mesh position={item} key={'c'+index}>
                                <boxGeometry args={[1, 1, 1]} />
                                <meshBasicMaterial color={"#56a7e3"} />
                                <Edges color={'#ffffff'}/>
                            </mesh>
                        ))
                    }
                    <OrbitControls makeDefault rotateSpeed={1} enableDamping={true}/>
                    <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                        <GizmoViewport axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']} labelColor="white" labels={["Y", "Z", "X"]}/>
                    </GizmoHelper>
                </Canvas>
            </div>
        </ResizeDetector>
    );
});

export default PileBlocks;
