import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';
import {history} from 'umi';
import global from '@/global'
import ReactMarkdown from 'react-markdown';
import ReactMde from "react-mde";
import {useRef, useState} from "react";
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

const HomePage: React.FC = () => {
    const {name} = useModel('global');
    // const {count} = useSelector((state)=>state.userInfo)
    // const dispatch = useDispatch()
    const [count,setCount] = global.useGlobal("count")
    const handleGetColors = () => {
        console.log('跳转');
        history.push('/cube/hexahedron');
    };
    const [value, setValue] = useState("");
    const [selectedTab, setSelectedTab] = useState("write");
    const editorRef = useRef()
    const handleChange = (val)=>{
        const content = editorRef.current.getInstance().getMarkdown()
        setValue(content)
        console.log(content)
    }
    return (
        <PageContainer ghost>
            {/*<Loading></Loading>*/}
            <div className={styles.container} onClick={handleChange}>
                <Guide name={trim(name)}/>
            </div>
            <Editor
                ref={editorRef}
                initialValue="Hello World!"
                // previewStyle="vertical"
                height="400px"
                initialEditType="wysiwyg"
                viewer
            />
            {}
            <ReactMarkdown children={value.replace(/\n/g, "\n\r")} />
        </PageContainer>
  );
};

export default HomePage;
