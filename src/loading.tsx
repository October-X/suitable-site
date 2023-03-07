import React from 'react';
import logo from '@/assets/logo.png';
import style from '@/theme/default/style.less';

export default () => {
    return (
        <div className={style.container}>
            <div className={style.loading}>
                {/*<div className={style['loading__logo']}>*/}
                {/*  <img src={logo} alt="logo" />*/}
                {/*</div>*/}
                <div className={style['loading__main']}>
                    <div className={style['loading__main_item']}></div>
                    <div className={style['loading__main_item']}></div>
                    <div className={style['loading__main_item']}></div>
                    <div className={style['loading__main_item']}></div>
                    <div className={style['loading__main_item']}></div>
                    <div className={style['loading__main_item']}></div>
                </div>
            </div>
        </div>
    );
};
