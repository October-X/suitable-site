import React, {useRef} from "react";
import {useFrame} from "@react-three/fiber";
import {Text} from "@react-three/drei";

const TextMesh = (props)=>{
    const {name} = props
    const meshRef = useRef()

    useFrame(({ camera }) => {
        meshRef.current.lookAt(camera.position)
    })

    return (
        <Text {...props} ref={meshRef}>
            {name}
        </Text>
    )
}

export default TextMesh
