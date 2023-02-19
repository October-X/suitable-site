import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';
import VirualScroller from '@/components/VirualScroller';
import {useRef} from 'react'
import {useNavigate,history } from 'umi'
import Loading from '@/loading'
import {useEffect} from 'react'

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  const configs = [
    {
      name: '--background-color',
      value: '#f4f7ff',
      label: '背景颜色',
    },
    {
      name: '--theme-color',
      value: '#f4f7ff',
      label: '主题颜色',
    },
    {
      name: '--font-color',
      value: '#f4f7ff',
      label: '文字颜色',
    },
    {
      name: '--nav-active-color',
      value: '#f4f7ff',
      label: '文字激活颜色',
    },
    {
      name: '--box-background-color',
      value: '#f4f7ff',
      label: '背景颜色',
    },
    {
      name: '--main-shadow-color',
      value: '#f4f7ff',
      label: '阴影颜色',
    },
  ];

  const colors = {
    '--background-color': '#f4f7ff',
    '--theme-color': '#f4f7ff',
    '--font-color': '#f4f7ff',
    '--nav-active-color': '#f4f7ff',
    '--box-background-color': '#f4f7ff',
    '--main-shadow-color': '#f4f7ff',
  };

  const navigate = useNavigate()

  const colorPickerRef = useRef()

  const handleGetColors = ()=>{
    console.log('跳转')
    history.push('/cube/hexahedron')
  }

  const handleChange = (checked:string)=>{
    console.log(checked)
  }


  return (
    <PageContainer ghost>
      {/* <Loading></Loading> */}
      <div className={styles.container} onClick={handleGetColors}>
        <Guide name={trim(name)} />
      </div>
      <VirualScroller></VirualScroller>
      {/* <CoordinateEditor></CoordinateEditor> */}
    </PageContainer>
  );
};

export default HomePage;
