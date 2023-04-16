import {PageContainer} from '@ant-design/pro-components';
import {history} from 'umi';
import styles from './style.less';
import HeadBar from "@/components/HeadBar";
import ThreeIcon from "@/components/Geometry/components/ThreeIcon"
import Transition from "@/components/Transition";

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
            type: 'cube',
        },
        {
            name: '圆锥',
            des: '',
            type: 'circularCone'
        },
        {
            name: '圆柱',
            des: '',
            type: 'circularColumn'
        },
        {
            name: '球体',
            des: '',
            type: 'sphere'
        },
        {
            name: '矩形',
            des: '',
            type: 'oblong'
        },
        {
            name: '圆形',
            des: '',
            type: 'circle'
        },
        {
            name: '堆叠',
            des: '',
            type: 'pileBlocks',
        }
    ];

    const handleClick = (obj: any) => {
        if (obj.type === 'pileBlocks') {
            history.push('/cube/pileBlocks')
            return
        }
        // @ts-ignore
        history.push('/cube/Model', {data: obj.type})

    }

    return (
        <Transition>
        <PageContainer ghost>
            <HeadBar title="模型展示"/>
            <div className={styles.models}>
                {cubes.map((item, index) => (
                    <div className={styles.model__item} key={'d' + index} onClick={() => {
                        handleClick(item)
                    }}>
                        <div className="model__item_img">
                            <ThreeIcon type={item.type}/>
                        </div>
                        <div className="model__item_main">
                            <div className="main__title">{item.name}</div>
                            <div className="main__content">{item.desc}</div>
                        </div>
                    </div>
                ))}
            </div>
        </PageContainer>
        </Transition>
    );
};

export default ModelDisplay;
