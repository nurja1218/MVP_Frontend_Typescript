import { ALARM_STATUS } from '../../../configs/enum';
import { useStyles } from './style';
import { useTranslation } from 'react-i18next';

/**
 * alarmRangeStatusName: String # NORMAL / ABNORMAL / NONE
 */
export default function AlarmBadge({ status }) {
    const { t } = useTranslation();
    const classes = useStyles();
    return (
        <>
            {status === 'ABNORMAL' ? (
                <span className={`${classes.badge} ${classes[status]}`}>
                    <img src="/assets/common/report_problem.svg" alt="알람 아이콘" />
                    {t(ALARM_STATUS[status])}
                </span>
            ) : status === 'NORMAL' ? (
                <span className={classes.badge}>{t(ALARM_STATUS[status])}</span>
            ) : (
                <span className={classes.badge}>-</span>
            )}
        </>
    );
}
