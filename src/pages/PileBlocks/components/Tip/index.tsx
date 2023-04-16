import React from 'react';
import styles from './style.less'
import {Space} from "antd";

const Index = () => {
    return (
        <div className={styles.root}>
           <div className="tip">
               <Space size={20}>
                   <span>上: <span className="tip__key">Q</span></span>
                   <span>下: <span className="tip__key">E</span></span>
                   <span>左: <span className="tip__key">A</span></span>
                   <span>右: <span className="tip__key">D</span></span>
                   <span>前: <span className="tip__key">W</span></span>
                   <span>后: <span className="tip__key">S</span></span>
                   <span>确定: <span className="tip__key">Enter</span></span>
                   <span>撤销: <span className="tip__key">BackSpace</span></span>
               </Space>
           </div>
        </div>
    );
};

export default Index;
