import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';
import VirualScroller from '@/components/VirualScroller';
import {history} from 'umi';
import Loading from "@/loading";

const HomePage: React.FC = () => {
    const {name} = useModel('global');

    const handleGetColors = () => {
        console.log('跳转页面');
        history.push('/cube/hexahedron');
    };

    return (
        <PageContainer ghost>
            {/*<Loading></Loading>*/}
            <div className={styles.container} onClick={handleGetColors}>
                <Guide name={trim(name)}/>
            </div>
            {/*<VirualScroller></VirualScroller>*/}
            {/* <CoordinateEditor></CoordinateEditor> */}
        </PageContainer>
  );
};

export default HomePage;
