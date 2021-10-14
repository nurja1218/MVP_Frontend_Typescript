import { DEVICE_STATUS } from '../../../configs/enum';
import { ACCOUNT_ROLES } from '../../../configs/enum';
import { useStyles } from './style';
import { useTranslation } from 'react-i18next';

/**
 * TRANSPORT : UNUSED / PROGRESS / ARRIVE
 * ROLE : MASTER / MANAGER / USER
 */
export default function RowStateBadge({ status }: any) {
    const { t } = useTranslation();
    const classes: any = useStyles();
    return (
        <span className={`${classes.badge} ${classes[status]}`}>
            {t(DEVICE_STATUS[status])}

            {status === 'COMPANY_ADMIN_M' ? (
                // 마지막 문자열 제거
                <>{t(ACCOUNT_ROLES[status].slice(0, ACCOUNT_ROLES[status].length - 1))}</>
            ) : (
                <>{t(ACCOUNT_ROLES[status])}</>
            )}
            {/* 참일 때 마지막 문자열은 제거 */}
        </span>
    );
    // ${classes[status.toLowerCase()]}
}
