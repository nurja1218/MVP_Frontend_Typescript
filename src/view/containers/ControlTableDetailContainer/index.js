import { Grid } from '@material-ui/core';
import DataLineChart from '../../components/DataLineChart/index.js';
import InformationTable from '../../containers/InformationTable/index.js';
import { useStyles } from './style';
import DataTable from '@/view/components/DataTable';
import minMaxRange from '@/tools/mapper/minmax.range';
import localeSorter from '@/view/components/DataTable/sorter/locale.sorter';
import numberSorter from '@/view/components/DataTable/sorter/number.sorter';
import DataTablePagination from '@/view/components/DataTable/DataTablePagination';
import { useQuery } from '@apollo/react-hooks';
import TableDataAlarm from '../../components/TableDataAlarm';

import { TRANSPORT_HISTORY_IN_PRODUCT } from '@/apollo/scripts/queries';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { needRefetchState } from '@/recoil/atoms';
import { currentMenuState } from '../../../recoil/atoms.js';
import { colors } from '../../../configs/variables.js';
import TextEllipsis from '../../components/ColumnRenderers/TextEllipsis/index.js';
import { useTranslation } from 'react-i18next';

const defaultConfig = {
    height: 400,
    xField: 'date',
    yField: 'value',
    yAxis: {
        label: {
            formatter: function formatter(v) {
                return ''.concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
                    return ''.concat(s, ',');
                });
            },
        },
    },
    seriesField: 'type',
    color: function color(_ref) {
        var type = _ref.type;
        return type === 'temperature' ? colors.PRIMARY : type === 'humidity' ? '#43c68e' : '#ddd';
    },
    slider: {
        // 최근 기준으로
        start: 0.7,
        end: 1,
    },
    point: false,
    label: {
        style: {
            // autoEllipsis: 'false',
            opacity: 0,
            fill: colors.PRIMARY,
        },
    },
};

// Table columns
const columns = [
    {
        title: 'No.',
        width: '80px',
        dataIndex: 'id',
        sorter: numberSorter('id'),
    },
    {
        title: '일시',
        dataIndex: 'updatedAt', // ?
        sorter: localeSorter('updatedAt'),
    },
    {
        title: '온도',
        dataIndex: 'temperatureMinMax',
        render: (temperatureMinMax) => {
            const [data, min, max] = temperatureMinMax.split('/');
            return <TableDataAlarm data={`${data}℃`} min={min} max={max} />;
            // 데이터 받아올 때 뒤에 ℃
        },
    },
    {
        title: '습도',
        dataIndex: 'humidity',
        // sorter: localeSorter('humidity'),
    },
    {
        title: '충격',
        dataIndex: 'shock',
        // sorter: localeSorter('shock'),
    },
];

export default function ControlTableDetailContainer({ uuid }) {
    const { t, i18n } = useTranslation();
    const classes = useStyles();
    const setCurrentMenu = useSetRecoilState(currentMenuState);
    const [graphConfig, setGraphConfig] = useState({
        data: [],
        annotations: [],
    });
    const [inspectAndAlarm, setInspectAndAlarm] = useState(null);
    const [tableDataInTransport, setTableDataInTransport] = useState({
        result: [],
    });
    const [tableData, setTableData] = useState({
        result: [],
    });
    const [menuConfig, setMenuConfig] = useState(null);
    const [menuDetail, setMenuDetail] = useState([]);
    const [graphMinMax, setGraphMinMax] = useState(null);
    const [alarmData, setAlarmData] = useState({ result: [] });

    const [page, setPage] = useState({
        pageNumber: 1,
        pageSize: 20,
    });

    const {
        data: controlDetailData,
        error: controlDetailError,
        refetch,
    } = useQuery(TRANSPORT_HISTORY_IN_PRODUCT, {
        variables: {
            uuid,
        },
    });

    // Global Refetch by recoil state
    const [needRefetch, setNeedRefetch] = useRecoilState(needRefetchState);
    useEffect(() => {
        if (needRefetch) {
            try {
                refetch();
            } catch (err) {
                console.log(err);
            } finally {
                setNeedRefetch(false);
            }
        }
    }, [needRefetch, setNeedRefetch, refetch]);

    useEffect(() => {
        if (controlDetailData) {
            const { transportHistoryInProduct } = controlDetailData;
            setCurrentMenu(['관제', transportHistoryInProduct.productName]);
            setMenuConfig(transportHistoryInProduct);
            setMenuDetail([
                {
                    key: 'menu1',
                    title: t('상세 정보'),
                    name: 'infoReport',
                    contents: [
                        {
                            key: 1,
                            title: t('제품명'),
                            content:
                                transportHistoryInProduct.productName !== null
                                    ? transportHistoryInProduct.productName
                                    : '-',
                        },
                        {
                            key: 2,
                            title: t('출고지'),
                            content:
                                transportHistoryInProduct.departurePlaceName !== null
                                    ? transportHistoryInProduct.departurePlaceName
                                    : '-',
                        },
                        {
                            key: 3,
                            title: 'S/N',
                            content:
                                transportHistoryInProduct.serial !== null
                                    ? transportHistoryInProduct.serial
                                    : '-',
                        },
                        {
                            key: 4,
                            title: t('저장 방법'),
                            content: minMaxRange(
                                transportHistoryInProduct.minTemperature,
                                transportHistoryInProduct.maxTemperature,
                                '℃',
                            ),
                        },
                        {
                            key: 5,
                            title: t('수송자 이름'),
                            content:
                                transportHistoryInProduct.userName !== null
                                    ? transportHistoryInProduct.userName
                                    : '-',
                        },
                        {
                            key: 6,
                            title: t('연락처'),
                            content:
                                transportHistoryInProduct.userPhone !== null
                                    ? transportHistoryInProduct.userPhone
                                    : '-',
                        },
                    ],
                },
            ]);
        }
        if (controlDetailError) {
            console.error(controlDetailError);
        }
    }, [controlDetailData, controlDetailError, menuConfig, setCurrentMenu, t]);

    useEffect(() => {
        if (menuConfig) {
            const {
                temperature,
                humidity,
                shock,
                indexTime,
                interval,
                inspectionTime,
                minTemperature,
                maxTemperature,
                maxHumidity,
                minHumidity,
                maxshock,
                mkt,
            } = menuConfig;
            setTableDataInTransport({
                result: temperature.map((value, idx) => ({
                    id: idx + 1,
                    key: idx + 1,
                    updatedAt: moment(indexTime)
                        .add(idx * interval, 's')
                        .local()
                        .format(`${i18n.language === 'ko' ? 'YY/MM/DD HH:mm' : 'DD/MM/YY HH:mm'}`),
                    temperatureMinMax: `${value}/${minTemperature}/${maxTemperature}`,
                    humidity: humidity.length !== 0 ? `${humidity[idx]}%` : '-',
                    shock: shock.length !== 0 ? `${shock[idx]}G` : '-',
                })),
                page,
            });
            setGraphConfig({
                data: temperature.map((value, idx) => ({
                    date: moment(indexTime)
                        .add(idx * interval, 's')
                        .local()
                        .format(
                            `${i18n.language === 'ko' ? 'YYYY-MM-DD HH:mm' : 'DD-MM-YYYY HH:mm'}`,
                        ),
                    type: 'temperature',
                    value,
                })),
            });
            setGraphMinMax({
                temperatureMax: temperature.length === 0 ? null : Math.max.apply(null, temperature),
                temperatureMin: temperature.length === 0 ? null : Math.min.apply(null, temperature),
                humidityMax: humidity.length === 0 ? null : Math.max.apply(null, humidity),
                humidityMin: humidity.length === 0 ? null : Math.min.apply(null, humidity),
                shockMax: shock.length === 0 ? null : Math.max.apply(null, shock),
            });

            setInspectAndAlarm({
                inspectionTime,
                minTemperature,
                maxTemperature,
                maxHumidity,
                minHumidity,
                maxshock,
                mkt,
            });
        }
    }, [menuConfig, page, i18n.language]);

    useEffect(() => {
        if (menuConfig) {
            if (graphConfig.data !== 0) {
                setAlarmData({
                    result: graphConfig.data.filter((r) =>
                        menuConfig.maxTemperature !== null
                            ? menuConfig.minTemperature !== null
                                ? r.value > menuConfig.maxTemperature ||
                                  r.value < menuConfig.minTemperature
                                : r.value > menuConfig.maxTemperature
                            : r.value < menuConfig.minTemperature,
                    ),
                });
            }
        }
    }, [graphConfig, menuConfig]);

    useEffect(() => {
        if (tableDataInTransport.result.length !== 0) {
            setTableData({
                result: tableDataInTransport.result.filter(
                    (r) =>
                        r.id - 1 >= (page.pageNumber - 1) * page.pageSize &&
                        r.id - 1 < page.pageNumber * page.pageSize &&
                        r.temperatureMinMax.split('/')[0],
                ),
            });
        }
    }, [tableDataInTransport, page]);

    // page change 이벤트
    const onPageChange = (pageNumber, pageSize) => {
        setPage({
            pageNumber,
            pageSize,
        });
    };

    return (
        <>
            <div className={classes.controlTableMenu}>
                <h2>
                    <TextEllipsis>
                        {menuConfig !== null ? menuConfig.productName : '-'}{' '}
                    </TextEllipsis>
                    <span style={{ display: 'block' }}>
                        {menuConfig !== null ? menuConfig.serial : '-'}
                    </span>
                </h2>
                <InformationTable
                    uuid={uuid}
                    menuDetail={menuDetail}
                    menuConfig={menuConfig}
                    alarmData={alarmData}
                />
            </div>
            <Grid container className={classes.controlTableContent}>
                <Grid container className={classes.controlTableHeader}>
                    {t('온·습도 그래프')}
                </Grid>
                <Grid item xs={12} sm={3} className={classes.controlTableOption}>
                    {/* 온도의 최대 최소 값이 정상적으로 등록되었을 때 그래프에 표기 */}
                    {graphMinMax !== null ? (
                        graphMinMax.temperatureMax === null ? (
                            graphMinMax.temperatureMin === null
                        ) : (
                            <div className="temperature">
                                <div>
                                    <div
                                        className="bar"
                                        style={{ background: colors.SECONDARY }}
                                    ></div>
                                    <p>{t('온도')}</p>
                                </div>
                                <>
                                    <li>
                                        <p>{t('최고점')} : </p>
                                        <span>
                                            {graphMinMax !== null
                                                ? graphMinMax.temperatureMax !== -Infinity
                                                    ? graphMinMax.temperatureMax
                                                    : '-'
                                                : '-'}
                                            ℃
                                        </span>
                                    </li>
                                    <li>
                                        <p>{t('최저점')} : </p>
                                        <span>
                                            {graphMinMax !== null
                                                ? graphMinMax.temperatureMin !== Infinity
                                                    ? graphMinMax.temperatureMin
                                                    : '-'
                                                : '-'}
                                            ℃
                                        </span>
                                    </li>
                                    <li>
                                        <p>{t('알람 범위')} : </p>
                                        <span>
                                            {menuConfig !== null
                                                ? minMaxRange(
                                                      menuConfig.minTemperature,
                                                      menuConfig.maxTemperature,
                                                      '℃',
                                                  )
                                                : '-'}
                                        </span>
                                    </li>
                                </>
                            </div>
                        )
                    ) : (
                        ''
                    )}
                    {/* mkt 온도 표기 */}
                    {menuConfig && menuConfig.mkt ? (
                        <div className="mkt">
                            <div>
                                <div className="bar" style={{ background: '#43c68e' }}></div>
                                <p>MKT</p>
                            </div>
                            <>
                                <li>
                                    <p>{t('평균')} : </p>
                                    <span>{menuConfig.mkt.toFixed(2)}℃</span>
                                </li>
                            </>
                        </div>
                    ) : (
                        ''
                    )}

                    {/* 습도의 최대 최소 값이 정상적으로 등록되었을 때 그래프에 표기 */}
                    {graphMinMax &&
                        (graphMinMax.humidityMax !== null || graphMinMax.humidityMin !== null ? (
                            <div className="humidity">
                                <div>
                                    <div className="bar" style={{ background: '#43c68e' }}></div>
                                    <p>{t('습도')}</p>
                                </div>
                                <>
                                    <li>
                                        <p>{t('최고점')} : </p>
                                        <span>
                                            {graphMinMax !== null
                                                ? graphMinMax.humidityMax !== -Infinity
                                                    ? graphMinMax.humidityMax
                                                    : '-'
                                                : '-'}
                                            %
                                        </span>
                                    </li>
                                    <li>
                                        <p>{t('최저점')} : </p>
                                        <span>
                                            {graphMinMax !== null
                                                ? graphMinMax.humidityMin !== Infinity
                                                    ? graphMinMax.humidityMin
                                                    : '-'
                                                : '-'}
                                            %
                                        </span>
                                    </li>
                                    <li>
                                        <p>{t('알람 범위')} : </p>
                                        <span>
                                            {menuConfig !== null
                                                ? minMaxRange(
                                                      menuConfig.minHumidity,
                                                      menuConfig.maxHumidity,
                                                      '%',
                                                  )
                                                : '-'}
                                        </span>
                                    </li>
                                </>
                            </div>
                        ) : (
                            ''
                        ))}
                </Grid>
                <Grid item xs={12} sm={9} style={{ padding: 27 }}>
                    <DataLineChart
                        config={{ ...defaultConfig, ...graphConfig }}
                        inspectAndAlarm={inspectAndAlarm}
                        alarmData={alarmData}
                    />
                </Grid>
            </Grid>
            <Grid container className={classes.controlTableContent}>
                <Grid container className={classes.controlTableHeader}>
                    {t('기록 내역')}
                </Grid>
                <Grid item xs={12} sm={12} className={classes.controlDataTable}>
                    <DataTable
                        columns={columns}
                        data={tableData.result}
                        onChange={onPageChange}
                        scroll={{ x: 480 }}
                    />
                    <DataTablePagination
                        total={tableDataInTransport && tableDataInTransport.result.length}
                        defaultCurrent={page.pageNumber}
                        defaultPageSize={page.pageSize}
                        onChange={onPageChange}
                    />
                </Grid>
            </Grid>
        </>
    );
}
