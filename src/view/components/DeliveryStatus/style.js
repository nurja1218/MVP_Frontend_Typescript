import { makeStyles } from '@material-ui/core';
import { colors } from '../../../configs/variables';

export const useStyles = makeStyles((theme) => ({
    deliveryStatus: {
        maxWidth: 500,
        // dot
        '& .ant-steps-icon-dot': {
            left: '-2px !important',
            width: '12px !important',
            height: '12px !important',
            marginTop: -2,
        },
        '& .ant-steps-item-finish .ant-steps-item-tail::after, & .ant-steps-item-finish .ant-steps-item-icon .ant-steps-icon-dot':
            {
                background: colors.SECONDARY,
            },
        '& .ant-steps-item-process .ant-steps-icon .ant-steps-icon-dot': {
            background: colors.WHITE,
            border: `3px solid ${colors.SECONDARY}`,
        },
        // tail
        '& .ant-steps-item-wait .ant-steps-icon .ant-steps-icon-dot,& .ant-steps-item-process .ant-steps-item-tail::after':
            {
                background: colors.BORDER_GREY,
            },
        '& .ant-steps-item-tail, & .ant-steps-item-icon': {
            marginLeft: 0,
        },
        '& .ant-steps-item-tail::after': {
            width: '101%',
            height: '4px !important',
            marginLeft: 0,
        },
        // title , content
        '& .ant-steps-item-title': {
            fontSize: 12,
            fontWeight: 700,
        },
        '& .ant-steps-item-finish .ant-steps-item-content .ant-steps-item-title,& .ant-steps-item-wait .ant-steps-item-title':
            {
                color: colors.CG400,
            },
        '& .ant-steps-item:nth-last-of-type(1)': {
            width: 100,
        },
        '& .ant-steps-item-process .ant-steps-item-title': {
            padding: '0 6px',
            borderRadius: '100px',
            background: colors.SECONDARY,
            color: `${colors.WHITE} !important`,
        },
        '& .ant-steps-item-process .ant-steps-item-icon': {
            top: 0,
        },
        '& .ant-steps-item-content': {
            textAlign: 'left',
        },
        '& .ant-steps-item-process .ant-steps-item-content': {
            marginTop: 6,
        },
        '& .ant-steps-item-description': {
            textAlign: 'left',
            fontSize: 12,
            fontWeight: 700,
            color: `${colors.CG400} !important`,
        },
        // TRANSPORT_STATUS_INFO = ARRIVE
        '& .ant-steps-item:nth-of-type(2).ant-steps-item-finish': {
            '& .ant-steps-icon-dot, & .ant-steps-item-title': {
                display: 'none',
                // background: 'transparent !important',
                // color: 'transparent !important',
            },
        },
    },
    ABNORMAL: {
        '& .ant-steps-item-finish .ant-steps-icon-dot,& .ant-steps-item-finish .ant-steps-item-tail::after, & .ant-steps-item-process .ant-steps-item-title':
            {
                background: `${colors.ERROR} !important`,
            },
        '& .ant-steps-item-process .ant-steps-icon .ant-steps-icon-dot': {
            border: `3px solid ${colors.ERROR}`,
        },
    },
}));
