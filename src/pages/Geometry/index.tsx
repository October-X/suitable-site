/* eslint-disable guard-for-in */
import React from 'react';
import { Outlet } from '@umijs/max';
import FunctionMenu from '@/components/FunctionMenu';
import Layout from '@/components/Layout';
import CoordinateMenu from '@/components/CoordinateMenu'

const App: React.FC = () => {
  return (
    <>
    <Layout aside={<FunctionMenu />} main={<Outlet />} rightAside={<CoordinateMenu />}></Layout>
    </>
  );
};







export default App;