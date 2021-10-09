import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { currentMenuState } from '@/recoil/atoms';
import ControlTableDetailContainer from '@/view/containers/ControlTableDetailContainer';
import { useTranslation } from 'react-i18next';

export default function CompanyControlDetailPage({ match }) {
    const { t } = useTranslation();
    const { serial: transportUUID } = match.params;
    const setCurrentMenu = useSetRecoilState(currentMenuState);
    useEffect(() => {
        setCurrentMenu([t('관제'), '']);
    }, [setCurrentMenu, transportUUID, t]);
    return (
        <div style={{ paddingTop: 15 }}>
            <ControlTableDetailContainer uuid={transportUUID} />
        </div>
    );
}
