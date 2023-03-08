import React, {useRef} from 'react';
import AvatarSelector from "@/components/AvatarSelector";
import {Divider, Button} from "antd";
import {PageContainer} from "@ant-design/pro-components";

const App = () => {
    const testRef = useRef(null)
    const handleClick = () => {
        // @ts-ignore
        testRef.current?.showModal()
    }

    return (
        <PageContainer>
            <Divider orientation="left">头像弹窗</Divider>
            <Button onClick={handleClick}>打开</Button>
            <AvatarSelector ref={testRef} defaultValue={2}/>
        </PageContainer>
    );
};

export default App;
