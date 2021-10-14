import { makeStyles } from '@material-ui/core';
import { colors, foundations } from '../../../configs/variables';

export const useStyles = makeStyles((theme) => ({
    wrapper: {
        // padding: 24,
    },
    productProgressCard: {
        position: 'relative',
        width: 304,
        height: 402,
        background: colors.WHITE,
        border: `1px solid ${colors.BORDER_GREY}`,
        borderRadius: 5,
        '& h2': {
            margin: 0,
            padding: 20,
            borderBottom: `1px solid ${colors.BORDER_GREY}`,
            fontSize: 16,
            fontWeight: 700,
            color: colors.CG800,
        },
        '& .ant-tooltip': {
            // marginLeft: -115,
        },
        '&:hover': {
            filter: foundations.elevation1,
        },
    },
    productAddCard: {
        width: 304,
        height: 402,
        padding: 40,
        background: colors.WHITE,
        border: `1px solid ${colors.BORDER_GREY}`,
        borderRadius: 5,
        '& h2': {
            marginTop: 16,
            fontSize: 32,
            fontWeight: 700,
            lineHeight: 1.25,
            color: colors.CG400,
        },
        '&:hover': {
            filter: foundations.elevation1,
        },
    },
    productProgress: {
        // display: 'flex',
        textAlign: 'center',
        position: 'relative',
        justifyContent: 'center',
        padding: 30,
        '&>span': {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            zIndex: 2,
            background: colors.WHITE, //일단 수정 - 오타
            textAlign: 'center',
            fontSize: 32,
            fontWeight: 700,
            lineHeight: 1,
        },
        '& p': {
            marginBottom: 6,
            fontSize: 16,
            fontWeight: 700,
            lineHeight: 1,
            color: '#68686C',
        },
        '& .g2-html-annotation': {
            display: 'none !important',
        },
    },
    productContent: {
        '& div': {
            padding: 20,
            borderTop: `1px solid ${colors.BORDER_GREY}`,
            '&:nth-of-type(1)': {
                borderRight: `1px solid ${colors.BORDER_GREY}`,
            },
        },
        '& p': {
            marginBottom: 4,
            fontSize: 14,
            fontWeight: 700,
            color: '#68686C',
        },
        '& span': {
            fontSize: 20,
            fontWeight: 700,
            color: colors.CG800, //일단 수정 - 오타
        },
    },
    graphTooltip: {
        position: 'absolute',
        // top: 20,
        // left: 20,
        zIndex: 3,
        minWidth: 170,
        marginLeft: -115,
        textAlign: 'left',
        border: `1px solid ${colors.BORDER_GREY}`,
        borderRadius: 5,
        filter: 'drop-shadow(0px 8px 20px rgba(0, 0, 0, 0.2))',
        background: colors.WHITE,
    },
    tooltipTitle: {
        display: 'inline-block',
        width: '100%',
        padding: '13px 16px',
        background: colors.CG100,
        borderBottom: `1px solid ${colors.BORDER_GREY}`,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        fontSize: 14,
        fontWeight: 700,
        lineHeight: 1,
        color: colors.CG900,
    },
    tooltipContent: {
        '& div': {
            marginBottom: 0,
            padding: '13px 16px',
            fontSize: 14,
            fontWeight: 500,
            lineHeight: 1,
            color: colors.CG800,
            '&+&': {
                // borderBottom: `1px solid ${colors._BORDER_GREY}`, //일단 수정 - 오타
                borderBottom: `1px solid ${colors.BORDER_GREY}`,
            },
            '& div': {
                float: 'left',
                width: 10,
                height: 10,
                margin: 2,
                padding: 0,
                marginRight: 6,
                borderRadius: 10,
                background: colors.CG200,
            },
        },
        '& span': {
            fontSize: 14,
            fontWeight: 700,
            lineHeight: 1,
        },
        '& ul': {
            position: 'relative',
            marginTop: 7,
            marginLeft: 26,
            '&::after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: -10,
                transform: 'translateY(-50%)',
                width: 8,
                height: 30,
                background: 'url(/assets/common/Vector-1.png) no-repeat',
                backgroundSize: 'contain',
            },
        },
        '& li': {
            padding: '6px 0',
            clear: 'both',
            fontSize: 14,
            fontWeight: 500,
            lineHeight: 1,
            '& span': {
                marginLeft: 6,
            },
        },
    },
}));
