import React, { useState, useRef } from 'react';
import ProBtn from '@/components/ProBtn';
import CoordinateItem from './components/CoordinateItem';
import styles from './style.less';
import { PlusOutlined } from '@ant-design/icons';
import { copyData } from '@/utils/processData';
import { notification } from 'antd';

const CoordinateEditor: React.FC = (props: any) => {
  const [points, setPoints] = useState([
    {
      name: 'A',
      p1: [6.0, 7.5, 5.5],
      p2: [-6.0, 7.5, 5.5],
    },
    {
      name: 'B',
      p1: [6.0, 7.5, 5.5],
      p2: [-6.0, 7.5, 5.5],
    },
  ]);
  const [api, contextHolder] = notification.useNotification();
  const mainRef = useRef();

  const handleAdd = () => {
    console.log('添加');
    // @ts-ignore
    mainRef.current.scrollTop = 0;
    const result = points.find((item) => item.name === '0');
    if (result) {
      api.error({
        message: '修改提示',
        description: '上次新增未编辑完成',
      });
      return;
    }
    const newData = {
      status: 'add',
      name: '0',
      p1: [0, 0, 0],
      p2: [0, 0, 0],
    };
    const newPoints = copyData(points);
    newPoints.unshift(newData);
    setPoints(newPoints);
  };
  const handleDelete = (val: string) => {
    const data = points.filter((item) => item.name !== val);
    setPoints(data);
  };
  const modifyPoint = (name: string, data: any) => {
    const newPoints = copyData(points);
    const index = newPoints.findIndex((item: any) => item.name === name);
    newPoints.splice(index, 1, data);
    setPoints(newPoints);
  };
  return (
    <div className={styles.root}>
      <div className="coordinate-editor">
        {contextHolder}
        <div className="coordinate-editor__item">
          <ProBtn
              type="btn"
              onChange={handleAdd}
              label="添加辅助线"
              name="add"
              icon={PlusOutlined}
          ></ProBtn>
        </div>
        <div className="shadow-container coordinate-editor__container">
          <div className="shadow"></div>
          <div className="main-container" ref={mainRef}>
            {points.map((item) => (
                <div className="coordinate-editor__item" key={item.name}>
                  <CoordinateItem
                      pointData={item}
                      delete={handleDelete}
                      modify={modifyPoint}
                      allPoints={points.map((item) => item.name)}
                      status={item.status}
                  ></CoordinateItem>
                </div>
            ))}
          </div>
          <div className="shadow"></div>
        </div>
      </div>
    </div>
  );
};

export default CoordinateEditor;
