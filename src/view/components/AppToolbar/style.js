import { makeStyles } from '@material-ui/core/styles';
import { colors, foundations } from '../../../configs/variables';

export const useStyles = makeStyles((theme) => ({
    appToolBar: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 16,
    },
    currentMenu: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '16px',
    },
    subMenuText: {
        color: '#acacb6',
        fontWeight: 700,
    },
    lastMenuText: {
        display: 'inline-block',
        maxWidth: 200,
        whiteSpace: 'noWrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        marginLeft: 4,
        color: '#222',
        fontWeight: 700,
    },
    userName: {
        marginRight: 30,
        fontSize: '14px',
        color: '#36373A',
        fontWeight: 700,
    },
    dropdownIcon: {
        marginLeft: 10,
        color: '#9e9e9e',
    },
    userMenuWrapper: {
        marginTop: 10,
        borderRadius: 5,
        // boxShadow: '0 2px 20px 0 rgb(60 106 245 / 10%)',
        filter: foundations.elevation1,
        border: `1px solid ${colors.BORDER_GREY}`,
        background: colors.WHITE,
        color: colors.CG700,
        '& .ant-menu': {
            padding: '8px 0',
            background: 'transparent',
            color: colors.CG700,
        },
        '& .ant-menu-item': {
            margin: '0 !important',
        },
        '& .ant-menu-item-active': {
            background: colors.CG100,
            '& a': {
                fontWeight: 700,
                color: colors.CG700,
            },
            '&:hover': {
                background: colors.CG100,
                '& a': {
                    fontWeight: 700,
                    color: colors.CG700,
                },
            },
        },
        '& .ant-menu .ant-menu-item-selected, & .ant-menu-item-selected a, & .ant-menu-item-selected a:hover':
            {
                background: colors.CG100,

                fontWeight: 700,
                color: colors.CG700,
            },
    },
    backButton: {
        background: 'none',
        border: 'none',
        '& img': {
            width: 8,
            marginTop: -3,
        },
    },
}));
