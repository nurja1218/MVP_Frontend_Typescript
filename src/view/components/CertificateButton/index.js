import { useState } from 'react';
import { useStyles } from './style';
import { useTranslation } from 'react-i18next';

export default function CertificateButton({ status, alarm, onClick, style }) {
    const classes = useStyles();
    const { t } = useTranslation();
    const disabled = alarm === 'ABNORMAL' || status === 'NON_ISSUED';

    const [hoverd, setHoverd] = useState(false);
    const handleMouseOver = () => {
        setHoverd(true);
    };
    const handleMouseLeave = () => {
        setHoverd(false);
    };
    const handleClick = (e) => {
        !disabled && onClick && onClick();
        e.stopPropagation();
    };

    return (
        <button
            status={status}
            className={`${classes.certificateButton} ${
                alarm !== 'ABNORMAL' ? classes[status] : classes['NON_ISSUED']
            }`}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            style={{ ...style, cursor: disabled ? 'not-allowed' : 'pointer' }}
            onClick={handleClick}
        >
            <>
                {status === 'MULTIPART' ? (
                    <>
                        <img
                            src={`${
                                hoverd ? '/assets/common/file_light.png' : '/assets/common/file.png'
                            }`}
                            alt=""
                        />
                        {t('출하증명서')}
                    </>
                ) : alarm !== 'ABNORMAL' ? (
                    <>
                        <img
                            src={
                                status === 'NON_ISSUED'
                                    ? '/assets/common/close_grey.svg'
                                    : '/assets/common/file_white.svg'
                            }
                            alt=""
                        />
                        {status === 'NON_ISSUED' ? t('발급불가') : t('정상발급')}
                    </>
                ) : (
                    <>
                        <img src="/assets/common/close_grey.svg" alt="" />
                        {t('발급불가')}
                    </>
                )}
            </>
        </button>
    );
}
