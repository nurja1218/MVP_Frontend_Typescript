import { useEffect, useState } from 'react';
import moment from 'moment';
import { Collapse } from 'antd';
import { useStyles } from './style';
import DeliveryInformation from '../../components/DeliveryInformation';
import { DELIVERY_STATUS } from '../../../configs/enum';
import MapViewer from '../../components/MapViewer';
import { useTranslation } from 'react-i18next';

const { Panel } = Collapse;

const data = [
    {
        key: 'menu1',
        title: '상세 정보',
        name: 'infoReport',
        contents: [
            {
                key: 1,
                title: '제품명',
                content: '-',
            },
            {
                key: 2,
                title: '출고지',
                content: '-',
            },
            {
                key: 3,
                title: 'S/N',
                content: '-',
            },
            {
                key: 4,
                title: '저장 방법',
                content: '-',
            },
            {
                key: 5,
                title: '수송자 이름',
                content: '-',
            },
            {
                key: 6,
                title: '연락처',
                content: '-',
            },
        ],
    },
];

// 배송 내역의 상태
const alarmStateId = DELIVERY_STATUS.ABNORMAL;

export default function InformationTable({ uuid, menuDetail, menuConfig, alarmData }) {
    const { t, i18n } = useTranslation();
    const [transportTime, setTransportTime] = useState(null);
    const [transportHistory, setTransportHistory] = useState({
        humidityAlarm: null,
        temperatureAlarm: null,
        shockAlarm: null,
        departurePlaceName: null,
        departureLocation: null,
        departureTime: null,
        arrivalLocation: null,
        arrivalTime: null,
        inspectionLocation: null,
        inspectionTime: null,
        alarmRangeStatusId: null,
        certificateStatusId: null,
        indexTime: null,
        transportStatusId: null,
    });
    const [locationInMap, setLocationInMap] = useState({
        result: [],
    });
    const classes = useStyles();
    // const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
    const [menuData, setMenuData] = useState([]);

    useEffect(() => {
        if (menuDetail.length === 0) {
            setMenuData(data);
        } else {
            setMenuData(menuDetail);
        }
        if (menuConfig) {
            // 나중에 온도,습도가 동시에 알람이 생겼을 때 알람 추가 방법 문의 필요
            const {
                arrivalTime,
                departureTime,
                departurePlaceName,
                departureLocation,
                inspectionLocation,
                arrivalLocation,
            } = menuConfig;

            if (arrivalTime) {
                const arrivalTimeDate = moment(arrivalTime).format('YYYY-MM-DD HH:mm:ss');
                const departureTimeDate = moment(departureTime).format('YYYY-MM-DD HH:mm:ss');
                const diffTime = moment.duration(
                    moment(arrivalTimeDate).diff(moment(departureTimeDate)),
                );
                setTransportTime(diffTime._data);
            }

            setLocationInMap({
                result: [
                    departureLocation !== null && {
                        placeName: departurePlaceName,
                        locationType: 'depart',
                        latitude: parseFloat(departureLocation.split('/')[0]),
                        longitude: parseFloat(departureLocation.split('/')[1]),
                    },
                    inspectionLocation !== null && {
                        placeName: departurePlaceName,
                        locationType: 'inspect',
                        latitude: parseFloat(inspectionLocation.split('/')[0]),
                        longitude: parseFloat(inspectionLocation.split('/')[1]),
                    },
                    arrivalLocation !== null && {
                        placeName: departurePlaceName,
                        locationType: 'arrive',
                        latitude: parseFloat(arrivalLocation.split('/')[0]),
                        longitude: parseFloat(arrivalLocation.split('/')[1]),
                    },
                ],
            });

            setTransportHistory({
                humidityAlarm: menuConfig.humidityAlarm,
                temperatureAlarm: menuConfig.temperatureAlarm,
                shockAlarm: menuConfig.shockAlarm,
                departurePlaceName: menuConfig.departurePlaceName,
                departureLocation: menuConfig.departureLocation,
                departureTime: menuConfig.departureTime,
                arrivalLocation: menuConfig.arrivalLocation,
                arrivalTime: menuConfig.arrivalTime,
                inspectionLocation: menuConfig.inspectionLocation,
                inspectionTime: menuConfig.inspectionTime,
                alarmRangeStatusId: menuConfig.alarmRangeStatusId,
                certificateStatusId: menuConfig.certificateStatusId,
                indexTime: menuConfig.indexTime,
                transportStatusId: menuConfig.transportStatusId,
            });
        }
    }, [menuDetail, menuConfig]);

    // const [openKeys, setOpenKeys] = useState(['sub1']);

    // const onOpenChange = (keys) => {
    //     const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    //     if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
    //         setOpenKeys(keys);
    //     } else {
    //         setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    //     }
    // };
    return (
        <>
            <Collapse defaultActiveKey={['1', '3', '4']} className={classes.informationTable}>
                {menuData &&
                    menuData.map((menuData, idx) => (
                        <Panel key={1} header={t(menuData.title)} className={classes.infoReport}>
                            <ul>
                                {menuData.contents.map((mt) => (
                                    <li key={mt.key}>
                                        <p>{t(mt.title)}</p>
                                        <span>{mt.content}</span>
                                    </li>
                                ))}
                            </ul>
                        </Panel>
                    ))}
                <Panel
                    key="2"
                    header={
                        menuConfig !== null &&
                        (menuConfig.alarmRangeStatusId === 'NORMAL' ||
                        menuConfig.alarmRangeStatusId === 'NONE' ? (
                            <span className="alarm">
                                <img src="/assets/common/alarm.svg" alt="" />
                                {t('현재 알람 발생 내역이 없습니다.')}
                            </span>
                        ) : (
                            <span className="alarm error">
                                <img src="/assets/common/report_problem_white.svg" alt="" />
                                {t('알람이 발생했습니다.')}
                            </span>
                        ))
                    }
                    className={
                        menuConfig !== null &&
                        (menuConfig.alarmRangeStatusId === 'ABNORMAL'
                            ? `${classes.alarmReportError}`
                            : classes.alarmReport)
                    }
                >
                    {alarmStateId === 'ABNORMAL' && (
                        <ul
                            style={
                                menuConfig !== null &&
                                (menuConfig.alarmRangeStatusId === 'ABNORMAL'
                                    ? {
                                          maxHeight: '500px',
                                          overflowY: 'scroll',
                                      }
                                    : { height: 0 })
                            }
                        >
                            {alarmData.result.length !== 0 &&
                            menuConfig.alarmRangeStatusId === 'ABNORMAL'
                                ? alarmData.result.map((list, idx) => (
                                      <li key={idx}>
                                          <p>{list.date}</p>
                                          <span>
                                              {list.type === 'temperature' &&
                                                  `${t('온도 알람')} (${list.value}℃)`}
                                          </span>
                                      </li>
                                  ))
                                : ''}
                        </ul>
                    )}
                </Panel>
                <Panel
                    key="3"
                    header={
                        i18n.language === 'ko'
                            ? `${t('배송 내역 (총')} ${
                                  transportTime === null
                                      ? '-시간 -분)'
                                      : (transportTime.months === 0
                                            ? ''
                                            : `${transportTime.months}개월 `) +
                                        (transportTime.days === 0
                                            ? ''
                                            : `${transportTime.days}일 `) +
                                        `${transportTime.hours}시간 ` +
                                        `${transportTime.minutes}분)`
                              }`
                            : i18n.language === 'en'
                            ? `Shipment information ( ${
                                  transportTime === null
                                      ? '-m, -h in total)'
                                      : `${transportTime.minutes}m ` +
                                        `${transportTime.hours}h ` +
                                        (transportTime.days === 0 ? '' : `${transportTime.day}d `) +
                                        (transportTime.months === 0
                                            ? ''
                                            : `${transportTime.months}M `) +
                                        'in total)'
                              }`
                            : ''
                    }
                >
                    <DeliveryInformation
                        // alarmStatusId={`${alarmStateId}`}
                        // certificateStatusId={'NOT_YET'}
                        // transportStatusId={'PROGRESS'}
                        uuid={uuid}
                        transportHistory={transportHistory}
                    />
                    {/* trans */}
                </Panel>
                <Panel key="4" header={t('지도 보기')} className={classes.mapReport}>
                    <div>
                        <MapViewer
                            // markers={[
                            //     {
                            //         placeName: 'A 구역',
                            //         locationType: 'departure',
                            //         latitude: 37.5053027,
                            //         longitude: 127.0470025,
                            //     },
                            // ]}
                            transportMarkers={locationInMap.result}
                        />
                    </div>
                </Panel>
            </Collapse>
        </>
    );
}
// function deliveryHistoryTime() {}
