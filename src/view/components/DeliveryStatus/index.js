import { Steps } from 'antd';
import { useStyles } from './style';
import { useTranslation } from 'react-i18next';

const { Step } = Steps;

const customDot = (dot, { status, index }) => (
    // 툴팁 제거
    // <Popover
    //     content={
    //         <span>
    //             step {index} status: {status}
    //         </span>
    //     }
    // >
    //     {dot}
    // </Popover>
    <>{dot}</>
);

const DELIVERY_STATUS_INFO = {
    ARRIVE: 2,
    // 출발 이후에는 무조건 배송중
    INSPECT: 1,
    DEPART: 1,
};

export default function DeliveryStatus({ transport, alarm, departureTime, arrivalTime }) {
    /**
     * trasnport : 배송 상태
     * alarm : 알람 상태
     * departureTime: 출발 시간
     */
    const status = alarm;

    const { t } = useTranslation();

    const classes = useStyles();
    const current =
        transport === 'DEPART'
            ? DELIVERY_STATUS_INFO.DEPART
            : transport === 'INSPECT'
            ? DELIVERY_STATUS_INFO.INSPECT
            : transport === 'ARRIVE'
            ? DELIVERY_STATUS_INFO.ARRIVE
            : null;
    /**
     * 출발 이후에 바로 배송중으로 업데이트 (출발 === 배송중)
     * 배송중인지 값을 받아와서(transportStatusId)
     * transportStatusId === PROGRESS 이면, 출발 > 배송중 라인 생기고, 배송중 뱃지 나오게
     */

    return (
        <div
            className={
                status === 'ABNORMAL'
                    ? `${classes.deliveryStatus} ${classes.ABNORMAL}`
                    : `${classes.deliveryStatus}`
            }
        >
            <div></div>
            <Steps current={current} progressDot={customDot}>
                <Step title={t('출발')} description={departureTime} />
                <Step title={t('배송중')} />
                <Step title={t('도착')} description={arrivalTime} />
                {/* description="하단 내용(일자)" */}
            </Steps>
        </div>
    );
}
