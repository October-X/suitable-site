import {defineConfig} from '@umijs/max';
import routes from './routes';

export default defineConfig({
    antd: {},
    access: {},
    model: {},
    initialState: {},
    request: {},
    layout: {
        name: 'basicLayout',
        component: '@/layouts/default/index2.tsx',
    },
    routes,
    npmClient: 'yarn',
    lessLoader: {
        modifyVars: {
            hack: 'true; @import "@/theme/default/var.less";',
        },
        typescriptEnabled: true,
    },
    define: {
        'process.env.BASE_API': 'http://localhost:9999',
    },
    // dva:{},
});
