/* eslint-disable guard-for-in */
import React, {useEffect} from 'react';
import styles from './style.less';
import {history} from "umi";

//判断是否是首次进入
let flag = 0
const App: React.FC = (props: any) => {
    const {aside, main, rightAside} = props;

    useEffect(() => {
        if (!flag) {
            history.replace('/home')
            flag = 1
        }
    }, [])

    return (
        <div className={styles.root}>
            <div className="suitable">
                <div className="suitable__left">{aside ? aside : ''}</div>
                <React.Suspense>
                    <div className="suitable__main">{main ? main : ''}</div>
                </React.Suspense>
                {rightAside ? <div className="suitable__right">{rightAside}</div> : ''}
            </div>
        </div>
    );
};

export default App;
