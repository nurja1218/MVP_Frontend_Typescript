const ICON_SUFFIX = 'icon-24-px-';

const HEADER_MENUS = [
    {
        key: 0,
        name: '관제',
        link: '/control',
        icon: `${ICON_SUFFIX}all.svg`,
    },
    {
        key: 1,
        name: '제품등록',
        link: '/product',
        icon: `${ICON_SUFFIX}product.svg`,
        // submenu: [
        //     {
        //         key: '3-0',
        //         name: '기기 관리',
        //         link: '/device/manage',
        //     },
        //     {
        //         key: '3-1',
        //         name: '회수 관리',
        //         link: '/device/collection',
        //     },
        //     {
        //         key: '3-2',
        //         name: '누락 관리',
        //         link: '/device/omission',
        //     },
        // ],
    },
    {
        key: 2,
        name: '기기관리',
        link: '/device',
        icon: `${ICON_SUFFIX}device.svg`,
    },
    // {
    //     key: 3,
    //     name: '공지사항',
    //     link: '/notice',
    //     icon: `${ICON_SUFFIX}noti.svg`,
    // },
    {
        key: 3,
        name: '사용자관리',
        link: '/account',
        icon: `${ICON_SUFFIX}account.svg`,
    },
];

export const HAS_SUB_MENU = HEADER_MENUS.map((m) => {
    if (m.submenu) {
        return m.link;
    }
    return null;
}).filter((m) => m);

export default HEADER_MENUS;
