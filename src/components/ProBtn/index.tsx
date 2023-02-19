import React from 'react';
import './style.less';
import { Switch } from 'antd';

interface IntProBtn{
    label:string;
    name:string;
    type:string;
    onChange:any;
    icon:React.FC;
}

const ProBtn: React.FC = (props: IntProBtn) => {
const {label,type,onChange,name,icon:Icon} = props

  const handleChange = (checked: boolean) => {
    onChange({[name]:checked});
  };

  const onClick = () => {
    onChange(name);
  }

  return (
    <div className="ProBtn">
      <div className="ProBtn__title">{label}</div>
      <div className="ProBtn__btn">
        {type === 'switch'?<Switch defaultChecked onChange={handleChange} />:<div onClick={onClick}><Icon /></div>}
        {/* <Switch defaultChecked onChange={handleChange} /> */}
        {/* <RedoOutlined onClick={onClick}/> */}
      </div>
    </div>
  );
};

export default ProBtn;
