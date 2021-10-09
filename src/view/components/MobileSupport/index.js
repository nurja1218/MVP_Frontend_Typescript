import { MobileOutlined } from '@ant-design/icons';
import { Layout, Result } from 'antd';
import { BlackLogo } from '../Logo';

export default function MobileSupport() {
    return (
        <Layout style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BlackLogo style={{ marginTop: '20%' }} />
            <Result
                title={<p style={{ fontSize: 'large', fontWeight: 'bold' }}>죄송합니다</p>}
                subTitle={
                    <p>
                        가로 해상도 1200px 이상에서 사용할 수 있습니다.
                        <br />
                        PC 환경에서 모든 기능을 사용하세요.
                    </p>
                }
                icon={<MobileOutlined />}
            />
        </Layout>
    );
}
