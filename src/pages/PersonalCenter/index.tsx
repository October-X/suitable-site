import {PageContainer,} from '@ant-design/pro-components';
import styles from './style.less'
import {Image, Space} from 'antd';
import {FormOutlined} from '@ant-design/icons'
import imgUrl from '@/assets/avatars/001.png'

const AccessPage: React.FC = () => {
    return (
        <PageContainer ghost
        >
            <div className={styles.root}>
                <div className="personal-center">
                    <div className="header">
                        <h2 className="header__title"><span>SUITABLE</span><span>STUDIO</span></h2>
                    </div>
                    <div className="user">
                        <div className="user__info">
                            <Space size={40}>
                                <div className="user__info_img">
                                    <Image width={60}
                                           src="https://github.com/October-X/suitable-resources/blob/main/avatars/001.png?raw=true"
                                           alt=''/>
                                </div>
                                <div className="user__info_name">
                                    牛牛
                                </div>
                            </Space>

                        </div>
                        <div className="user__btn">
                            <FormOutlined style={{fontSize: 18}}/>
                        </div>
                    </div>
                    <div className="main">

                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default AccessPage;
