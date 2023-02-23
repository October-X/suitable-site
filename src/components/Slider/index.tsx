import React, { useState } from 'react';
import { Slider,InputNumber } from 'antd';
import styles from './style.less';

const App: React.FC = (props: any) => {

  const {label,onChange,min,max,name} = props
  const [inputValue, setInputValue] = useState(1);

  const handleChange = (newValue: number) => {
    onChange({[name]: newValue});
    setInputValue(newValue);
  };

  return (
   <div className={styles.root}>
       <div className="slider">
           <div className="slider__title">
               <div className="slider__titla_info">{label?label:'未定义'}</div>
               {/* <input className="slider__title_input" type="number" /> */}
               <InputNumber
                   className="slider__title_input"
                   min={min}
                   max={max}
                   value={inputValue}
                   onChange={handleChange}
               />
           </div>
           <div className="slider__main_bar">
               <Slider
                   min={1}
                   max={40}
                   onChange={handleChange}
                   value={typeof inputValue === 'number' ? inputValue : 0}
                   style={{width: '100%'}}
               />
           </div>
       </div>
   </div>
  );
};

export default App;
