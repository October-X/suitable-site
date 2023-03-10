// @flow
import * as React from 'react';
import styles from './style.less'
import {LeftCircleOutlined} from '@ant-design/icons'
import {useNavigate} from "@@/exports";


type Props = {};
const PageContainer = (props: Props) => {
    const navigator = useNavigate();
    const handleGoBack = () => {
        navigator(-1);
    };

    return (
        <div className={styles.root}>
            <div className="container">
                <div className="container__header">
                    <div className="header_icon" onClick={handleGoBack}><LeftCircleOutlined/></div>
                    <div className="header_title">例题详情</div>
                </div>
                <div className="container__main">
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default PageContainer
