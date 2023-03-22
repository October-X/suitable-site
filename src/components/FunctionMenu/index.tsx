import React, {useState} from 'react';
import styles from './style.less';
import { LeftCircleOutlined } from '@ant-design/icons';
import { useNavigate } from '@umijs/max';
import ProBtn from '@/components/ProBtn'
import Slider from '@/components/Slider';
import ColorSelector from '@/components/ColorSelector';
import {
  RedoOutlined
} from '@ant-design/icons';

const FunctionMenu: React.FC = (props: any) => {
  const navigator = useNavigate();
  const {changeSize} = props;
  const [size, setSize] = useState({
    depth: 20,
    width: 20,
    height: 20,
  })

  const handleGoBack = () => {
    navigator(-1);
  };

  const handleBtnChange = (val: object | string) => {
    console.log(val)
  }

  const handleSliderChange = (val: object) => {
    const newSize = {
      ...size,
      ...val
    }
    console.log(newSize)
    setSize(newSize)
    changeSize(newSize)
  }

  const handleColorChange = (val:object)=>{
    console.log(val)
  }

  return (
    <div className={styles.root}>
      <div className="function-menu">
        <div className="function-menu__header">
          <div className="function-menu__header_container">
            <div
                className="function-menu__header_container__icon"
                onClick={handleGoBack}
            >
              <LeftCircleOutlined />
            </div>
            <div className="function-menu__header_container__title">立方体</div>
            <div></div>
          </div>
        </div>
        <div className="function-menu__nav">
          <div className="nav_container">
            <div className="nav__item">
              <Slider label='长' name='depth' onChange={handleSliderChange} min={1} max={40} value={size.depth}/>
            </div>
            <div className="nav__item">
              <Slider label='高' name='width' onChange={handleSliderChange} min={1} max={40} value={size.width}/>
            </div>
            <div className="nav__item">
              <Slider label='宽' name='height' onChange={handleSliderChange} min={1} max={40} value={size.height}/>
            </div>
            <div className="nav__item">
              <ColorSelector label='涂色' name='cubeColor' onClick={handleColorChange}/>
            </div>
            <div className="nav__item">
              <ProBtn type="switch" onChange={handleBtnChange} name='rotate' label='自动旋转'/>
            </div>
            <div className="nav__item">
              <ProBtn type="btn" onChange={handleBtnChange} name='reset' label='重置' icon={RedoOutlined}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunctionMenu;
