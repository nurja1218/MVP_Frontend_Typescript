import { useState, useEffect } from 'react';
import moment from 'moment';
import DataTable from '../../../view/components/DataTable';
import numberSorter from '../../../view/components/DataTable/sorter/number.sorter';
import DataTablePagination from '../../../view/components/DataTable/DataTablePagination';
import { Grid } from '@material-ui/core';
import { message, Space, Tooltip } from 'antd';
import DateRangePicker from '../../../view/components/DateRangePicker';
import SearchInput from '../../../view/components/SearchInput';
import XlsxDownloadButton from '../../../view/components/XlsxDownloadButton';
import { ALARM_STATUS } from '../../../configs/enum';
import CertificateButton from '../../../view/components/CertificateButton';
import DeliveryStatus from '../../components/DeliveryStatus';
import { useStyle } from './style';
import { useQuery } from '@apollo/react-hooks';
import tableMapper from '../../../tools/mapper/table.mapper';
import Checkboxes from '../../../view/components/Checkboxes';
import { TRANSPORTS_BY_COMPANY } from '../../../apollo/scripts/queries';
import { useHistory } from 'react-router-dom';
import AlarmBadge from '../../components/AlarmBadge';
import dateRangeMapper from '../../../tools/mapper/date-range.mapper';
import CertificateModal from '../../components/Modal/CertificateModal';
import { certificatesState, certificateState } from '../../../recoil/atoms';
import { useSetRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { controlSearchState, needRefetchState } from '../../../recoil/atoms';
import { exportToXLSX } from '../../../tools/file-export/xlsx';
import { tableDataMapper } from '../../../tools/file-export/mappers';
import CertificateMultiModal from '../../components/Modal/CertificateMultiModal';
import TextEllipsis from '../../components/ColumnRenderers/TextEllipsis';

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
        render: (text: any) => {
            return <TextEllipsis>{text}</TextEllipsis>;
        },
    },
    {
        title: '출고지',
        width: '15%',
        dataIndex: 'departurePlaceName',
        render: (text: any) => {
            return <TextEllipsis>{text}</TextEllipsis>;
        },
    },
    {
        title: '배송 내역',
        width: '35%',
        dataIndex: 'transportAndAlarm',
        render: (transportAndAlarm: any) => {
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
                // status={state}
                />
            );
        },
    },
    {
        title: '출하증명서',
        width: '140px',
        dataIndex: 'certificate',
        render: (keyAndStatus: any) => {
            const [key, status, alarm] = keyAndStatus.split('/');
            return <CertificateModalButton uuid={key} status={status} alarm={alarm} />;
        },
    },
    {
        title: '상태',
        width: '120px',
        dataIndex: 'alarmRangeStatusId',
        // render: (state) => <>{ALARM_STATUS[state]}</>,
        render: (state: any) => <AlarmBadge status={state} />,
    },
];

function CertificateModalButton({ uuid, status, alarm }: any) {
    const setModal = useSetRecoilState(certificateState);
    const onClick = () => {
        setModal({
            open: true,
            uuid,
        });
    };
    return <CertificateButton status={status} alarm={alarm} onClick={onClick} />;
}

const checkOptions = [
    {
        label: '알람',
        value: 'ALARM',
    },
    {
        label: '출하증명서 정상발급',
        value: 'CERTIFICATE',
    },
];
const defaultOptionValue = ['']; // NORMAL? PASS?

export default function ControlTableContainer() {
    const { t, i18n } = useTranslation();
    const classes: any = useStyle();
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

    const history = useHistory();
    const [searchType, setSearchType] = useState<any>(defaultOptionValue);

    // Main Card 클릭 시 검색 이벤트
    const [searchInitialValue, setSearchInitialValue] = useState(null);
    const [controlSearch, setControlSearch] = useRecoilState(controlSearchState);
    useEffect(() => {
        if (controlSearch.active) {
            const { text, types }: any = controlSearch;
            setSearchInitialValue(text);
            if (types) {
                setSearchType(types);
            }
            setSearch({
                text,
                dateRange: dateRangeMapper(moment(), moment()),
            });
            setControlSearch({
                active: false,
                text: '',
                types: [''],
            });
        }
    }, [controlSearch, setControlSearch]);

    const {
        data: transportData,
        error: transportError,
        refetch,
    } = useQuery(TRANSPORTS_BY_COMPANY, {
        variables: {
            page,
            search: {
                ...search,
                types: searchType,
            },
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
        if (transportData) {
            const { transportsByCompany } = transportData;
            const { result, pages } = tableMapper(transportsByCompany, i18n.language);
            // tableData에 set함수로 데이터를 형태 변환할 부분을 바꾸고 동일하면 그대로 담는다
            setTableData({
                result: result.map((r: any) => ({
                    ...r,
                    certificate: `${r.key}/${r.certificateStatusId}/${r.alarmRangeStatusId}`,
                    transportAndAlarm: `${r.transportStatusId}/${r.alarmRangeStatusId}/${r.departureTime}/${r.arrivalTime}/${i18n.language}`,
                })),
                pages,
            });
        }
        if (transportError) {
            console.error(transportError);
        }
    }, [transportData, transportError, i18n.language]);

    // 테이블 row 체크박스
    const [selectedUUIDs, setSelectedUUIDs] = useState([]);
    const rowSelection = {
        onChange: (_: any, selectedRows: any) => {
            setSelectedUUIDs(
                selectedRows
                    .filter((row: any) => row.certificateStatusId === 'ISSUED')
                    .map((row: any) => row.key),
            );
        },
        getCheckboxProps: (record: any) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };
    // page change 이벤트
    const onPageChange = (pageNumber: any, pageSize: any) => {
        setPage({
            pageNumber: pageNumber,
            pageSize,
        });
    };
    // 단어 검색 이벤트
    const onSearch = (value: any) => {
        setSearch({ ...search, text: value });
    };
    // 기간 검색 이벤트
    const onDateChange = ([from, to]: Array<string>) => {
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

    const setCertificatesModal = useSetRecoilState(certificatesState);
    const handleDownloadCertificates = () => {
        if (selectedUUIDs.length === 0) {
            message.error(t('정상발급된 출하증명서를 1개 이상 선택하세요.'));
            return;
        }
        setCertificatesModal({
            open: true,
            uuids: selectedUUIDs,
        });
    };

    const handleExportXLSX = () => {
        exportToXLSX({
            data: tableDataMapper(
                columns,
                tableData.result,
                {
                    alarmRangeStatusId: (value: any) => ALARM_STATUS[value],
                    transportAndAlarm: (value: any) => {
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
                title: '관제',
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
        <div className={classes.controlTable}>
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
                <Tooltip title={t('제품명을 입력하여 조회할 수 있습니다.')}>
                    <Grid item xs={12} sm={3}>
                        <SearchInput
                            placeholder="Search"
                            onSearch={onSearch}
                            initialValue={searchInitialValue}
                        />
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
                    <Space>
                        <Tooltip title={t('출하증명서를 다운로드 할 수 있습니다.')}>
                            <div>
                                <CertificateButton
                                    onClick={handleDownloadCertificates}
                                    status="MULTIPART"
                                />
                            </div>
                        </Tooltip>
                        <Tooltip title={t('제품목록을 다운로드 할 수 있습니다.')}>
                            <div>
                                <XlsxDownloadButton onClick={handleExportXLSX} />
                            </div>
                        </Tooltip>
                    </Space>
                </Grid>
            </Grid>
            <DataTable
                columns={columns}
                data={tableData.result}
                rowEventWithKey={(key: any) => history.push(`/control/detail/${key}`)}
                rowSelection={{ type: 'checkbox', ...rowSelection }}
                scroll={{ x: 1200, y: 'calc(100vh - 270px)' }}
                style={{ height: 'calc(100vh - 222px)' }}
            />
            <DataTablePagination
                total={tableData.pages && tableData.pages.totalItems}
                defaultCurrent={page.pageNumber}
                defaultPageSize={page.pageSize}
                onChange={onPageChange}
            />
        </div>
    );
}
