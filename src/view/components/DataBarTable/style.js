import { makeStyles } from '@material-ui/core';
import { colors } from '../../../configs/variables';

export const useStyles = makeStyles((theme) => ({
    deviceBarTable: {
        display: 'block',
        overflow: 'hidden',
        minHeight: 112,
        height: 'max-content',
        marginBottom: 20,
        background: colors.WHITE,
        border: `1px solid ${colors.BORDER_GREY}`,
        borderRadius: 4,
    },
    deviceDataList: {
        float: 'left',
        display: 'flex',
        width: '45%',
        padding: 0,
        '& li': {
            position: 'relative',
            display: 'block',
            width: '25%',
            padding: '12px 10px 10px 20px',
            borderRight: `1px solid ${colors.BORDER_GREY}`,
        },
        '& li:nth-of-type(1)::after': {
            position: 'absolute',
            top: '50%',
            right: -14,
            transform: 'translateY(-50%)',
            content: '""',
            width: 28,
            height: 28,
            background: 'url(/assets/common/equal.svg)', // 배경 흰색 추가된 아이콘으로 바꾸기
        },
        '& li:nth-of-type(2)::after,& li:nth-of-type(3)::after': {
            position: 'absolute',
            top: '50%',
            right: -14,
            transform: 'translateY(-50%)',
            content: '""',
            width: 28,
            height: 28,
            background: 'url(/assets/common/plus2.svg)', // 배경 흰색 추가된 아이콘으로 바꾸기
        },
        '& div': {
            width: 40,
            height: 8,
            margin: '9px 0 0',
            marginBottom: 12,
        },
        '& p': {
            marginBottom: 4,
            fontSize: 14,
            fontWeight: 700,
            color: colors.CG600,
        },
        '& span': {
            fontSize: 20,
            fontWeight: 700,
            color: colors.CG800,
        },
    },
    deviceBarChart: {
        float: 'right',
        width: '55%',
        '& canvas': {
            width: '100%',
            height: '40px !important',
            marginTop: 40,
            padding: '0 45px',
        },
        '& .g2-tooltip': {
            padding: '0 !important',
            border: `1px solid ${colors.BORDER_GREY}`,
            borderRadius: '5px !important',
            backdropFilter: 'blur(4px)',
        },
        '& .g2-tooltip-title': {
            margin: '0 !important',
            padding: '13px 16px',
            borderBottom: `1px solid ${colors.BORDER_GREY}`,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            background: colors.CG100,
            fontSize: 14,
            fontWeight: 700,
            lineHeight: 1,
            color: colors.CG900,
        },
        '& .g2-tooltip-list-item': {
            margin: '0 !important',
            padding: '13px 16px !important',
            borderBottom: `1px solid ${colors.BORDER_GREY}`,
            fontSize: 14,
            lineHeight: 1,
            color: colors.CG800,
            '&:nth-last-of-type(1)': {
                borderBottom: 'none',
            },
        },

        '& .g2-tooltip-marker': {
            width: '10px !important',
            height: '10px !important',
        },
        '& .g2-tooltip-name': {
            marginRight: 4,
        },
        '& .g2-tooltip-value': {
            float: 'inherit !important',
            marginLeft: '6px !important',
            fontSize: 14,
            fontWeight: 700,
        },
    },
}));
