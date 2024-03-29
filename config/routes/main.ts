import {
    AppstoreFilled,
    DribbbleCircleFilled,
    FundFilled,
    GoldenFilled,
    HomeFilled,
    SmileFilled
} from "@ant-design/icons";

export default [
    {
        path: '/',
        layout:false,
        component: '../layouts/default',
        routes: [
            {
                name: '首页',
                path: '/home',
                component: './Home',
                icon: HomeFilled,
            },
            {
                name: '模型展示',
                path: '/modelDisplay',
                component: './ModelDisplay',
                icon: GoldenFilled,
            },
            {
                name: '几何世界',
                path: '/geometricCenter',
                component: './GeometricCenter',
                icon: AppstoreFilled,
            },
            {
                name: '例题解析',
                path: '/exampleAnalysis',
                component: './ExampleAnalysis',
                icon: FundFilled,
            },
            {
                name: '学生管理',
                path: '/studentManagement',
                component: './StudentManagement',
                icon: SmileFilled,
            },
            {
                name: '用户管理',
                path: '/userManagement',
                component: './UserManagement',
                icon: SmileFilled,
            },
            {
                name: '个人中心',
                path: '/personalCenter',
                component: './PersonalCenter',
                icon: DribbbleCircleFilled,
            },
            {
                name: '组件测试',
                path: '/example/avatarSelector',
                component: '../example/avatarSelector',
                icon: DribbbleCircleFilled,
            },

            // {
            //   name: ' 测试2',
            //   path: '/test2',
            //   component: './Test2',
            //   icon: DashboardFilled,
            // },
            //
            // {
            //   name: ' 测试',
            //   path: '/test',
            //   component: './Test',
            //   icon: BuildOutlined,
            // },
        ],
    }
]
