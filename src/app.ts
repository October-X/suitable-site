// 运行时配置
/* eslint-disable guard-for-in */

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate

// import logo from './assets/logo.png'
// export async function getInitialState(): Promise<{ name: string }> {
//   return { name: '@umijs/max' };
// }

// export const layout = () => {
//   return {
//     // logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
//     menu: {
//       locale: false,
//     },
//   };
// };


//初始化主题
const defaultTheme = {
    '--background-color': '#f4f7ff',
    '--theme-color': '#fd8b35',
    '--font-color': '#97a09b',
    '--nav-active-color': '#0b2021',
    '--box-background-color': '#ffffff',
    '--main-shadow-color': '#eeeeee',
  };
const changeTheme = (datas: object) => {
  for (const key in datas) {
    //@ts-ignore
    document.documentElement.style.setProperty(key, datas[key]);
  }
};

let theme = localStorage.getItem('theme');
if (theme) {
  changeTheme(theme?JSON.parse(theme):defaultTheme);
}
