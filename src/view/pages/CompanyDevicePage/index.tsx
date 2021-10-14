import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { currentMenuState } from '../../../recoil/atoms';
import DeviceTableContainer from '../../../view/containers/DeviceTableContainer';
import { useTranslation } from 'react-i18next';

export default function CompanyDevicePage() {
    const { t } = useTranslation();
    const setCurrentMenu = useSetRecoilState(currentMenuState);
    useEffect(() => {
        setCurrentMenu([t('기기관리')]);
    }, [setCurrentMenu, t]);
    return (
        <div style={{ paddingTop: 15 }}>
            <DeviceTableContainer />
        </div>
    );
}
