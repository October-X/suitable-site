import React from 'react';
import styles from './style.less'
import {ColorSelector} from './index.d'

const ColorPicker = (props:ColorSelector) => {

    const {label,onChange} = props

    const colors = [
        '#8472e2',
        '#2c97db',
        '#58b938',
        '#d89f38',
        '#eb5b72',
        '#8b898a',
    ]

    const handleClick:(val:string)=>void = (color:string)=>{
        onChange(color)
    }

  return (
    <div className={styles.root}>
        <div className="color-selector">
            <div className="color-selector__title">{label?label:'未定义'}</div>
            <div className="color-selector__main">
                {colors.map(item=><div className="color-selector__main_item" key={item} style={{'background':item}} onClick={()=>handleClick(item)}/> )}
            </div>
        </div>
    </div>
  );
};

export default ColorPicker;
