/* eslint-disable guard-for-in */
import React, {useRef} from 'react';
import FunctionMenu from '@/components/FunctionMenu';
import Layout from '@/components/Layout';
import CoordinateMenu from '@/components/CoordinateMenu'
import Geometry from "@/components/Geometry";

const App: React.FC = () => {
    const geometryRef = useRef();

    const changeSize = (depth, width, height) => {
        geometryRef.current.changeSize(depth, width, height)
    }

    return (
        <>
            <Layout aside={<FunctionMenu changeSize={changeSize}/>} main={<Geometry ref={geometryRef}/>}
                    rightAside={<CoordinateMenu/>}></Layout>
        </>
    );
};


export default App;
