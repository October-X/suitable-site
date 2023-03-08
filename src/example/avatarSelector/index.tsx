import React, {useRef} from 'react';
import AvatarSelector from "@/components/AvatarSelector";
import {Divider, Button} from "antd";
import {PageContainer} from "@ant-design/pro-components";
import ExerciseStatistics from '@/components/ExerciseStatistics'

const App = () => {
    const testRef = useRef(null)
    const test2Ref = useRef(null)
    const handleClick = () => {
        // @ts-ignore
        testRef.current?.showModal()
    }

    return (
        <PageContainer>
            <Divider orientation="left">头像弹窗</Divider>
            <Button onClick={handleClick}>打开</Button>
            <AvatarSelector ref={testRef} defaultValue={2}/>
            <Divider orientation="left">统计弹窗</Divider>
            <Button onClick={()=>{test2Ref.current?.showModal()}}>打开</Button>
            <ExerciseStatistics ref={test2Ref}/>
        </PageContainer>
    );
};

export default App;
