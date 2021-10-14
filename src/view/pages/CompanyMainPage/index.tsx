import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { currentMenuState } from '../../../recoil/atoms';
import MainContainer from '../../../view/containers/MainContainer';
import { useTranslation } from 'react-i18next';

export default function CompanyControlPage() {
    const { t } = useTranslation();
    const setCurrentMenu = useSetRecoilState(currentMenuState);
    useEffect(() => {
        setCurrentMenu([t('메인')]);
    }, [setCurrentMenu, t]);
    return (
        <div>
            <MainContainer />
        </div>
    );
}
