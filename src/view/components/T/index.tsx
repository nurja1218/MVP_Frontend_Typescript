import { useTranslation } from 'react-i18next';

export default function T({ children }: any) {
    const { t } = useTranslation();
    return <>{t(children)}</>;
}
