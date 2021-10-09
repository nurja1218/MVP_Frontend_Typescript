import { selector } from 'recoil';
import {
    accessTokenState,
    clientTypeState,
    currentMenuState,
    needRefetchState,
    notificationState,
    refreshTokenState,
    userState,
} from './atoms';
import HEADER_MENUS from '@/configs/header.menu';
import T from '@/view/components/T';
import { message } from 'antd';
import moment from 'moment';
import uniqueBy from '../tools/mapper/array.unique';

export const loginHandler = selector({
    key: 'app/loginHandler',
    /**
     * canAccess
     * check: client has both of accessToken and refreshToken
     */
    get: ({ get }) => {
        const accessToken = get(accessTokenState);
        const refreshToken = get(refreshTokenState);
        if (accessToken && refreshToken) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * setClient
     * use after login or refresh token
     */
    set: ({ set }, data) => {
        if (!data) return;
        const { roleId, accessToken } = data;
        const [clientType] = roleId.split('_');
        set(accessTokenState, accessToken);
        set(userState, data);
        set(clientTypeState, clientType.toLowerCase());
    },
});

export const logoutHandler = selector({
    key: 'app/logoutHandler',
    set: ({ set }) => {
        set(accessTokenState, null);
        set(refreshTokenState, null);
        set(userState, {
            name: null,
            email: null,
            phone: null,
            profilePic: null,
            roleName: null,
            companyName: null,
        });
        set(clientTypeState, 'guest');
    },
});

export const currentMenuKey = selector({
    key: 'app/currentMenuKey',
    get: ({ get }) => {
        const currentMenu = get(currentMenuState);
        for (const key in HEADER_MENUS) {
            const value = HEADER_MENUS[key];
            if (currentMenu[0] === value.name) {
                if (value.submenu) {
                    for (const subKey in value.submenu) {
                        const subValue = value.submenu[subKey];
                        if (currentMenu[1] === subValue.name) {
                            return {
                                subOpen: value.link,
                                key: value.submenu[subKey].link,
                            };
                        }
                    }
                } else {
                    return {
                        key: value.link,
                    };
                }
            }
        }
    },
});

export const notificationHandler = selector({
    key: 'app/notificationHandler',
    set: ({ set, get }, newAlarm) => {
        const prevAlarms = get(notificationState);
        set(notificationState, filterDailyAlarms([...prevAlarms, newAlarm]));
        set(needRefetchState, true);
        message.info(<T>새로운 알람이 발생했습니다.</T>);
    },
});

export const notificationFilter = selector({
    key: 'app/notificationFilter',
    set: ({ set, get }) => {
        const alarms = get(notificationState);
        set(notificationState, filterDailyAlarms(alarms));
    },
});

function filterDailyAlarms(alarms) {
    const today = moment().local().format('YYYYMMDD');
    const uniqueByUUID = uniqueBy('uuid');
    return uniqueByUUID(alarms).filter(
        (alarm) => moment(alarm.date).local().format('YYYYMMDD') === today,
    );
}
