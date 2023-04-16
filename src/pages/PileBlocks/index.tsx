/* eslint-disable guard-for-in */
import React, {useEffect, useRef, useState} from 'react';
import Layout from '@/components/Layout';
import PileBlocks from "@/components/Geometry/components/PileBlocks"
import Tip from './components/Tip'
import Keybroad from './components/Keybroad';
import {copyData, shallowExist} from "@/utils/processData";
import ViewMenu from "@/components/ViewMenu";
import Global from "@/global";

const viewOptions = {
    "front":[0,0,10],
    "behind":[0,0,-10],
    "left":[-10,0,0],
    "right":[10,0,0],
    "up":[0,10,0],
    "down":[0,-10,0],
}

const App: React.FC = (props: any) => {
    const [coordinate, setCoordinate] = useState([0, 0.5, 0])
    const pileBlocksRef = useRef()
    const [cubes, setCubes] = useState([])
    const map = {
        KeyW: "front",
        KeyQ: "up",
        KeyS: "behind",
        Enter: "confirm",
        KeyA: "left",
        KeyD: "right",
        Backspace: "cancel",
        KeyE: "down"
    }
    const options = {
        front: () => {
            coordinate[2] += 1
        },
        up: () => {
            coordinate[1] += 1
        },
        behind: () => {
            coordinate[2] -= 1
        },
        confirm: () => {
            console.log(cubes.length)
            if(shallowExist(cubes,coordinate)) return
            cubes.push(copyData(coordinate))
            setCubes([
                ...cubes
            ])
        },
        left: () => {
            coordinate[0] -= 1
        },
        right: () => {
            coordinate[0] += 1
        },
        cancel: () => {
            cubes.pop()
            setCubes([
                ...cubes
            ])
        },
        down: () => {
            coordinate[1] -= 1
        },
    }

    const handleClick = (val: string) => {
        options?.[val]()
        console.log(coordinate)
        setCoordinate([...coordinate])
    }

    const handleViewChange = (val:string)=>{
        const view = viewOptions[val]
        const changeCamera = Global.getStore("pileBlocksChangeCamera")
        changeCamera(view)
    }

    useEffect(() => {
        document.onkeydown = (event) => {
            options?.[map[event.code]]?.()
            setCoordinate([...coordinate])
        }
        return () => {
            document.onkeydown = null
        }
    }, [])


    return (
        <>
            <Layout
                main={
                    <PileBlocks
                        ref={pileBlocksRef}
                        coordinate={coordinate}
                        cubes={cubes}
                    />
                }
                rightAside={
                    <ViewMenu
                        onChange={handleViewChange}
                    />
                }></Layout>
            <Tip/>
            <Keybroad onClick={handleClick}/>
        </>
    );
};


export default App;
