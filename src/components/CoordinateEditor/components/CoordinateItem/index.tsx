import React, { useState } from 'react';
import styles from './style.less';
import {
  MinusCircleOutlined,
  CloseOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import { Input, notification } from 'antd';
import { copyData, shallowExist, emptyExist } from '@/utils/processData';

const CoordinateItem = (props: any) => {
  const {
    pointData: propsData,
    delete: propsDelete,
    modify: propsModify,
    allPoints,
    status: propsStatus,
  } = props;
  const originData = {
    name: propsData.name,
    p11: propsData.p1[0],
    p12: propsData.p1[1],
    p13: propsData.p1[2],
    p21: propsData.p2[0],
    p22: propsData.p2[1],
    p23: propsData.p2[2],
  };
  const [edit, setEdit] = useState(false);
  const pointData = copyData(propsData);
  const [inputs, setInputs] = useState(originData);
  const [api, contextHolder] = notification.useNotification();
  const [status, setStatus] = useState(propsStatus);

  let mainDom = [];
  for (const key in pointData) {
    if (key === 'name' || key === 'status') continue;
    mainDom.push(
      <div className="main_item" key={key}>
        <div className="main_item__point">{key}</div>
        <div className="main_item__point-detial">
          {`(${pointData[key][0]}，${pointData[key][1]}，${pointData[key][2]})`}
        </div>
      </div>,
    );
  }

  const handleDelete = (val: string) => {
    console.log('1111');
    propsDelete(val);
  };

  const handleClose = () => {
    setEdit(false);
    setStatus(null);
    setInputs(originData);
    if(propsStatus&&inputs.name === '0'){
      propsDelete('0')
    }
  };

  const handleConfirm = () => {
    console.log(inputs.name);
    if (emptyExist(inputs)||inputs.name==='0') {
      api.error({
        message: '修改提示',
        description: '输入未完成',
      });
      return;
    }
    if (
      shallowExist(allPoints, inputs.name) &&
      inputs.name !== originData.name
    ) {
      console.log('存在');
      api.error({
        message: '修改提示',
        description: '辅助线已存在',
      });
      return;
    }
    propsModify(propsData.name, {
      name: inputs.name,
      p1: [inputs.p11, inputs.p12, inputs.p13],
      p2: [inputs.p21, inputs.p22, inputs.p23],
    });
    setEdit(false);
  };

  return (
      <div className={styles.root}>
        <div className="container">
          {contextHolder}
          <div
              className="coordinate-item"
              onClick={() => {
                setEdit(true);
              }}
          >
            <div className="coordinate-item__header">
              <div className="header_container">
                <div className="header_container__point">{pointData.name}</div>
                <div
                    className="header_container__btn"
                    onClick={() => handleDelete(pointData.name)}
                >
                  <MinusCircleOutlined />
                </div>
              </div>
            </div>
            <div className="coordinate-item__main">
              {mainDom.map((item) => item)}
            </div>
          </div>
          {edit || status === 'add' ? (
              <div className="coordinate-item coordinate-item-editor">
                <div className="coordinate-item__header">
                  <div className="header_container">
                    <div className="header_container__point">
                      <Input
                          className="input--small"
                          key="name"
                          value={inputs.name}
                          onChange={(event) => {
                            setInputs({ ...inputs, name: event.target.value });
                          }}
                      />
                    </div>
                    <div className="header_container__btns">
                      <div
                          className=" btns_item header_container__btn"
                          onClick={handleConfirm}
                      >
                        <CheckOutlined />
                      </div>
                      <div
                          className="btns_item header_container__btn"
                          onClick={handleClose}
                      >
                        <CloseOutlined />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="coordinate-item__main">
                  <div className="main_item">
                    <div className="main_item__point">P1</div>
                    <div className="main_item__point-detial">
                      <Input
                          className="input--small"
                          key="p11"
                          value={inputs.p11}
                          onChange={(event) => {
                            setInputs({ ...inputs, p11: event.target.value });
                          }}
                      />
                      <Input
                          className="input--small"
                          key="p12"
                          value={inputs.p12}
                          onChange={(event) => {
                            setInputs({ ...inputs, p12: event.target.value });
                          }}
                      />
                      <Input
                          className="input--small"
                          key="p13"
                          value={inputs.p13}
                          onChange={(event) => {
                            setInputs({ ...inputs, p13: event.target.value });
                          }}
                      />
                    </div>
                  </div>
                  <div className="main_item">
                    <div className="main_item__point">P2</div>
                    <div className="main_item__point-detial">
                      <Input
                          className="input--small"
                          key="p21"
                          value={inputs.p21}
                          onChange={(event) => {
                            setInputs({ ...inputs, p21: event.target.value });
                          }}
                      />
                      <Input
                          className="input--small"
                          key="p22"
                          value={inputs.p22}
                          onChange={(event) => {
                            setInputs({ ...inputs, p22: event.target.value });
                          }}
                      />
                      <Input
                          className="input--small"
                          key="p23"
                          value={inputs.p23}
                          onChange={(event) => {
                            setInputs({ ...inputs, p23: event.target.value });
                          }}
                      />
                    </div>
                  </div>
                </div>
              </div>
          ) : (
              ''
          )}
        </div>
      </div>
  );
};

export default CoordinateItem;
