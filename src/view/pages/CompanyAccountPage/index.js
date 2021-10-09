import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSetRecoilState } from 'recoil';
import { currentMenuState } from '@/recoil/atoms';
import AccountTableContainer from '@/view/containers/AccountTableContainer';

export default function CompanyAccountPage() {
    const { t } = useTranslation();
    const setCurrentMenu = useSetRecoilState(currentMenuState);
    useEffect(() => {
        setCurrentMenu([t('사용자관리')]);
    }, [setCurrentMenu, t]);
    return (
        <div style={{ paddingTop: 15 }}>
            <AccountTableContainer />
        </div>
    );
}
