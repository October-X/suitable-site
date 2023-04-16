import {PageContainer} from '@ant-design/pro-components';
import HeadBar from "@/components/HeadBar";
import {history} from 'umi';
import styles from './style.less';
import {AppstoreOutlined, UserOutlined} from '@ant-design/icons'
import Transition from "@/components/Transition";
import {Button, Form, Input, Modal, Select} from "antd";
import {useEffect, useState} from "react";
import Service from '@/api'
import {useGlobal} from "@/global";

const AccessPage: React.FC = () => {

    const [cubes, setCubes] = useState([])
    const [customCubes, setCustomCubes] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [form] = Form.useForm()
    const [userInfo] = useGlobal("userInfo")

    const handleClick = (obj: any) => {
        // @ts-ignore
        history.push('/cube/hexahedron/' + obj.id, {data: obj.type})
    }

    const handleCustomCubeClick = (obj:any)=>{
        history.push('/cube/customTemplate/' + obj.id)
    }

    const handleOk = () => {
        form.validateFields().then((res) => {
            if (res.model === "custom") {
                history.push('/cube/customTemplate/add', {behavior: "add", name: res.name})
            } else {
                history.push('/cube/hexahedron/add', {data: res.model, behavior: "add", name: res.name})
            }
        })
    }

    useEffect(() => {
        Service.model.getModel({
            userId: userInfo.id
        }).then(res => {
            if (!res.code) {
                console.log(res.data)
                setCubes(res.data)
            }
        })
        Service.userModelCustom.getUserModelCustom({
            userId: userInfo.id
        }).then(res => {
            if (!res.code) {
                setCustomCubes(res.data)
            }
        })
    }, [])

    return (
        <Transition>
            <PageContainer ghost>
                <HeadBar title="几何世界"/>
                <Button type="primary" style={{marginBottom: 25}} onClick={() => setIsModalOpen(true)}>新建示例</Button>
                <Modal
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    title="新建示例"
                    onOk={handleOk}
                >
                    <Form style={{marginTop: 20}} form={form}>
                        <Form.Item
                            name="model"
                            label="模型"
                            initialValue="cube"
                            required
                        >
                            <Select
                                options={[
                                    {value: "cube", label: '立方体'},
                                    {value: 2, label: '模型2'},
                                    {value: 3, label: '模型3'},
                                    {value: "custom", label: '自定义'},
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            name="name"
                            label="名称"
                            required>
                            <Input/>
                        </Form.Item>
                    </Form>
                </Modal>
                <div className={styles.cards}>
                    {cubes.map((item, index) => (
                        <div className={styles.card__item} key={index} onClick={() => handleClick(item)}>
                            <div className="item_title">{item?.name}</div>
                            <div className="item_desc">
                                <div className="desc__type"><AppstoreOutlined
                                    style={{fontSize: 14, marginRight: 5}}/>{item?.type}</div>
                                <div className="desc__user"><UserOutlined
                                    style={{fontSize: 14, marginRight: 5}}/>{item?.user}</div>
                            </div>
                        </div>
                    ))}
                    {
                        customCubes.map((item, index) => (
                            <div className={styles.card__item} key={index} onClick={() => handleCustomCubeClick(item)}>
                                <div className="item_title">{item?.name}</div>
                                <div className="item_desc">
                                    <div className="desc__type"><AppstoreOutlined
                                        style={{fontSize: 14, marginRight: 5}}/>custom</div>
                                    <div className="desc__user"><UserOutlined
                                        style={{fontSize: 14, marginRight: 5}}/>{item?.user}</div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </PageContainer>
        </Transition>
    );
};

export default AccessPage;
