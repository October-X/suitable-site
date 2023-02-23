import styles from './style.less';
import CoordinateEditor from '@/components/CoordinateEditor';

const CoordinateMenu = (props: any) => {
  return (
    <div className={styles.root}>
        <div className="coordinate-menu">
            <div className="coordinate-menu__header">
                <div className="coordinate-menu__header_container">
                    <div className="coordinate-menu__header_container__icon"></div>
                    <div className="coordinate-menu__header_container__title">立方体</div>
                    <div></div>
                </div>
            </div>
            <div className="coordinate-menu__nav">
                <CoordinateEditor />
            </div>
        </div>
    </div>
  );
};

export default CoordinateMenu;
