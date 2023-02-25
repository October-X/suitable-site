import React, { useEffect, useState, useRef } from 'react';
import styles from './style.less';
import logo from '@/assets/logo.png';
import { history, useLocation } from 'umi';
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  GoogleCircleFilled,
} from '@ant-design/icons';
import { Drawer, Space, Button } from 'antd';
import ColorPicker from '@/components/ColorPicker';

interface ColorConfigItem {
  name: string;
  label: string;
  value: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const findRouter = (routes: any, pathname: string): null | object => {
  let result = null;
  for (const val of routes) {
    if (val.key === pathname) {
      return val;
    }
    if (val.children) {
      result = findRouter(val.children, pathname);
    }
  }
  return result;
};
const localData = localStorage.getItem('theme')
const originColors = localData && JSON.parse(localData);
console.log(originColors);

const defaultTheme = {
  '--background-color': '#f4f7ff',
  '--theme-color': '#fd8b35',
  '--font-color': '#97a09b',
  '--nav-active-color': '#0b2021',
  '--box-background-color': '#ffffff',
  '--main-shadow-color': '#eeeeee',
  '--main-background-color': '#ffffff',
  '--main-font-color': '#000000',
};

const themes = [
  // 极简白橙
  {
    '--background-color': '#f4f7ff',
    '--theme-color': '#fd8b35',
    '--font-color': '#97a09b',
    '--nav-active-color': '#0b2021',
    '--box-background-color': '#ffffff',
    '--main-shadow-color': '#eeeeee',
    '--main-background-color': '#ffffff',
    '--main-font-color': '#000000',
  },
  // 极简白绿
  {
    '--background-color': '#f4f7ff',
    '--theme-color': '#1cbf73',
    '--font-color': '#97a09b',
    '--nav-active-color': '#1cbf73',
    '--box-background-color': '#ffffff',
    '--main-shadow-color': '#eeeeee',
    '--main-background-color': '#ffffff',
    '--main-font-color': '#000000',
  },
  // 极简桃粉
  {
    '--background-color': '#f4a2b3',
    '--theme-color': '#ff7a7a',
    '--font-color': '#ffffff',
    '--nav-active-color': '#ff8a8a',
    '--box-background-color': '#ffc7d2',
    '--main-shadow-color': '#ffd6d6',
    '--main-background-color': '#ffffff',
    '--main-font-color': '#000000',
  },
  // 天空粉白
  {
    '--background-color': '#b8c6d1',
    '--theme-color': '#ebcac5',
    '--font-color': '#a0aebb',
    '--nav-active-color': '#ebcac5',
    '--box-background-color': '#ffffff',
    '--main-shadow-color': '#ebebeb',
    '--main-background-color': '#ffffff',
    '--main-font-color': '#000000',
  },
  // 极简蓝白
  {
    '--background-color': '#29375a',
    '--theme-color': '#36d2c4',
    '--font-color': '#596788',
    '--nav-active-color': '#36d2c4',
    '--box-background-color': '#ffffff',
    '--main-shadow-color': '#ebebeb',
    '--main-background-color': '#ffffff',
    '--main-font-color': '#000000',
  },
  //白紫
  {
    '--background-color': '#d1d6f3',
    '--theme-color': '#9c558d',
    '--font-color': '#97a09b',
    '--nav-active-color': '#be9dda',
    '--box-background-color': '#ffffff',
    '--main-shadow-color': '#eeeeee',
    '--main-background-color': '#ffffff',
    '--main-font-color': '#000000',
  },
];

/**
 * 导航组件
 */
const App: React.FC = (props: any) => {
  const {routes} = props;
  const [activeRoute, setActiveRoute] = useState('');
  const [colors, setColors] = useState(
      originColors ? originColors : defaultTheme,
  );
  const [shrink, setShrink] = useState(false);
  const location = useLocation();
  const handleClick = (route: string) => {
    history.replace(route);
  };

  const changeTheme = (datas: object) => {
    //@ts-ignore
    setColors({
      ...datas,
    });

    localStorage.setItem('theme', JSON.stringify(datas));
    // eslint-disable-next-line guard-for-in
    for (const key in datas) {
      //@ts-ignore
      document.documentElement.style.setProperty(key, datas[key]);
    }
  };

  const [open, setOpen] = useState(false);
  const colorPickerRef = useRef();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onConfirm = () => {
    //@ts-ignore
    const data = colorPickerRef?.current?.data;
    changeTheme(data);
    setOpen(false);
  };

  const onDefault = () => {
    changeTheme(defaultTheme);
    setOpen(false);
  };

  const configs: ColorConfigItem[] = [
    {
      name: '--background-color',
      value: '#f4f7ff',
      label: '页面背景颜色',
    },
    {
      name: '--theme-color',
      value: '#f4f7ff',
      label: '主题颜色',
    },
    {
      name: '--box-background-color',
      value: '#f4f7ff',
      label: '导航栏背景颜色',
    },
    {
      name: '--main-background-color',
      value: '#f4f7ff',
      label: '主体背景颜色',
    },
    {
      name: '--main-font-color',
      value: '#f4f7ff',
      label: '主体文字颜色',
    },
    {
      name: '--font-color',
      value: '#f4f7ff',
      label: '导航栏文字颜色',
    },
    {
      name: '--nav-active-color',
      value: '#f4f7ff',
      label: '文字激活颜色',
    },

    {
      name: '--main-shadow-color',
      value: '#f4f7ff',
      label: '阴影颜色',
    },
  ];

  const findActiveRoute = function (route: string) {
    const result = routes.find((r: any) => route.includes(r.path));
    return result ? result.path : null;
  };

  useEffect(()=>{
    const originColors = localStorage.getItem('theme')
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    originColors ? setColors(originColors) :''
  },[])

  useEffect(() => {

    setActiveRoute(findActiveRoute(location.pathname));
  }, [location]);

  return (
    <div className={styles.root}>
      <div
          className={
            shrink
                ? 'controller controller--shrink'
                : 'controller'
          }
      >
        <div className={'menu'}>
          <div
              className={
                shrink
                    ? 'menu__header menu__header--shrink'
                    : 'menu__header'
              }
          >
            <div className='header_main'>
              <div className='header_main__logo'>
                <img src={logo} alt="logo" />
              </div>
              <div className='header_main__title'>SUTIABLE</div>
            </div>
          </div>
          <div className='menu__nav'>
            <div className='nav_container'>
              {routes.map((item: any) => (
                  <div
                      className={
                        item.path === activeRoute
                            ? 'nav__item nav__item--active'
                            : 'nav__item'
                      }
                      onClick={() => handleClick(item.path)}
                      key={item.path}
                  >
                    <div className='nav__item_icon'>
                      {item.icon ? <item.icon style={{ fontSize: '28px' }} /> : ''}
                    </div>
                    <div className='nav__item_content'>{item.name}</div>
                  </div>
              ))}
            </div>
            <div
                className={
                  shrink
                      ? 'welcome welcome--shrink'
                      : 'welcome'
                }
            >
              <div className='welcome__title'>
                <p>WelCome To Use</p>
                <p>Suitable</p>
              </div>
              <div className='welcome__info'>
                Help you learn solid geometry
              </div>
              <div className='welcome__btn' onClick={showDrawer}>
                <div>Design Theme</div>
                <div>
                  <GoogleCircleFilled style={{ fontSize: '24px' }} />
                </div>
              </div>
            </div>
          </div>
          <div
              className={
                shrink
                    ? 'menu__btn menu__btn--shrink'
                    : 'menu__btn'
              }
              onClick={() => setShrink(!shrink)}
          >
            <div className='menu__btn_icon'>
              {shrink ? (
                  <DoubleRightOutlined style={{ fontSize: '34px' }} />
              ) : (
                  <DoubleLeftOutlined style={{ fontSize: '34px' }} />
              )}
            </div>
          </div>
        </div>
        <Drawer
            title="Custom Theme"
            placement="left"
            width={350}
            onClose={onClose}
            open={open}
            extra={
              <Space>
                {/*<Button onClick={onDefault}>default</Button>*/}
                <Button type="primary" onClick={onConfirm}>
                  OK
                </Button>
              </Space>
            }
        >
          <div className={styles.container}>
            <ColorPicker
                //@ts-ignore
                config={configs}
                colors={colors}
                ref={colorPickerRef}
            ></ColorPicker>
            <div className='themes'>
              {themes.map((item, index) => (
                  <div className='theme__item' key={index}>
                    <div
                        className='theme_btn'
                        onClick = {()=>{
                          changeTheme(item)
                          setOpen(false)
                        }}
                        style={{
                          background: `linear-gradient(to left, ${item['--theme-color']} 50%, ${item['--background-color']} 50%)`,
                        }}
                    ></div>
                  </div>
              ))}
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default App;
