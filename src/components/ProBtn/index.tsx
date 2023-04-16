import React from 'react';
import styles from './style.less';
import { Switch } from 'antd';

interface IntProBtn{
    label:string;
    name:string;
    type:string;
    onChange:any;
    icon?:React.FC;
    width?:number;
    switchValue?:boolean;
}

const ProBtn = (props: IntProBtn) => {
const {label,type,onChange,name,icon:Icon,width,switchValue} = props
  const handleChange = (checked: boolean) => {
    onChange({[name]:checked});
  };

  const onClick = () => {
    onChange(name);
  }

  return (
    <div className={styles.root}>
        <div className="ProBtn" style={width&&{width}||{}}>
            <div className="ProBtn__title">{label}</div>
            <div className="ProBtn__btn">
                {type === 'switch'?<Switch onChange={handleChange} checked={switchValue}/>:<div onClick={onClick}>{Icon&&<Icon/>}</div>}
            </div>
        </div>
    </div>
  );
};

export default ProBtn;
