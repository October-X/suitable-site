/* eslint-disable guard-for-in */
import React from 'react';
import styles from './style.less';

const App: React.FC = (props: any) => {
    const {aside, main, rightAside} = props;

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
