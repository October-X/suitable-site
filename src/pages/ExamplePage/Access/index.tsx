import { PageContainer } from '@ant-design/pro-components';
import { Access, useAccess } from '@umijs/max';
import {Button} from 'antd';
import {history} from 'umi'

const AccessPage: React.FC = () => {
  const access = useAccess();
  return (
    <PageContainer
      ghost
      header={{
        title: '权限示例',
      }}
    >
      <Button onClick={() => {
        history.replace('/login')
      }}>登录</Button>
      <Access accessible={access.canSeeAdmin}>
        <Button>只有 Admin 可以看到这个按钮</Button>
      </Access>
    </PageContainer>
  );
};

export default AccessPage;
