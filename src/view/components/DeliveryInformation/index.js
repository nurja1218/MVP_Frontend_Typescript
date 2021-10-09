import { Steps } from 'antd';
import moment from 'moment';
import CertificateCard from '../CertificateCard';
import { GOOGLE_MAPS_KEY } from '../../../configs/variables';
import { useStyles } from './style';
import Geocode from 'react-geocode';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { certificateState } from '../../../recoil/atoms';
import CertificateModal from '../Modal/CertificateModal';
import { useTranslation } from 'react-i18next';

const { Step } = Steps;

const customDot = (dot, { status, index }) => <>{dot}</>;

const DELIVERY_STATUS_INFO = {
    ARRIVE: 3,
    INSPECT: 1,
    DEPART: 1,
};

const extractAddress = (lat, lng) => {
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

// transportStatusId, alarmRangeStatusId, certifiacateStatusId
export default function DeliveryInformation({ uuid, transportHistory }) {
    const {
        alarmRangeStatusId,
        certificateStatusId,
        transportStatusId,
        departurePlaceName,
        departureLocation,
        departureTime,
        arrivalLocation,
        arrivalTime,
    } = transportHistory;

    const { t, i18n } = useTranslation();

    const [locationName, setLocationName] = useState({
        departureName: null,
        arrivalName: null,
    });

    const classes = useStyles();
    const current = DELIVERY_STATUS_INFO[`${transportStatusId}`];

    // Geocode세팅
    Geocode.setApiKey(GOOGLE_MAPS_KEY);
    Geocode.setLanguage(i18n.language === 'ko' ? 'ko' : 'en');

    useEffect(() => {
        if (departureLocation !== null) {
            const getPlaceName = async () => {
                const departName = await extractAddress(
                    departureLocation.split('/')[0],
                    departureLocation.split('/')[1],
                );
                const arriveName =
                    arrivalLocation === null
                        ? null
                        : await extractAddress(
                              arrivalLocation.split('/')[0],
                              arrivalLocation.split('/')[1],
                          );
                setLocationName({
                    departureName: departName,
                    arrivalName: arriveName,
                });
            };
            getPlaceName();
        }
    }, [departureLocation, arrivalLocation]);

    function CertificateComponent({ uuid }) {
        const setModal = useSetRecoilState(certificateState);
        const onClick = () => {
            if (certificateStatusId === 'ISSUED') {
                setModal({
                    open: true,
                    uuid,
                });
            }
        };
        switch (certificateStatusId) {
            case 'ISSUED':
                return <CertificateCard onClick={onClick} alarmStatusId={`NORMAL_ARRIVE`} />;
            case 'NOT_YET':
                return <CertificateCard onClick={onClick} alarmStatusId={`NORMAL_PROGRESS`} />;
            case 'NON_ISSUED':
                // 발급불가
                return <CertificateCard onClick={onClick} alarmStatusId={`ABNORMAL`} />;
            case null:
                return <CertificateCard onClick={onClick} alarmStatusId={`NORMAL_PROGRESS`} />;
            default:
                return;
        }
    }

    return (
        <>
            <CertificateModal />
            <div className={`${classes.deliveryInformation} ${classes[alarmRangeStatusId]}`}>
                <Steps direction="vertical" current={current} progressDot={customDot}>
                    <Step
                        title={t('출고지')}
                        description={departurePlaceName === null ? '-' : t(departurePlaceName)}
                        className={classes.departure}
                    />
                    <Step
                        title={t('출발')}
                        subTitle={
                            departureTime === null
                                ? ''
                                : moment
                                      .unix(departureTime / 1000)
                                      .local()
                                      .format(
                                          `${
                                              i18n.language && i18n.language === 'ko'
                                                  ? 'YYYY/MM/DD HH:mm'
                                                  : 'DD/MM/YYYY HH:mm'
                                          }`,
                                      )
                        }
                        description={
                            locationName.departureName === null ? '' : locationName.departureName
                        }
                    />
                    <Step
                        title={t('도착')}
                        subTitle={
                            arrivalTime === null
                                ? ''
                                : moment
                                      .unix(arrivalTime / 1000)
                                      .local()
                                      .format(
                                          `${
                                              i18n.language && i18n.language === 'ko'
                                                  ? 'YYYY/MM/DD HH:mm'
                                                  : 'DD/MM/YYYY HH:mm'
                                          }`,
                                      )
                        }
                        description={
                            locationName.arrivalName === null ? '' : locationName.arrivalName
                        }
                    />
                    <Step
                        title={
                            alarmRangeStatusId === 'ABNORMAL' ? (
                                <CertificateCard alarmStatusId="ABNORMAL" />
                            ) : (
                                <CertificateComponent uuid={uuid} />
                            )
                        }
                    ></Step>
                    <Step style={{ display: 'none' }}></Step>
                </Steps>
            </div>
        </>
    );
}
