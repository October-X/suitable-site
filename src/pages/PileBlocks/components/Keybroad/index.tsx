import React from 'react';
import styles from './style.less'
import {Button, Col, Row} from 'antd';

const Index = (props) => {
    const {onClick} = props
    const handleClick = (val:string)=>{
        onClick&&onClick(val)
    }

    return (
        <div className={styles.root}>
            <div className="keybroad">
                <Row gutter={[10, 10]}>
                    <Col span={6} onClick={()=>handleClick("up")}><Button>上</Button></Col>
                    <Col span={6} onClick={()=>handleClick("front")}><Button>前</Button></Col>
                    <Col span={6} onClick={()=>handleClick("down")}><Button>下</Button></Col>
                    <Col span={6} onClick={()=>handleClick("confirm")}><Button>确定</Button></Col>
                    <Col span={6} onClick={()=>handleClick("left")}><Button>左</Button></Col>
                    <Col span={6} onClick={()=>handleClick("right")} offset={6} ><Button>右</Button></Col>
                    <Col span={6} onClick={()=>handleClick("cancel")}><Button>撤回</Button></Col>
                    <Col span={6} onClick={()=>handleClick("behind")} offset={6}><Button>后</Button></Col>
                </Row>
            </div>
        </div>
    );
};

export default Index;
