/* eslint-disable guard-for-in */
import React from 'react';
import {Outlet} from '@umijs/max';
import routes from '@/../config/routes/main';
import Menu from '@/components/menu';
import Layout from '@/components/Layout';
import {Provider} from 'react-redux'
import store from '@/store'

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Layout aside={<Menu routes={routes[0].routes}/>} main={
                <Outlet/>
            }></Layout>
        </Provider>
    );
};

export default App;
