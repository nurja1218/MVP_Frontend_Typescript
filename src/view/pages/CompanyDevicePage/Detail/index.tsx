import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { currentMenuState } from '../../../../recoil/atoms';
import DeviceTableDetailContainer from '../../../../view/containers/DeviceTableDetailContainer';
import { useTranslation } from 'react-i18next';

export default function CompanyDeviceDetailPage({ match }: any) {
    const { serial: deviceSerial }: any = match.params;
    const setCurrentMenu: any = useSetRecoilState(currentMenuState);
    const { t } = useTranslation();
    useEffect(() => {
        setCurrentMenu([t('기기관리'), deviceSerial]);
    }, [setCurrentMenu, deviceSerial, t]);
    return (
        <div style={{ paddingTop: 15 }}>
            <DeviceTableDetailContainer serial={deviceSerial} />
        </div>
    );
}
