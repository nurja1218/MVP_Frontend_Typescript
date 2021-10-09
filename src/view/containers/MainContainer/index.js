import { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import moment from 'moment';
import { useStyles } from './style';
import DataTable from '@/view/components/DataTable';
import localeSorter from '@/view/components/DataTable/sorter/locale.sorter';
import numberSorter from '@/view/components/DataTable/sorter/number.sorter';
import DeliveryStatus from '@/view/components/DeliveryStatus';
import AlarmBadge from '@/view/components/AlarmBadge';
import CertificateButton from '@/view/components/CertificateButton';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import MainCarouselContainer from '../MainCarouselContainer';
import tableMapper from '@/tools/mapper/table.mapper';
import { TRANSPORTS_BY_COMPANY, TODAY_TRANSPORT_COUNTS } from '@/apollo/scripts/queries';
import dateRangeMapper from '@/tools/mapper/date-range.mapper';
import { certificateState, controlSearchState, needRefetchState } from '../../../recoil/atoms';
import { useRecoilState, useSetRecoilState } from 'recoil';
import CertificateModal from '../../components/Modal/CertificateModal';
import TextEllipsis from '@/view/components/ColumnRenderers/TextEllipsis';
import { useTranslation } from 'react-i18next';

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
        sorter: localeSorter('productName'),
        render: (value) => <TextEllipsis>{value}</TextEllipsis>,
    },
    {
        title: '출고지',
        width: '15%',
        dataIndex: 'departurePlaceName',
        sorter: localeSorter('departurePlaceName'),
        render: (value) => <TextEllipsis>{value}</TextEllipsis>,
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
                    // status={state}
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
            return <CertificateModalButton uuid={key} status={status} alarm={alarm} />;
        },
    },
    {
        title: '상태',
        width: '150px',
        dataIndex: 'alarmRangeStatusId',
        sorter: localeSorter('alarmRangeStatusId'),
        // render: (state) => <>{ALARM_STATUS[state]}</>,
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
    return (
        <CertificateButton status={status} alarm={alarm} onClick={onClick} style={{ height: 28 }} />
    );
}

// moment.lang('ko', {
//     weekdays: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
// });
moment.locale('ko', {
    weekdays: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
});

// const TodayDate = moment().local().format('YYYY/MM/DD dddd');

export default function MainContainer() {
    const { t, i18n } = useTranslation();
    const classes = useStyles();
    const [tableData, setTableData] = useState({
        result: [],
    });
    // const [page, setPage] = useState({
    //     pageNumber: 1,
    //     pageSize: 100,
    // });
    const history = useHistory();

    const [todayDate, setTodayDate] = useState(null);
    // const [shipped, setShipped] = useState(0);
    // const [delivered, setDelivered] = useState(0);
    const [mainCount, setMainCount] = useState({
        shipped: 0,
        delivered: 0,
        certificated: 0,
    });

    const {
        data: transportData,
        error: transportError,
        refetch: transportRefetch,
    } = useQuery(TRANSPORTS_BY_COMPANY, {
        variables: {
            page: {
                pageNumber: 1,
                pageSize: 100,
            },
            search: {
                text: '',
                dateRange: dateRangeMapper(moment(), moment()),
            },
        },
    });

    const {
        data: todayTransport,
        error: todayTransportError,
        refetch: todayTransportRefetch,
    } = useQuery(TODAY_TRANSPORT_COUNTS, {
        variables: {
            dateRange: dateRangeMapper(moment(), moment()),
        },
    });
    useEffect(() => {
        if (i18n.language === 'ko') {
            setTodayDate(moment().local().format('YYYY/MM/DD dddd'));
        } else if (i18n.language === 'en') {
            setTodayDate(moment().locale('en').format('dddd MM/DD/YYYY'));
        }
    }, [i18n.language]);

    // Global Refetch by recoil state
    const [needRefetch, setNeedRefetch] = useRecoilState(needRefetchState);
    useEffect(() => {
        if (needRefetch) {
            try {
                todayTransportRefetch();
                transportRefetch();
            } catch (err) {
                console.log(err);
            } finally {
                setNeedRefetch(false);
            }
        }
    }, [needRefetch, setNeedRefetch, todayTransportRefetch, transportRefetch]);

    useEffect(() => {
        if (transportData) {
            const { transportsByCompany } = transportData;
            const { result, pages } = tableMapper(transportsByCompany, i18n.language);
            // tableData에 set함수로 데이터를 형태 변환할 부분을 바꾸고 동일하면 그대로 담는다
            setTableData({
                result: result.map((r) => ({
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

    useEffect(() => {
        if (todayTransport) {
            const { transportCounts } = todayTransport;
            setMainCount({
                shipped: transportCounts.departureProducts,
                delivered: transportCounts.arrivalProducts,
                certificated: transportCounts.issuedCertificates,
            });
            // setShipped(transportCounts.departureProducts);
            // setDelivered(transportCounts.arrivalProducts);
        }
        if (todayTransportError) {
            console.error(todayTransportError);
        }
    }, [todayTransport, todayTransportError]);

    const setControlSearch = useSetRecoilState(controlSearchState);
    const handleClickCertificate = () => {
        setControlSearch({
            active: true,
            text: '',
            types: ['CERTIFICATE'],
        });
        history.push('/control');
    };

    return (
        <>
            <CertificateModal />
            <Grid container>
                <div className={classes.mainInformation} style={{ width: 360, paddingTop: 15 }}>
                    <h3>{todayDate}</h3>
                    <ul>
                        <li>
                            <img src="/assets/common/shipped.svg" alt="" />
                            <p>
                                {t('출고')} {mainCount.shipped}
                                {t('건')}
                            </p>
                        </li>
                        <li>
                            <img src="/assets/common/delivered.svg" alt="" />
                            <p>
                                {t('도착')} {mainCount.delivered}
                                {t('건')}
                            </p>
                        </li>
                    </ul>
                    <div className={classes.mainCertificateCard}>
                        <h2>
                            {/* delivered - error 의 값 */}
                            {t('출하증명서')} <br /> {t('정상 발급')} {mainCount.certificated}
                            {t('건')}
                        </h2>
                        <button onClick={handleClickCertificate}>
                            {/* <img src="/assets/common/more_chevron.svg" alt="" /> */}
                            {t('발급 받으러 가기')}
                        </button>
                    </div>
                </div>
                <div style={{ width: 'calc(100% - 360px)' }}>
                    <div>
                        <MainCarouselContainer />
                    </div>
                </div>
                <Grid item xs={12} sm={12} className={classes.mainControlTable}>
                    <p>{t('관제')}</p>
                    <DataTable
                        columns={columns}
                        data={tableData.result}
                        rowEventWithKey={(key) => history.push(`/control/detail/${key}`)}
                        scroll={{ x: 1200, y: 'calc(100vh - 615px)' }}
                    />
                </Grid>
            </Grid>
        </>
    );
}
