import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../../configs/variables';

const HEADER_PADDING_LEFT = '32px';

export const useStyles = makeStyles((theme) => ({
    sideDrawerWrapper: {
        color: 'white',
        width: 'auto',
        height: '100%',
        paddingTop: 24,
        background: colors.CG900,
        '& .ant-menu-vertical > .ant-menu-item': {
            display: 'flex',
            alignItems: 'center',
            marginTop: '0px !important',
            height: 56,
        },
    },
    logoWrapper: {
        paddingTop: '24px',
        paddingLeft: HEADER_PADDING_LEFT,
        paddingBottom: '30px',
    },
    langWrapper: {
        marginLeft: 10,
    },
    menuList: {
        marginBottom: 44,
        marginRight: '0px !important',
        '& ul': {
            marginRight: '0px !important',
        },
        backgroundColor: 'inherit !important',
        '& img.large': {
            paddingLeft: 0,
        },
        '& img.small': {
            marginLeft: -5,
        },
        '& li': {
            marginBottom: '0px !important',
            padding: '0 28px !important',
        },
        '& .ant-menu-vertical > .ant-menu-item': {
            display: 'flex',
            alignItems: 'center',
            marginTop: '0px !important',
            height: 56,
        },
    },
    menuLogo: {
        '& li': {
            padding: '0 10px 0 24px !important',
        },
        '& .ant-menu-vertical img': {
            display: 'none',
        },
        '& .ant-menu-inline-collapsed': {
            display: 'none !important',
        },
    },
    drawerItem: {
        width: '100%',
        minWidth: 75,
        paddingLeft: `${HEADER_PADDING_LEFT} !important`,
        color: colors.LIGHT_GREY,
        opacity: '50% !important',
        fontSize: '14px',
        '&:hover': {
            backgroundColor: `#2d2e31 !important`,
            opacity: '100% !important',
        },
        '&.ant-menu-item-selected': {
            backgroundColor: `${colors.SECONDARY} !important`,
            fontWeight: '500 !important',
            opacity: '100% !important',
        },
    },
    drawerLogo: {
        opacity: '100%',
        paddingLeft: '28px !important',
        fontSize: '14px',
        // 툴팁 안나오게!
    },
    drawerIcon: {
        opacity: '50%',
    },
    drawerText: {
        color: colors.LIGHT_GREY,
        opacity: '50% !important',
        fontSize: '14px',
    },
}));
