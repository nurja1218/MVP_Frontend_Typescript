import { useStyles } from './style';
import { useTranslation } from 'react-i18next';

export default function CertificateCard({ alarmStatusId, onClick }) {
    const classes = useStyles();
    const { t } = useTranslation();
    return (
        <>
            <div className={`${classes.certificateCard} ${classes[alarmStatusId]}`}>
                <h2>
                    {t('출하증명서')} <br />
                    {alarmStatusId === 'ABNORMAL' ? t('발급 불가') : t('정상 발급 완료')}
                </h2>
                <button
                    className={`${classes.certificateDownloadButton} ${[alarmStatusId]}`}
                    onClick={onClick}
                >
                    <img
                        src={
                            alarmStatusId === 'ABNORMAL'
                                ? '/assets/common/certificate_abnormal_download.svg'
                                : '/assets/common/certificate_normal_download.svg'
                        }
                        alt="출하증명서 다운로드"
                    />
                    {t('출하증명서 다운로드')}
                </button>
            </div>
        </>
    );
}
