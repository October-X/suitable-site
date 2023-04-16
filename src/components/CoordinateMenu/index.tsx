import styles from './style.less';
import CoordinateEditor from '@/components/CoordinateEditor';
import {LeftCircleOutlined} from "@ant-design/icons";
import React from "react";
import {history} from "umi";

const CoordinateMenu = (props: any) => {
    const {points=[], onChange, lines = [], onLineChange,type,totalPoints=[],back,title} = props
    const handleChange = (val: []) => {
        onChange(val)
    }

    const handleLineChange = (val: []) => {
        onLineChange(val)
    }

    const handleGoBack = ()=>{
        history.back()
    }

    return (
        <div className={styles.root}>
            <div className="coordinate-menu">
                {
                    back&&title&&(<div className="coordinate-menu__header">
                        <div className="coordinate-menu__header_container">
                            {back && <div
                                className="coordinate-menu__header_container__icon"
                                onClick={handleGoBack}
                            >
                                <LeftCircleOutlined/>
                            </div>}
                            {title&&<div className="coordinate-menu__header_container__title">{title}</div>}
                            <div></div>
                        </div>
                    </div>)
                }
                <div className="coordinate-menu__nav">
                    <CoordinateEditor points={points} lines={lines} onChange={handleChange}
                                      onLineChange={handleLineChange} type={type} totalPoints={totalPoints}/>
                </div>
            </div>
        </div>
    );
};

export default CoordinateMenu;
