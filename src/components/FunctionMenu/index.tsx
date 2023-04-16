import React, {useState} from 'react';
import styles from './style.less';
import {LeftCircleOutlined} from '@ant-design/icons';
import {useNavigate} from '@umijs/max';
import ProBtn from '@/components/ProBtn'
import Slider from '@/components/Slider';
import ColorSelector from '@/components/ColorSelector';
import {
    RedoOutlined
} from '@ant-design/icons';


const options = {
    "cube":["长","宽","高"],
    "circularCone": ["半径","高"],
    "circularColumn": ["半径","高"],
    "sphere": ["半径"],
    "oblong": ["长","宽"],
    "circle": ["半径"],
}
const FunctionMenu: React.FC = (props: any) => {
    const navigator = useNavigate();
    const {changeSize, changeColor,type,onChange,size = {
        depth: 6,
        width: 6,
        height: 6,
    },rotateValue} = props;
    console.log(props)
    const handleGoBack = () => {
        navigator(-1);
    };

    const handleBtnChange = (val: object | string) => {
        onChange(val)
    }

    const handleSliderChange = (val: object) => {
        const newSize = {
            ...size,
            ...val
        }
        changeSize(newSize)
    }

    const handleColorChange = (val: string) => {
        changeColor(val)
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
                            <LeftCircleOutlined/>
                        </div>
                        <div className="function-menu__header_container__title">立方体</div>
                        <div></div>
                    </div>
                </div>
                <div className="function-menu__nav">
                    <div className="nav_container">
                        <div className="nav__item">
                            {options?.[type]?.[0] && < Slider label={options?.[type]?.[0]} name='depth' onChange={handleSliderChange} min={0} max={40}
                                value={size.depth}/>}
                        </div>
                        <div className="nav__item">
                            {options?.[type]?.[1] && <Slider label={options?.[type]?.[1]} name='width' onChange={handleSliderChange} min={0} max={40}
                                     value={size.width}/>}
                        </div>
                        <div className="nav__item">
                            {options?.[type]?.[2] && <Slider label={options?.[type]?.[2]} name='height' onChange={handleSliderChange} min={0} max={40}
                                     value={size.height}/>}
                        </div>
                        <div className="nav__item">
                            <ColorSelector label='涂色' name='cubeColor' onChange={handleColorChange}/>
                        </div>
                        <div className="nav__item">
                            <ProBtn type="switch" onChange={handleBtnChange}  name='rotate' label='自动旋转' switchValue={rotateValue}/>
                        </div>
                        <div className="nav__item">
                            <ProBtn type="btn" onChange={handleBtnChange} name='reset' label='重置'
                                    icon={RedoOutlined}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FunctionMenu;
