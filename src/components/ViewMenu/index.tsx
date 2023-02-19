import './style.less';
import ProBtn from '@/components/ProBtn';
import { RedoOutlined } from '@ant-design/icons';
const ViewMenu = (props: any) => {

const  handleBtnChange = (val:string)=>{
    console.log(val)
}

  return (
    <div className="view-menu">
      <div className="view-menu__header">
        <div className="view-menu__header_container">
          <div className="view-menu__header_container__icon"></div>
          <div className="view-menu__header_container__title">视图</div>
          <div></div>
        </div>
      </div>
      <div className="view-menu__nav">
        <div className="nav__item">
        <ProBtn
          type="btn"
          onChange={handleBtnChange}
          name="reset"
          label="重置"
          icon={RedoOutlined}
        />
        </div>
        <div className="nav__item">
        <ProBtn
          type="btn"
          onChange={handleBtnChange}
          name="reset"
          label="重置"
          icon={RedoOutlined}
        />
        </div>
        <div className="nav__item">
        <ProBtn
          type="btn"
          onChange={handleBtnChange}
          name="reset"
          label="重置"
          icon={RedoOutlined}
        />
        </div>
      </div>
    </div>
  );
};

export default ViewMenu;
