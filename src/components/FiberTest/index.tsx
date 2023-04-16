import React, {useRef} from 'react'
import {Canvas, useFrame} from '@react-three/fiber'
import {Text, Line, OrbitControls, Edges } from '@react-three/drei'

function Box(props) {
    const mesh = useRef()

    useFrame(() => {
        // mesh.current.rotation.x = mesh.current.rotation.y += 0.01
    })

    return (
        <mesh {...props} ref={mesh}>
            <boxGeometry args={[4, 4, 4]}/>
            <meshBasicMaterial color={"#6ced44"} transparent={true} depthWrite={false} opacity={0.5}/>
            <Edges color={"#145f02"}/>
            <mesh position={[-1, -1, -1]}>
                <sphereGeometry args={[0.1, 16, 16]}/>
                <meshStandardMaterial color={'black'}/>
            </mesh>
            <Text position={[-1, -0.5, -1]} fontSize={0.5} color={"black"}>
                A
            </Text>
            <Line points={[[-2, -2, -2], [2, 2, 2]]} color="red" dashSize={0.1 }
                        gapSize={0.1} forceSinglePass={undefined} dashed/>
        </mesh>
    )
}

function App() {
    return (
        <Canvas
            style={{width: 400, height: 400}}
            camera={{
                fov: 45,
                aspect: 400 / 400,
                near: 1,
                far: 1000,
                position: [-4, 3, 6],
            }}>
            <ambientLight/>
            <pointLight position={[0, 0, 0]}/>
            <Box position={[0, 0, 0]}/>
            <OrbitControls rotateSpeed={1} enableDamping={false}/>
        </Canvas>
    )
}

export default App
