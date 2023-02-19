/* eslint-disable guard-for-in */
import React from 'react';
import { Outlet } from '@umijs/max';
import routes from '@/../config/route';
import Menu from '@/components/menu';
import Layout from '@/components/Layout';

const App: React.FC = () => {
  return (
    <Layout aside={<Menu routes={routes[0].routes} />} main={<Outlet />}></Layout>
  );
};

export default App;