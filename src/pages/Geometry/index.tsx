/* eslint-disable guard-for-in */
import React from 'react';
import FunctionMenu from '@/components/FunctionMenu';
import Layout from '@/components/Layout';
import CoordinateMenu from '@/components/CoordinateMenu'
import Geometry from "@/components/Geometry";

const App: React.FC = () => {
  return (
    <>
        <Layout aside={<FunctionMenu/>} main={<Geometry/>} rightAside={<CoordinateMenu/>}></Layout>
    </>
  );
};







export default App;
