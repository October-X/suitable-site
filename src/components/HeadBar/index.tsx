import React from 'react';
import styles from './style.less'

const Index = (props) => {
    const {title = "标题"} = props

    return (
        <div className={styles.root}>
            <div className="container__header">
                <div className="header_title">{title}</div>
            </div>
        </div>
    );
};

export default Index;
