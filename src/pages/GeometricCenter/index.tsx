import {PageContainer} from '@ant-design/pro-components';
import HeadBar from "@/components/HeadBar";
import {history} from 'umi';
import styles from './style.less';
import {AppstoreOutlined, UserOutlined} from '@ant-design/icons'

const AccessPage: React.FC = () => {
    const cubes = [
        {
            title: '示例广场-自定义',
            type: '自定义广场',
            user: 'admin',
        },
        {
            title: '示例广场-自定义',
            type: '自定义广场',
            user: 'admin',
        },
        {
            title: '示例广场-自定义',
            type: '自定义广场',
            user: 'admin',
        },
        {
            title: '示例广场-自定义',
            type: '自定义广场',
            user: 'admin',
        },
        {
            title: '示例广场-自定义',
            type: '自定义广场',
            user: 'admin',
        },
    ];

    const handleClick = () => {
        history.push('/cube/hexahedron')
    }

    return (
        <PageContainer ghost>
            <HeadBar title="几何中心"/>
            <div className={styles.cards}>
                {cubes.map((item, index) => (
                    <div className={styles.card__item} key={index} onClick={handleClick}>
                        <div className="item_title">{item.title}</div>
                        <div className="item_desc">
                            <div className="desc__type"><AppstoreOutlined
                                style={{fontSize: 14, marginRight: 5}}/>{item.type}</div>
                            <div className="desc__user"><UserOutlined
                                style={{fontSize: 14, marginRight: 5}}/>{item.user}</div>
                        </div>
                    </div>
                ))}
            </div>
        </PageContainer>
    );
};

export default AccessPage;
