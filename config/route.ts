import {
  HomeFilled,
  GoldenFilled,
  AppstoreFilled,
  DribbbleCircleFilled,
  DashboardFilled,
  BuildOutlined,
} from '@ant-design/icons';

export default [
  

  // 这边的路径实在src/page目录下
  {
    path: '/',
    // redirect: '/home',
    headerRender: false,
    menuRender: false,
    component: '../layouts/default',
    // layout:null,
    routes: [
      {
        name: '首页',
        path: '/home',
        component: './Home',
        // menuRender: false,
        icon: HomeFilled,
      },
      {
        name: '权限演示',
        path: '/access',
        component: './Access',
        icon: GoldenFilled,
      },
      {
        name: ' CRUD 示例',
        path: '/table',
        component: './Table',
        icon: AppstoreFilled,
      },

      {
        name: ' 立方体',
        path: '/cube',
        component: './Cube',
        icon: DribbbleCircleFilled,
      },
      
      // {
      //   name: ' 测试',
      //   path: '/test',
      //   component: './Test',
      //   icon: BuildOutlined,
      // },
      {
        name: ' 测试2',
        path: '/test2',
        component: './Test2',
        icon: DashboardFilled,
        
      },
    ],
  },
  {
    name: '六面体',
    path: '/cube/hexahedron',
    component: './Geometry',
    strict :true,
    headerRender: false,
    menuRender: false,
  },
  
];
