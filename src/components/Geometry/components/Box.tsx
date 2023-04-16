import React, { useEffect, useImperativeHandle, useRef, useState} from "react";
import {useFrame, useThree} from "@react-three/fiber";
import {Edges, Line} from "@react-three/drei";
import TextMesh from "@/components/Geometry/components/TextMesh";
import Global from '@/global'

const Box = React.forwardRef((props: any, ref) => {
    const mesh = useRef()
    const {camera} = useThree();
    const [hovered, setHovered] = useState(null)
    const {size, color, points, lines, type: propsType, rotate, custom, cubeLines} = props
    const threeModels = {
        "cube": <boxGeometry args={[size.depth, size.height, size.width]}/>,
        "circularCone": <coneGeometry args={[size.depth, size.width, 100]}/>,
        "circularColumn": <cylinderGeometry args={[size.depth, size.depth, size.width, 100]}/>,
        "sphere": <sphereGeometry args={[size.depth, 100, 100]}/>,
        "oblong": <planeGeometry args={[size.depth, size.width]}/>,
        "circle": <circleGeometry args={[size.depth, 100]}/>,
    }
    // @ts-ignore
    const Model = threeModels[propsType]

    const changeCamera = (val: number[] = [0, 0, 0]) => {
        camera.position.set(...val);
    };
    useImperativeHandle(ref, () => ({
        changeCamera
    }));

    useFrame(() => {
        if (rotate) {
            mesh.current.rotation.x = mesh.current.rotation.y += 0.01
        } else {
            mesh.current.rotation.x = mesh.current.rotation.y = 0
        }
    })

    useEffect(()=>{
        Global.setStore("changeCamera",changeCamera)
    },[])

    const calculateCoordinates = (points: number[], type = 'point') => {
        let originPoint = [0, 0, 0]
        if (propsType === "cube") {
            originPoint = [-size.depth / 2, -size.width / 2, type === 'text' ? -size.height / 2 + 0.5 : -size.height / 2];
        } else if (propsType === "circularCone" || propsType === "circularColumn") {
            originPoint = [0, 0, type === 'text' ? -size.width / 2 + 0.5 : -size.width / 2];
        } else {
            originPoint = [-size.depth / 2, 0, type === 'text' ? -size.width / 2 + 0.5 : -size.width / 2];
            let result: number[] = originPoint.map((item, index) => {
                if (index === 1) return 0
                return item + points[index]
            });
            [result[0], result[2]] = [result[2], result[0]];
            [result[1], result[0]] = [result[0], result[1]]
            return result
        }
        let result: number[] = originPoint.map((item, index) => item + points[index]);
        [result[0], result[2]] = [result[2], result[0]];
        [result[1], result[0]] = [result[0], result[1]]
        return result
    }

    const getPoint = (lineObj) => {
        let start = points.find(item => item.name === lineObj.start)?.point
        let end = points.find(item => item.name === lineObj.end)?.point
        return [calculateCoordinates(start), calculateCoordinates(end)]
    }

    return (
        <mesh {...props} ref={mesh} scale={custom ? [1, 1, 1] : [0.3, 0.3, 0.3]}
        >
            {!custom && Model}
            <meshBasicMaterial color={color} transparent={true} depthWrite={false} opacity={0.5}/>
            {!custom && <Edges color={'#999999'}/>}

            {
                points.map((item: { name: string, point: [] }, index: number) => (
                    <mesh key={'p' + item.name}
                          position={calculateCoordinates(item.point)}
                          onPointerUp={(e) => (e.stopPropagation(), setHovered(index))}
                    >
                        <sphereGeometry args={[0.1, 16, 16]}/>
                        <meshStandardMaterial color={hovered === index ? 'red' : 'black'}/>
                    </mesh>
                ))
            }
            {
                points.map((item: { name: string, point: [] }, index: number) => (
                    <TextMesh key={'t' + item.name} position={calculateCoordinates(item.point, "text")} fontSize={0.6}
                              onPointerUp={(e) => (e.stopPropagation(), setHovered(index))}
                              color={"black"} name={item.name}>
                        {/*{item.name}*/}
                    </TextMesh>
                ))
            }
            {
                lines.map((item, index: number) => (
                    <Line key={'l' + index} points={getPoint(item)} color="black" dashSize={0.3}
                          gapSize={0.3} forceSinglePass={undefined} dashed/>
                ))
            }
            {
                cubeLines?.map((item, index: number) => (
                    <Line key={'cl' + index} points={getPoint(item, "cube")} color="black"
                          forceSinglePass={undefined}/>
                ))
            }

        </mesh>
    )
})

export default Box
