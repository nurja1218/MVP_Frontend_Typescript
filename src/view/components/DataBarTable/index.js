import { Bar } from '@ant-design/charts';
import { colors } from '@/configs/variables';
import { useStyles } from './style';
import { useTranslation } from 'react-i18next';

export default function DataBarTable({ config }) {
    const classes = useStyles();
    const { t } = useTranslation();
    // const dataList = <div>{config.data[1].status}</div>;

    return (
        <div className={classes.deviceBarTable}>
            <ul className={classes.deviceDataList}>
                <li>
                    <span
                        style={{
                            display: 'inline-block',
                            marginBottom: 5,
                            fontSize: 18,
                            color: colors.CG400,
                        }}
                    >
                        Total
                    </span>
                    <p>{t('총 기기 수')}</p>
                    <span>
                        {config.data[0]?.value + config.data[1]?.value + config.data[2]?.value}{' '}
                        {t('대')}
                    </span>
                </li>
                {config.data &&
                    config.data.map((config, idx) => (
                        <li key={idx}>
                            <div style={{ background: `${config.color}` }}></div>
                            <p>{t(config.status)}</p>
                            <span>
                                {config.value}
                                {t('대')}
                            </span>
                        </li>
                    ))}
            </ul>
            <div className={classes.deviceBarChart}>
                <Bar {...config} />
            </div>
        </div>
    );
}
