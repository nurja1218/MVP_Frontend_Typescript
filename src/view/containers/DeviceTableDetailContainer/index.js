import { useEffect, useState } from 'react';
import moment from 'moment';
import DataTable from '@/view/components/DataTable';
import numberSorter from '@/view/components/DataTable/sorter/number.sorter';
import DataTablePagination from '@/view/components/DataTable/DataTablePagination';
import { Grid } from '@material-ui/core';
import { message, Space, Tooltip } from 'antd';
import DateRangePicker from '@/view/components/DateRangePicker';
import SearchInput from '@/view/components/SearchInput';
import DataBarTable from '@/view/components/DataBarTable';
import XlsxDownloadButton from '@/view/components/XlsxDownloadButton';
import { ALARM_STATUS } from '@/configs/enum';
import CertificateButton from '@/view/components/CertificateButton';
import AlarmBadge from '../../components/AlarmBadge';
import DeliveryStatus from '../../components/DeliveryStatus';
import tableMapper from '@/tools/mapper/table.mapper';
import { useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { DEVICEDETAIL_BY_SERIAL } from '@/apollo/scripts/queries';
import { DEVICECOUNTS_BY_COMPANY } from '@/apollo/scripts/queries';
import { useStyles } from './style';
import { useSetRecoilState } from 'recoil';
import { certificateState } from '../../../recoil/atoms';
import CertificateModal from '../../components/Modal/CertificateModal';
import CertificateMultiModal from '../../components/Modal/CertificateMultiModal';
import dateRangeMapper from '../../../tools/mapper/date-range.mapper';
import { useRecoilState } from 'recoil';
import { needRefetchState } from '@/recoil/atoms';
import { exportToXLSX } from '@/tools/file-export/xlsx';
import { tableDataMapper } from '@/tools/file-export/mappers';
import TextEllipsis from '../../components/ColumnRenderers/TextEllipsis';
import { useTranslation } from 'react-i18next';

const defaultConfig = {
    xField: 'value',
    yField: 'id',
    seriesField: 'status',
    isPercent: false,
    isStack: true,
    legend: false,
    color: ['#E5E6EA', '#43C68E', '#3c6af5'],
    xAxis: {
        label: {
            formatter: function formatter(v) {
                return '';
            },
        },
        line: {
            style: {
                stroke: 'white',
            },
            // visible: false,
        },
    },
    yAxis: {
        label: {
            formatter: function formatter(v) {
                return '';
            },
        },
        line: {
            style: {
                stroke: 'white',
            },
        },
    },
    interactions: [
        {
            type: 'active-region',
            enable: false,
        },
    ],
};

const columns = [
    {
        title: 'No.',
        width: '80px',
        dataIndex: 'id',
        sorter: numberSorter('id'),
    },
    {
        title: '제품명',
        width: '20%',
        dataIndex: 'productName',
        render: (text) => <TextEllipsis>{text}</TextEllipsis>,
    },
    {
        title: '출고지',
        width: '15%',
        dataIndex: 'departurePlaceName',
        render: (text) => <TextEllipsis>{text}</TextEllipsis>,
    },
    {
        title: '배송 내역',
        width: '35%',
        dataIndex: 'transportAndAlarm',
        render: (transportAndAlarm) => {
            const [transport, alarm, departureTime, arrivalTime, lang] =
                transportAndAlarm.split('/');
            return (
                <DeliveryStatus
                    transport={transport}
                    alarm={alarm}
                    departureTime={
                        departureTime === 'null'
                            ? '--/--/-- --:--'
                            : moment
                                .unix(departureTime / 1000)
                                .local()
                                .format(`${lang === 'ko' ? 'YY/MM/DD HH:mm' : 'DD/MM/YY HH:mm'}`)
                    }
                    arrivalTime={
                        arrivalTime === 'null'
                            ? ''
                            : moment
                                .unix(arrivalTime / 1000)
                                .local()
                                .format(`${lang === 'ko' ? 'YY/MM/DD HH:mm' : 'DD/MM/YY HH:mm'}`)
                    }
                />
            );
        },
    },
    {
        title: '출하증명서',
        width: '150px',
        dataIndex: 'certificate',
        render: (keyAndStatus) => {
            const [key, status, alarm] = keyAndStatus.split('/');
            console.log(key)
            return <CertificateModalButton uuid={key} status={status} alarm={alarm} />;
        },
    },
    {
        title: '상태',
        width: '150px',
        dataIndex: 'alarmRangeStatusId',
        render: (state) => <AlarmBadge status={state} />,
    },
];

function CertificateModalButton({ uuid, status, alarm }) {
    const setModal = useSetRecoilState(certificateState);
    const onClick = () => {
        setModal({
            open: true,
            uuid,
        });
    };
    return <CertificateButton status={status} alarm={alarm} onClick={onClick} />;
}

export default function DeviceTableDetailContainer({ serial }) {
    const { t, i18n } = useTranslation();
    const history = useHistory();
    const classes = useStyles();
    const [deviceCount, setDeviceCount] = useState([]);
    const [tableData, setTableData] = useState({
        result: [],
    });
    const [search, setSearch] = useState({
        text: '',
        dateRange: {
            from: '',
            to: '',
        },
    });
    const [page, setPage] = useState({
        pageNumber: 1,
        pageSize: 100,
    });
    const {
        data: deviceDetailData,
        error: deviceDetailError,
        refetch: deviceRefetch,
    } = useQuery(DEVICEDETAIL_BY_SERIAL, {
        variables: {
            serial,
            page,
            search,
        },
    });

    const {
        data: deviceCountData,
        error: deviceCountError,
        refetch: deviceCountRefetch,
    } = useQuery(DEVICECOUNTS_BY_COMPANY);

    // Global Refetch by recoil state
    const [needRefetch, setNeedRefetch] = useRecoilState(needRefetchState);
    useEffect(() => {
        if (needRefetch) {
            try {
                deviceRefetch();
                deviceCountRefetch();
            } catch (err) {
                console.log(err);
            } finally {
                setNeedRefetch(false);
            }
        }
    }, [needRefetch, setNeedRefetch, deviceRefetch, deviceCountRefetch]);

    useEffect(() => {
        if (deviceDetailData) {
            const { deviceDetailBySerial } = deviceDetailData;
            const { result, pages } = tableMapper(
                deviceDetailBySerial,
                i18n.language,
                0,
                'transportUUID',
            );
            // tableData에 set함수로 데이터를 형태 변환할 부분을 바꾸고 동일하면 그대로 담는다
            setTableData({
                result: result.map((r) => ({
                    ...r,
                    certificate: `${r.transportUUID}/${r.certificateStatusId}/${r.alarmRangeStatusId}`,
                    transportAndAlarm: `${r.transportStatusId}/${r.alarmRangeStatusId}/${r.departureTime}/${r.arrivalTime}/${i18n.language}`,
                })),
                pages,
            });
        }
        if (deviceDetailError) {
            console.error(deviceDetailError);
        }
    }, [deviceDetailData, deviceDetailError, i18n.language]);

    useEffect(() => {
        if (deviceCountData) {
            const { deviceCountsByCompany } = deviceCountData;

            const { progressDevices, arrivedDevices, unusedDevices } = deviceCountsByCompany;
            setDeviceCount([
                {
                    id: i18n.language === 'ko' ? '현재 기기 현황' : 'Current device status',
                    status: t('배송중 기기'),
                    value: progressDevices,
                    color: '#3c6af5',
                },
                {
                    id: i18n.language === 'ko' ? '현재 기기 현황' : 'Current device status',
                    status: t('도착 완료 기기'),
                    value: arrivedDevices,
                    color: '#43c68e',
                },
                {
                    id: i18n.language === 'ko' ? '현재 기기 현황' : 'Current device status',
                    status: t('미사용 기기'),
                    value: unusedDevices,
                    color: '#E5E6EA',
                },
            ]);
        }
        if (deviceCountError) {
            console.error(deviceCountError);
        }
    }, [deviceCountData, deviceCountError, t, i18n.language]);

    // 테이블 체크박스
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    // page change 이벤트
    const onPageChange = (pageNumber, pageSize) => {
        setPage({
            pageNumber,
            pageSize,
        });
    };
    // 단어 검색 이벤트
    const onSearch = (value) => {
        setSearch({ ...search, text: value });
    };
    // 기간 검색 이벤트
    const onDateChange = ([from, to]) => {
        setSearch({
            ...search,
            dateRange: dateRangeMapper(from, to),
        });
    };

    const handleExportXLSX = () => {
        exportToXLSX({
            data: tableDataMapper(
                columns,
                tableData.result,
                {
                    alarmRangeStatusId: (value) => ALARM_STATUS[value],
                    transportAndAlarm: (value) => {
                        const [_1, _2, departureTime, arrivalTime] = value.split('/');
                        return `${moment
                            .unix(departureTime / 1000)
                            .local()
                            .format('YYYY-MM-DD HH:mm')} ${t('출발')}${arrivalTime !== 'null'
                                ? ` ~ ${moment
                                    .unix(arrivalTime / 1000)
                                    .local()
                                    .format('YYYY-MM-DD HH:mm')} ${t('도착')}`
                                : ''
                            }`;
                    },
                },
                ['certificate'],
            ),
            configs: {
                title: '기기관리상세',
            },
        })
            .then(() => {
                message.success(t('파일 추출이 시작되었습니다. 다운로드 내역을 확인하세요.'));
            })
            .catch(() => {
                message.error(t('파일 추출 중 문제가 발생했습니다.'));
            });
    };
    return (
        <div>
            <div>
                <DataBarTable
                    config={{
                        ...defaultConfig,
                        data: deviceCount,
                    }}
                />
            </div>

            <div className={classes.deviceTableDetail}>
                <CertificateMultiModal />
                <CertificateModal />
                <Grid
                    container
                    spacing={1}
                    alignItems="center"
                    style={{
                        padding: '16px 20px',
                    }}
                >
                    <Grid item xs={12} sm={3}>
                        <SearchInput placeholder="Search" onSearch={onSearch} />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <DateRangePicker onChange={onDateChange} />
                    </Grid>
                    <Grid item xs={12} sm={6} align="right">
                        <Tooltip
                            title={
                                i18n.language === 'ko'
                                    ? `${serial}의 제품목록을 다운로드 할 수 있습니다.`
                                    : i18n.language === 'en'
                                        ? `Product list of ${serial} can be downloaded`
                                        : ''
                            }
                        >
                            <Space size={12}>
                                <XlsxDownloadButton onClick={handleExportXLSX} />
                            </Space>
                        </Tooltip>
                    </Grid>
                </Grid>
                <DataTable
                    columns={columns}
                    data={tableData.result}
                    rowEventWithKey={(key) => history.push(`/control/detail/${key}`)}
                    rowSelection={{ type: 'checkbox', ...rowSelection }}
                    scroll={{ x: 1200, y: 'calc(100vh - 403px)' }}
                    style={{ height: 'calc(100vh - 355px)' }}
                />
                <DataTablePagination
                    total={tableData.pages && tableData.pages.totalItems}
                    defaultCurrent={page.pageNumber}
                    defaultPageSize={page.pageSize}
                    onChange={onPageChange}
                />
            </div>
        </div>
    );
}
