import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { currentMenuState } from '../../../recoil/atoms';
import ControlTableContainer from '../../../view/containers/ControlTableContainer';
import { useTranslation } from 'react-i18next';

export default function CompanyControlPage() {
    const { t } = useTranslation();
    const setCurrentMenu = useSetRecoilState(currentMenuState);
    useEffect(() => {
        setCurrentMenu([t('관제')]);
    }, [setCurrentMenu, t]);
    return (
        <div style={{ paddingTop: 15 }}>
            <ControlTableContainer />
        </div>
    );
}
