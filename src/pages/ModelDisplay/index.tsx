import { PageContainer } from '@ant-design/pro-components';
import { history } from 'umi';
import styles from './style.less';
import HeadBar from "@/components/HeadBar";

// 切割数组，默认四个为一组
const sliceArr = (arr: [], count?: number = 4) => {
  return arr.reduce((acc: [], item: any, index: number) => {
    const groupIndex = Math.floor(index / count);
    acc[groupIndex] = acc[groupIndex] || [];
    acc[groupIndex]?.push(item);
    return acc;
  }, []);
};

const ModelDisplay: React.FC = () => {
  const cubes = [
    {
      name: '立方体',
      desc: '由6个正方形面组成的正多面体为立方体, 故又称正六面体。',
    },
    {
      name: '圆锥',
      des: '',
    },
    {
      name: '圆柱',
      des: '',
    },
    {
      name: '球体',
      des: '',
    },
    {
      name: '矩形',
      des: '',
    },
    {
      name: '圆形',
      des: '',
    },
  ];

  const handleClick = ()=>{
    history.push('/cube/hexahedron')
  }

  return (
    <PageContainer ghost>
        <HeadBar title="模型展示"/>
        <div className={styles.models}>
            {cubes.map((item, index) => (
                <div className={styles.model__item} key={index} onClick={handleClick}>
                    <div className="model__item_img"></div>
                    <div className="model__item_main">
                        <div className="main__title">{item.name}</div>
                        <div className="main__content">{item.desc}</div>
                    </div>
                </div>
            ))}
      </div>
    </PageContainer>
  );
};

export default ModelDisplay;
