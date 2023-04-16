import styles from './style.less';
import ProBtn from '@/components/ProBtn';
import {
    LeftCircleOutlined,
    UpOutlined,
    DownOutlined,
    RightOutlined,
    LeftOutlined,
    VerticalAlignBottomOutlined, VerticalAlignTopOutlined
} from '@ant-design/icons';

const ViewMenu = (props: any) => {
    const {onChange} = props

    const handleClick = ()=>{
        history.go(-1)
    }

    const handleBtnChange = (val: string) => {
        console.log(val)
        onChange(val)
    }

    return (
        <div className={styles.root}>
            <div className="view-menu">
                <div className="view-menu__header">
                    <div className="view-menu__header_container">
                        <div className="view-menu__header_container__icon" onClick={handleClick}><LeftCircleOutlined /></div>
                        <div className="view-menu__header_container__title">视图</div>
                        <div></div>
                    </div>
                </div>
                <div className="view-menu__nav">
                    <div className="nav__item">
                        <ProBtn
                            type="btn"
                            onChange={() => {
                                handleBtnChange("front")
                            }}
                            name="reset"
                            label="正视图"
                            icon={VerticalAlignTopOutlined}
                        />
                    </div>
                    <div className="nav__item">
                        <ProBtn
                            type="btn"
                            onChange={() => {
                                handleBtnChange("behind")
                            }}
                            name="reset"
                            label="后视图"
                            icon={VerticalAlignBottomOutlined}
                        />
                    </div>
                    <div className="nav__item">
                        <ProBtn
                            type="btn"
                            onChange={() => {
                                handleBtnChange("left")
                            }}
                            name="reset"
                            label="左视图"
                            icon={LeftOutlined}
                        />
                    </div>
                    <div className="nav__item">
                        <ProBtn
                            type="btn"
                            onChange={() => {
                                handleBtnChange("right")
                            }}
                            name="reset"
                            label="右视图"
                            icon={RightOutlined}
                        />
                    </div>
                    <div className="nav__item">
                        <ProBtn
                            type="btn"
                            onChange={() => {
                                handleBtnChange("up")
                            }}
                            name="reset"
                            label="俯视图"
                            icon={DownOutlined}
                        />
                    </div>
                    <div className="nav__item">
                        <ProBtn
                            type="btn"
                            onChange={() => {
                                handleBtnChange("down")
                            }}
                            name="reset"
                            label="底视图"
                            icon={UpOutlined}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewMenu;
