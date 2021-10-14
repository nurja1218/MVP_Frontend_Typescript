import { useCallback, useEffect, useState } from 'react';
import { GOOGLE_MAPS_KEY } from '../../../configs/variables';
import DataTable from '../../../view/components/DataTable';
import localeSorter from '../../../view/components/DataTable/sorter/locale.sorter';
import numberSorter from '../../../view/components/DataTable/sorter/number.sorter';
import DataTablePagination from '../../../view/components/DataTable/DataTablePagination';
import { Grid } from '@material-ui/core';
import { message, Space, Tooltip } from 'antd';
import Checkboxes from '../../../view/components/Checkboxes';
import DateRangePicker from '../../../view/components/DateRangePicker';
import SearchInput from '../../../view/components/SearchInput';
import RowStateBadge from '../../../view/components/RowStateBadge';
import DataBarTable from '../../../view/components/DataBarTable';
import XlsxDownloadButton from '../../../view/components/XlsxDownloadButton';
import { useHistory } from 'react-router-dom';
import { useStyle } from './style';
import Geocode from 'react-geocode';
import { useQuery } from '@apollo/react-hooks';
import tableMapper from '../../../tools/mapper/table.mapper';
import { DEVICES_BY_COMPANY } from '../../../apollo/scripts/queries';
import { DEVICECOUNTS_BY_COMPANY } from '../../../apollo/scripts/queries';
import TextEllipsis from '../../components/ColumnRenderers/TextEllipsis';
import dateRangeMapper from '../../../tools/mapper/date-range.mapper';
import { needRefetchState } from '../../../recoil/atoms';
import { useRecoilState } from 'recoil';
import { exportToXLSX } from '../../../tools/file-export/xlsx';
import { tableDataMapper } from '../../../tools/file-export/mappers';
import { DEVICE_STATUS } from '../../../configs/enum';
import { useTranslation } from 'react-i18next';

const defaultConfig = {
    xField: 'value',
    yField: 'id',
    seriesField: 'status',
    isPercent: false,
    isStack: true,
    legend: false, // legend 제거하고, recoil로 연결!?
    color: ['#E5E6EA', '#43C68E', '#3c6af5'],
    xAxis: {
        label: {
            formatter: function formatter(v: any) {
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
            formatter: function formatter(v: any) {
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
    // tooltip: false,
};

const columns = [
    {
        title: 'No.',
        width: '80px',
        dataIndex: 'id',
        fontWeight: '700',
        sorter: numberSorter('id'),
    },
    {
        title: 'S/N',
        width: '125px',
        dataIndex: 'serial',
    },
    {
        title: '제품명',
        width: '20%',
        dataIndex: 'productName',
        render: (text: any) => <TextEllipsis>{text ? text : '-'}</TextEllipsis>,
    },
    {
        title: '등록일',
        width: '180px',
        dataIndex: 'createdAt',
        sorter: localeSorter('createdAt'),
    },
    {
        title: '사용횟수',
        width: '130px',
        dataIndex: 'usedCount',
        sorter: numberSorter('usedCount'),
    },
    {
        title: '운영 현황',
        width: '150px',
        dataIndex: 'status',
        render: (state: any) => <StatusBadge status={state} />,
    },
    {
        title: '최종 도착지',
        dataIndex: 'lastArrivalLocation',
        render: (lastArrivalLocation: any) => {
            const [lat, lng] = lastArrivalLocation ? lastArrivalLocation.split('/') : [null, null];
            return <FindAddressFromLatLng lat={lat} lng={lng} />;
        },
    },
    {
        title: '최종 업데이트일',
        width: '180px',
        dataIndex: 'updatedAt',
        sorter: localeSorter('lastUpdateDate'),
    },
];

const extractAddress = (lat: any, lng: any) => {
    return Geocode.fromLatLng(lat, lng).then(
        (response) => {
            const address = response.results[0].formatted_address;
            return address;
        },
        (error) => {
            console.error(error);
            throw new Error(error);
        },
    );
};

const checkOptions = [
    {
        label: '배송중',
        value: 'PROGRESS',
    },
    {
        label: '미사용',
        value: 'UNUSED',
    },
    {
        label: '도착완료',
        value: 'ARRIVE',
    },
];

const defaultOptionValue = ['PROGRESS', 'ARRIVE', 'UNUSED'];

// 운영 현황 뱃지
function StatusBadge({ status }: any) {
    return <RowStateBadge status={status} />;
}

function FindAddressFromLatLng({ lat, lng }: any) {
    const { i18n } = useTranslation();
    // Geocode세팅
    Geocode.setApiKey(GOOGLE_MAPS_KEY);
    Geocode.setLanguage(i18n.language === 'ko' ? 'ko' : 'en');

    const [address, setAddress] = useState('');

    const getPlaceName = useCallback(async () => {
        const arriveName = await extractAddress(lat, lng);
        setAddress(arriveName);
    }, [lat, lng]);

    useEffect(() => {
        if (lat && lng) {
            getPlaceName();
        }
    }, [lat, lng, i18n.language, getPlaceName]);

    return <TextEllipsis>{address}</TextEllipsis>;
}
export default function DeviceTableContainer() {
    const { t, i18n } = useTranslation();
    const classes: any = useStyle();
    const history = useHistory();
    const [deviceCount, setDeviceCount] = useState<any>([]);
    const [tableData, setTableData] = useState<any>({
        result: [],
    });
    const [search, setSearch] = useState<any>({
        text: '',
        dateRange: {
            from: '',
            to: '',
        },
    });
    const [page, setPage] = useState<any>({
        pageNumber: 1,
        pageSize: 100,
    });
    const [searchType, setSearchType] = useState<any>(defaultOptionValue);

    const {
        data: deviceData,
        error: deviceError,
        refetch: deviceRefetch,
    } = useQuery(DEVICES_BY_COMPANY, {
        variables: {
            page,
            search: {
                ...search,
                types: searchType,
            },
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
        if (deviceData) {
            const { devicesByCompany } = deviceData;
            const { result, pages } = tableMapper(devicesByCompany, i18n.language, 0, 'serial');
            // tableData에 set함수로 데이터를 형태 변환할 부분을 바꾸고 동일하면 그대로 담는다
            setTableData({
                result: result.map((r: any) => ({
                    ...r,
                })),
                pages,
            });
        }
        if (deviceError) {
            console.error(deviceError);
        }
    }, [deviceData, deviceError, i18n.language]);

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
    // page change 이벤트
    const onPageChange = (pageNumber: any, pageSize: any) => {
        setPage({
            pageNumber,
            pageSize,
        });
    };
    // 단어 검색 이벤트
    const onSearch = (value: any) => {
        setSearch({ ...search, text: value });
    };
    // 기간 검색 이벤트
    const onDateChange = ([from, to]: any) => {
        setSearch({
            ...search,
            dateRange: dateRangeMapper(from, to),
        });
    };
    const onSelectChange = (value: any) => {
        if (Array.isArray(value) && value.length === 0) {
            value = [''];
        }
        setSearchType(value);
    };

    const handleExportXLSX = () => {
        exportToXLSX({
            data: tableDataMapper(columns, tableData.result, {
                status: (value: any) => DEVICE_STATUS[value],
            }),
            configs: {
                title: '기기관리',
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
        <>
            <DataBarTable
                config={{
                    ...defaultConfig,
                    data: deviceCount,
                }}
            />

            <div className={classes.deviceTable}>
                <Grid
                    container
                    spacing={1}
                    alignItems="center"
                    style={{
                        padding: '16px 20px',
                    }}
                >
                    <Tooltip title={t('제품명 또는 S/N을 입력하여 조회할 수 있습니다.')}>
                        <Grid item xs={12} sm={3}>
                            <SearchInput placeholder="Search" onSearch={onSearch} />
                        </Grid>
                    </Tooltip>
                    <Tooltip title={t('등록일을 입력하여 조회할 수 있습니다.')}>
                        <Grid item xs={12} sm={3}>
                            <DateRangePicker onChange={onDateChange} />
                        </Grid>
                    </Tooltip>
                    <Grid item xs={12} sm={3}>
                        <Checkboxes
                            options={checkOptions}
                            onChange={onSelectChange}
                            defaultValue={defaultOptionValue}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3} className={classes.gridAlign}>
                        <Tooltip title={t('기기목록을 다운로드 할 수 있습니다.')}>
                            <Space size={12}>
                                <XlsxDownloadButton onClick={handleExportXLSX} />
                            </Space>
                        </Tooltip>
                    </Grid>
                </Grid>
                <DataTable
                    columns={columns}
                    data={tableData.result}
                    rowEventWithKey={(key: any) => history.push(`/device/detail/${key}`)}
                    scroll={{ x: 1200, y: 'calc(100vh - 402px)' }}
                    style={{ height: 'calc(100vh - 355px)' }}
                />
                <DataTablePagination
                    total={tableData.pages && tableData.pages.totalItems}
                    defaultCurrent={page.pageNumber}
                    defaultPageSize={page.pageSize}
                    onChange={onPageChange}
                />
            </div>
        </>
    );
}
