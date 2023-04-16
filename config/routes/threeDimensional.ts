import {DribbbleCircleFilled} from "@ant-design/icons";

export default [
    {
        name: 'login',
        path: '/login',
        component: './Login',
        strict: true,
        layout: false,
    },
    {
        name: '广场',
        path: '/cube/hexahedron/:id',
        component: './Geometry',
        strict: true,
        layout: false,
    },
    {
        name: '模板',
        path: '/cube/Model',
        component: './CubeModel',
        strict: true,
        layout: false,
    },
    {
        name: '叠方块',
        path: '/cube/pileBlocks',
        component: './PileBlocks',
        icon: DribbbleCircleFilled,
        strict: true,
        layout: false,
    },
    {
        name: '自定义模板',
        path: '/cube/customTemplate/:id',
        component: './CustomTemplate',
        icon: DribbbleCircleFilled,
        strict: true,
        layout: false,
    },
]
