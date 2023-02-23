import React, {useState, useImperativeHandle, useEffect} from 'react';
import styles from './style.less';
import {ColorConfigItem, ColorPickerProps} from './index.d';
//@ts-ignore
const ColorPicker: React.FC = React.forwardRef(
    (props: ColorPickerProps, ref: any) => {
        const {config, colors} = props;

        const [data, setData] = useState(colors);

        const handleChange = (e: any) => {
            const name = e.target.name;
            const value = e.target.value;
            setData({
                ...data,
                [name]: value,
            });
        };

        useEffect(() => {
            let currentColor
            if (typeof colors === 'string') {
                currentColor = JSON.parse(colors);
            } else {
                currentColor = colors
            }

            setData({
                ...currentColor,
            });
        }, [colors]);

        useImperativeHandle(ref, () => ({
            data: data,
        }));

        return (
            <div className={styles.root}>
                <div className="color-picker">
                    {config.map((item: ColorConfigItem) => (
                        <div className="color-picker__item" key={item.name}>
                            <div className="color-piker_title">{item.label}</div>
                            <input
                                type="color"
                                className="color-piker_input"
                                name={item.name}
                                value={data[item.name]}
                                onChange={handleChange}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    },
);

export default ColorPicker;
