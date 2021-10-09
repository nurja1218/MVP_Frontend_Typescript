import { makeStyles } from '@material-ui/core';
import { colors } from '../../../configs/variables';

export const useStyles = makeStyles((theme) => ({
    deliveryInformation: {
        '& .ant-steps-vertical': {
            position: 'relative',
            display: 'flex',
            flexDirection: 'column-reverse',
            flexWrap: 'wrap',
            '& ::after': {
                position: 'absolute',
                width: 2,
                height: '102% !important',
                top: 9,
                left: 1,
                background: colors.BORDER_GREY,
            },
            '& .ant-steps-item:nth-of-type(1) .ant-steps-item-tail': {
                top: 'inherit !important',
                bottom: '50% !important',
            },
            '& .ant-steps-item:nth-of-type(1) .ant-steps-icon-dot': {
                width: 14,
                left: -4,
                borderBottom: `15px solid ${colors.SECONDARY}`,
                borderTop: '9px solid transparent',
                borderLeft: '9px solid transparent',
                borderRight: '9px solid transparent',
                borderRadius: '0',
                background: 'none',
            },
        },
        '& .ant-steps-item-container': {
            position: 'relative',
        },
        '& .ant-steps-item-content': {
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            marginLeft: 30,
            padding: '16px 0',
        },
        '& .ant-steps-item-process .ant-steps-item-content': {
            marginLeft: 4,
        },
        '& .ant-steps-item-title': {
            width: '100%',
            fontSize: 16,
            fontWeight: 700,
        },
        '& .ant-steps-item-description': {
            maxWidth: '300px',
            padding: '0px !important',
        },
        // steps dot, tail css
        '& .ant-steps-item-icon > .ant-steps-icon .ant-steps-icon-dot': {
            background: colors.SECONDARY,
        },
        '& .ant-steps-item-icon': {
            position: 'absolute',
            top: 25,
            // 여기
        },
        '& .ant-steps-item:nth-last-of-type(2) .ant-steps-item-icon': {
            top: '0px !important',
        },
        '& .ant-steps-item:nth-of-type(1),& .ant-steps-item:nth-of-type(2),& .ant-steps-item:nth-of-type(3)':
            {
                '& .ant-steps-item-container': {
                    display: 'flex',
                    alignItems: 'center',
                },
            },
        '& .ant-steps-item-finish .ant-steps-item-tail::after, & .ant-steps-item-process .ant-steps-item-tail::after, & .ant-steps-item-wait .ant-steps-item-tail::after':
            {
                display: 'block',
                width: '2px !important',
                background: colors.BORDER_GREY,
            },
        '& .ant-steps-item-finish .ant-steps-icon-dot, & .ant-steps-item-wait .ant-steps-icon-dot':
            {
                width: 10,
                height: 10,
            },
        '& .ant-steps-item-wait .ant-steps-item-icon > .ant-steps-icon .ant-steps-icon-dot': {
            background: colors.BORDER_GREY,
        },
        '& .ant-steps-item-process .ant-steps-icon-dot': {
            position: 'relative',
            left: '-3px !important',
            width: 16,
            height: 16,
            '&::after': {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                width: '8px !important',
                height: '8px !important',
                background: colors.WHITE,
                borderRadius: 20,
            },
        },
    },
    ABNORMAL: {
        '& .ant-steps-item-finish .ant-steps-icon-dot, & .ant-steps-item-process .ant-steps-icon-dot':
            {
                background: `${colors.ERROR} !important`,
            },
        '& .ant-steps-item-process .ant-steps-icon .ant-steps-icon-dot': {
            border: `3px solid ${colors.ERROR}`,
        },
        '& .ant-steps-item:nth-of-type(1) .ant-steps-icon-dot': {
            borderBottom: `15px solid ${colors.ERROR} !important`,
            background: 'none !important',
        },
    },
    departure: {
        '& .ant-steps-icon-dot::after': {
            display: 'none !important',
        },
        '& .ant-steps-item-process .ant-steps-icon-dot': {
            left: '-4px !important',
        },
    },
}));
