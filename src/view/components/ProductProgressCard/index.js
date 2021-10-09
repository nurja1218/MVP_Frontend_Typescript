import DataProgress from '../DataProgress';
import { useStyles } from './style';
import { Grid } from '@material-ui/core';
import { Tooltip } from 'antd';
import { colors } from '../../../configs/variables';
import TextEllipsis from '@/view/components/ColumnRenderers/TextEllipsis';
import { useTranslation } from 'react-i18next';

export default function ProductProgressCard({ data: product }) {
    const classes = useStyles();
    const { t } = useTranslation();
    var configNormal = {
        height: 180,
        width: 180,
        autoFit: false,
        getDegree: 360,
        percent: product.arrivalProducts / product.departureProducts,
        innerRadius: 0.8,
        color: [colors.SECONDARY, colors.CG200],
        tooltip: {
            fields: ['x', 'y'],
        },
        showInfo: true,
    };
    var configAbnormal = {
        height: 180,
        width: 180,
        autoFit: false,
        getDegree: 360,
        percent: product.arrivalProducts / product.departureProducts,
        innerRadius: 0.8,
        color: [colors.ERROR, colors.CG200],
    };

    function GraphTooltip() {
        const classes = useStyles();
        return (
            <div className={classes.graphTooltip}>
                <span className={classes.tooltipTitle}>
                    {t('출고')} {product.departureProducts}
                    {t('건')}
                </span>
                <div className={classes.tooltipContent}>
                    <div style={{ borderBottom: `1px solid ${colors.BORDER_GREY}` }}>
                        <div></div>
                        {t('배송중')} :
                        <span>
                            {product.departureProducts - product.arrivalProducts}
                            {t('건')}
                        </span>
                    </div>
                    <div>
                        <div
                            style={
                                product.abnormalAlarmProduct <= 0
                                    ? { background: colors.PRIMARY }
                                    : { background: colors.ERROR }
                            }
                        ></div>
                        {t('도착')} :{' '}
                        <span>
                            {product.arrivalProducts}
                            {t('건')}
                        </span>
                        <ul>
                            <li>
                                {t('정상 발급')} :
                                <span>
                                    {product.arrivalProducts < product.abnormalAlarmProduct
                                        ? 0
                                        : product.arrivalProducts - product.abnormalAlarmProduct}
                                    {t('건')}
                                </span>
                            </li>
                            <li>
                                {t('발급 불가')} :
                                <span>
                                    {product.abnormalAlarmProduct}
                                    {t('건')}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.productProgressCard} style={{ position: 'relative' }}>
                <h2>
                    <TextEllipsis>{product.title}</TextEllipsis>
                </h2>
                <Tooltip
                    placement="rightTop"
                    title={<GraphTooltip />}
                    color={'transparent'}
                    overlayInnerStyle={{
                        boxShadow: 'none',
                    }}
                    // visible="true"
                >
                    <div className={classes.productProgress}>
                        <DataProgress
                            config={
                                product.abnormalAlarmProduct <= 0 ? configNormal : configAbnormal
                            }
                        />

                        <span>
                            {product.abnormalAlarmProduct <= 0 ? (
                                ''
                            ) : (
                                <img
                                    src="/assets/common/report_problem.svg"
                                    alt={t('출하증명서 발급 불가')}
                                    style={{ marginBottom: 6 }}
                                />
                            )}
                            <p>
                                {product.abnormalAlarmProduct <= 0
                                    ? t('정상 발급')
                                    : t('발급 불가')}
                            </p>
                            <span>
                                {product.abnormalAlarmProduct <= 0
                                    ? product.arrivalProducts
                                    : product.abnormalAlarmProduct}
                                {t('건')}
                            </span>
                        </span>
                    </div>
                </Tooltip>

                <Grid container className={classes.productContent}>
                    <Grid item xs={12} sm={6}>
                        <p>{t('출고')}</p>
                        <span>
                            {product.departureProducts}
                            {t('건')}
                        </span>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <p>{t('도착')}</p>
                        <span>
                            {product.arrivalProducts}
                            {t('건')}
                        </span>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
