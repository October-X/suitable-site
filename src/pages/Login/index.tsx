import React from 'react';
import styles from './style.less'
import logoUrl from '@/assets/logo.png'

const Login = () => {
  return (
    <div className={styles.root}>
        <div className="login">
            <div className="login__left">
                <div className="login__left_title">
                    <div className="title__logo">
                        <img src={logoUrl}  alt=''/>
                    </div>
                    <div className="title__content">SUITABLE</div>
                </div>
                <div className="login__left_content--big content-middle" >
                    带你走进数学乐园
                </div>
                <div className="login__left_content--small">
                    {/*你将体验到全新的数学学习方式，立体化的呈现将让数学变得更加直观生动，更容易理解，让你轻松掌握数学知识，探索数学世界的无限可能*/}
                    全新的数学学习方式，立体化的数学教学，探索数学世界的无限可能
                </div>
            </div>
            <div className="login__right"></div>
        </div>
    </div>
  );
};

export default Login;
