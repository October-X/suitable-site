import React, {useRef, Suspense, useState} from 'react';
import {Canvas, useFrame} from '@react-three/fiber';
import {Edges, Preload } from "@react-three/drei";
import * as THREE from 'three';
import CanvasLoader from "@/components/Canvas/Loader";

const threeIcons = {
    "cube": {
        modal: <boxGeometry args={[3, 3, 3]}/>,
        color: '#8472e2',
    },
    "circularCone": {
        modal: <coneGeometry args={[2, 3, 32]}/>,
        color: '#2c97db'
    },
    "circularColumn": {
        modal: <cylinderGeometry args={[2, 2, 4, 32]}/>,
        color: '#58b938'
    },
    "sphere": {
        modal: <sphereGeometry args={[2, 32, 32]}/>,
        color: '#d89f38'
    },
    "oblong": {
        modal: <planeGeometry args={[4, 3]}/>,
        color: '#eb5b72'
    },
    "circle": {
        modal: <circleGeometry args={[2, 32]}/>,
        color: '#8b898a'
    },
    "pileBlocks":{
        modal: <boxGeometry args={[3, 3, 3]}/>,
        color: '#d89f38'
    }
}

function Cube(props: any) {
    const {type = "cube"} = props
    // @ts-ignore
    const Modal = threeIcons?.[type]?.modal
    // @ts-ignore
    const color = threeIcons?.[type]?.color
    const mesh = useRef()

    useFrame(() => {
            mesh.current.rotation.z += 0.01
    })

    return (
        <mesh ref={mesh}>
            {Modal}
            <meshBasicMaterial color={color} transparent={true} depthWrite={false} opacity={0.5}
                               side={THREE.FrontSide}/>
            <Edges color={'#ffffff'}/>
        </mesh>
    );
}

function App(props) {
    const {type} = props
    const [isLoading,setIsLoading] = useState(true)
    setTimeout(()=>{
        setIsLoading(false)
    },500)
    return (
        !isLoading&&<Canvas
            camera={{
                fov: 75,
                aspect: 1,
                near: 0.01,
                far: 1000,
                position: [0, 0, 5],
                zoom: 1
            }}
        >
            <Suspense fallback={<CanvasLoader/>}>
                <Cube type={type}/>
            </Suspense>
            <Preload all/>
        </Canvas>
    );
}

export default App;
