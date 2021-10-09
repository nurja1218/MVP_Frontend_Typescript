import { useSubscription } from '@apollo/react-hooks';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { notificationState } from '@/recoil/atoms';
import { useStyles } from './style';
import { useTranslation } from 'react-i18next';
import { notificationHandler } from '@/recoil/selectors';
import { SUBSCRIBE_ALARM } from '@/apollo/scripts/subscriptions';
import { useHistory } from 'react-router-dom';
import { controlSearchState } from '../../../../recoil/atoms';

export default function Alarm() {
    const classes = useStyles();
    const history = useHistory();
    const { t, i18n } = useTranslation();
    const setControlSearch = useSetRecoilState(controlSearchState);
    const { data } = useSubscription(SUBSCRIBE_ALARM);
    const notiHandler = useSetRecoilState(notificationHandler);
    const alarms = useRecoilValue(notificationState);

    useEffect(() => {
        if (data) {
            notiHandler(data.alarmUpdated);
        }
    }, [data, notiHandler]);

    const onAlarmClick = () => {
        setControlSearch({
            active: true,
            text: '',
            types: ['ALARM'],
        });
        history.push('/control');
    };

    return (
        <div className={classes.alarmBadge}>
            {alarms && alarms.length === 0 ? (
                <div className="normal">
                    <img src="/assets/common/alarm.svg" alt="" />
                    <span>{t('현재 알람 발생 내역이 없습니다.')}</span>
                </div>
            ) : (
                <div className="abnormal" onClick={onAlarmClick}>
                    <img src="/assets/common/report_problem_dark.svg" alt="" />
                    <span>{getAlarmText(alarms, i18n.language)}</span>
                </div>
            )}
        </div>
    );
}

function getAlarmText(alarms, lang) {
    switch (lang) {
        case 'ko':
            if (alarms.length === 1) {
                return `${alarms[0].productName}에 알람이 발생했습니다.`;
            } else {
                return `${alarms[alarms.length - 1].productName} 외 ${
                    alarms.length - 1
                }건에 알람이 발생했습니다.`;
            }
        case 'en':
        default:
            if (alarms.length === 1) {
                return `Alarm occured from ${alarms[0].productName}`;
            } else {
                return `${alarms.length} alarms occured including ${
                    alarms[alarms.length - 1].productName
                }`;
            }
    }
}
