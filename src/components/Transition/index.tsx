import React from 'react';
import 'animate.css'
import styles from './style.less'

export default function Transition(props:any) {
    return (
        <div className={styles.root}>
            {props.children}
        </div>
    );
}
