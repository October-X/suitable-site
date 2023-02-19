import { defineConfig } from '@umijs/max';
import routes from './route';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'SUTIABLE',
    name: 'myLayout',
    conponent: '../src/layouts/index.tsx',
  },
  routes,
  npmClient: 'yarn',
  lessLoader: {
    modifyVars: {
      hack: 'true; @import "@/theme/default/var.less";',
    },
    typescriptEnabled: true,
  },
});
