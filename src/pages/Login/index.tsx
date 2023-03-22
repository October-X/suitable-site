import React from 'react';
import styles from './style.less';
import logoUrl from '@/assets/logo.png';
import LoginForm from '@/components/LoginForm'
import 'animate.css'
import {EarthCanvas} from '@/components/canvas'
import {StarsCanvas} from '@/components/canvas'

const Login = () => {

    return (
        <div className={styles.root}>
            <div className="login">
                <div className="login__left">
                    <div className="login__left_title animate__animated animate__backInLeft animate__faster">
                        <div className="title__logo">
                            <img src={logoUrl} alt=""/>
                        </div>
                        <div className="title__content">SUITABLE</div>
                    </div>
                    <div
                        className="login__left_content--big content-middle animate__animated animate__backInLeft animate__fast">
                        带你走进数学乐园
                    </div>
                    <div className="login__left_content--small animate__animated animate__backInLeft">
                        全新的数学学习方式，立体化的数学教学，探索数学世界的无限可能
                    </div>
                    <div className="earth">
                        <div>
                            <EarthCanvas/>
                        </div>
                    </div>
                    <StarsCanvas/>
                </div>
                <div className="login-form login__right animate__animated animate__backInRight">
                    <LoginForm/>
                </div>
            </div>
        </div>
    );
};

export default Login;
