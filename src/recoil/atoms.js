import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

/**
 * Client Type State
 * root: sight of Willog
 * company: sight of Company
 * guest: not logined
 */
export const clientTypeState = atom({
    key: 'app/clientTypeState',
    default: 'guest',
    //effects_UNSTABLE: [persistAtom],
});

export const accessTokenState = atom({
    key: 'app/accessTokenState',
    default: null,
    effects_UNSTABLE: [persistAtom],
});

export const refreshTokenState = atom({
    key: 'app/refreshTokenState',
    default: null,
    effects_UNSTABLE: [persistAtom],
});

export const userState = atom({
    key: 'app/userState',
    default: {
        name: null,
        email: null,
        phone: null,
        profilePic: null,
        roleId: null,
        roleName: null,
        companyName: null,
    },
});

export const langState = atom({
    key: 'app/langState',
    default: null,
    effects_UNSTABLE: [persistAtom],
});

export const notificationState = atom({
    key: 'app/notificationState',
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const needRefetchState = atom({
    key: 'app/needRefetch',
    default: false,
});

export const mobileDrawerState = atom({
    key: 'app/mobileDrawerState',
    default: false,
});

export const currentMenuState = atom({
    key: 'app/currentMenuState',
    default: [],
});

export const isNeedReloadByLangState = atom({
    key: 'app/isNeedReloadByLangState',
    default: false,
});

export const productModalState = atom({
    key: 'product/modalState',
    default: {
        open: false,
        type: 'add',
    },
});

export const accountModalState = atom({
    key: 'account/accountmodalState',
    default: {
        open: false,
        type: 'add',
    },
});

export const settingModalState = atom({
    key: 'app/settingmodalState',
    default: {
        open: false,
        type: 'add',
    },
});

export const certificateState = atom({
    key: 'app/certificateState',
    default: {
        open: false,
        uuid: null,
    },
});

export const certificatesState = atom({
    key: 'app/certificatesState',
    default: {
        open: false,
        uuids: [],
    },
});

export const controlSearchState = atom({
    key: 'control/searchState',
    default: {
        active: false,
        text: '',
        types: [''],
    },
});
