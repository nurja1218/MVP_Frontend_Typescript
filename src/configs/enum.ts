export const CERTIFICATE_STATUS: any = {
    ISSUED: '정상발급',
    NOT_YET: '미발급',
    NON_ISSUED: '발급불가',
};

// transportStatusId: String # DEPARTURE / PROGRESS / ARRIVE
export const TRANSPORT_STATUS: any = {
    DEPART: '출발',
    INSPECT: '검수',
    ARRIVE: '도착',
};

// device Detail의 체크박스 = input의 값을 정의하는 emum
export const DEVICE_STATUS: any = {
    UNUSED: '미사용',
    PROGRESS: '배송중',
    ARRIVE: '도착완료',
};

// alarmRangeStatusId: String # NORMAL / ABNORMAL / NONE - 일단 NORMAL
export const ALARM_STATUS: any = {
    NORMAL: '정상',
    ABNORMAL: '비정상',
    NONE: '-',
};

export const ACCOUNT_ROLES: any = {
    COMPANY_ADMIN_M: '관리자M',
    COMPANY_ADMIN: '관리자',
    COMPANY_USER: '이용자',
};

// certificateStatusId: String # ISSUED / NOT_YET / NON_ISSUED - 일단 ISSUED
export const DELIVERY_STATUS: any = {
    NORMAL: 'NORMAL', // 정상
    ABNORMAL: 'ABNORMAL', // 비정상
    ARRIVE: 'ARRIVE', // 배송중
};

export const MEASURE_TYPES: any = {
    temperature: '온도',
    humidity: '습도',
    // shock: '충격',
};

export const ARRIVE_PLACES: any = {
    DEPART: '출발지',
    INSPECT: '검수지',
    ARRIVE: '도착지',
};
