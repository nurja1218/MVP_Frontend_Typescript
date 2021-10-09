import { makeStyles } from '@material-ui/core/styles';
import { colors, foundations } from '@/configs/variables';

export const useStyles = makeStyles((theme) => ({
    langDropButton: {
        display: 'flex',
        alignItems: 'center',
        width: 80,
        color: '#aaa',
        '&:hover': {
            color: colors.GREY,
        },
    },
    currentLang: {
        marginLeft: 8,
        marginRight: 4,
        textTransform: 'uppercase',
        fontWeight: 700,
        color: colors.CG700,
    },
    langMenu: {
        width: 168,
        marginTop: 10,
        padding: '8px 0',
        border: `1px solid ${colors.BORDER_GREY}`,
        borderRadius: 5,
        filter: foundations.elevation1,
        backgroundColor: 'white',
        '& .ant-menu-item': {
            display: 'flex',
            alignItems: 'center',
            margin: '0 !important',
            '&:hover': {
                background: colors.CG100,
                fontWeight: 700,
                color: colors.CG900,
            },
        },
        '& .ant-menu-item-active': {
            color: colors.CG900,
        },
        '& .ant-menu-item-selected': {
            background: `${colors.WHITE} !important`,
            color: colors.CG900,
            '&:hover': {
                background: colors.CG100,
            },
        },
    },
    langList: {
        display: 'flex',
        alignItems: 'center',
        lineHeight: 1,
        '& div': {
            width: 20,
            height: 20,
            marginRight: 8,
            borderRadius: 10,
            border: `2px solid ${colors.CG700}`,
        },
    },
    langSelect: {
        display: 'flex',
        alignItems: 'center',
        fontWeight: 700,
        lineHeight: 1,
        '& div': {
            position: 'relative',
            width: 20,
            height: 20,
            marginRight: 8,
            borderRadius: 10,
            border: `2px solid ${colors.CG900}`,
        },
        '& span': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 10,
            height: 10,
            transform: 'translate(-50%,-50%)',
            borderRadius: 5,
            background: colors.CG900,
        },
    },
}));
