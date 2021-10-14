import { makeStyles } from '@material-ui/core';
import { colors } from '../../../configs/variables';

export const useStyles = makeStyles((theme) => ({
    ulStyle1: {
        maxHeight: '500px',
        overflowY: 'scroll',
    },
    ulStyle2: {
        height: 0
    },
    informationTable: {
        '&.ant-collapse': {
            background: 'none',
            border: 'none',
            '& .ant-collapse-arrow': {
                display: 'none !important',
            },
        },
        '& .ant-collapse-item': {
            marginBottom: 16,
            background: colors.WHITE,
            border: `1px solid ${colors.BORDER_GREY}`,
            borderRadius: '4px !important',
        },
        '& .ant-collapse-header': {
            position: 'relative',
            padding: '16px 20px !important',
            fontSize: 14,
            fontWeight: 700,
            lineHeight: '100% !important',
            '&::after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                right: 10,
                width: 24,
                height: 24,
                transform: 'translateY(-50%)',
                background: 'url("/assets/common/keyboard_arrow_down.svg")',
            },
        },
        '& .ant-collapse-header[aria-expanded="true"]': {
            '&::after': {
                transform: 'rotate(180deg) translateY(50%)',
            },
        },
        '& .ant-collapse-content': {
            borderBottomLeftRadius: 4,
            borderBottomRightRadius: 4,
        },
        '& .ant-collapse-content-box': {
            '& ul': {
                padding: 0,
                margin: 0,
            },
        },
    },
    infoReport: {
        '& .ant-collapse-content-box': {
            padding: 0,
        },
        '& li': {
            display: 'flex',
            alignItems: 'center',
            clear: 'both',
            padding: '10px 20px',
            borderBottom: `1px solid ${colors.BORDER_GREY}`,
            '& p': {
                display: 'inline-block',
                width: 120,
                margin: 0,
                paddingRight: 20,
            },
            '& span': {
                display: 'inline-block',
                wordBreak: 'break-all',
                width: 'calc(100% - 120px)',
            },
        },
        '& li:nth-last-of-type(1)': {
            border: 'none',
        },
    },
    alarmReport: {
        '& .ant-collapse-header': {
            display: 'flex',
            alignItems: 'center',
            padding: '0px !important',
            '& .alarm': {
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '11px 12px',
                borderRadius: 3,
                cursor: 'not-allowed',
            },
            '& .error': {
                background: colors.ERROR,
                color: colors.WHITE,
                cursor: 'pointer',
            },
            '&::after': {
                background: 'url(/assets/common/keyboard_arrow_down_disabled.png)',
                backgroundSize: 'contain',
            },
        },
        '& img': {
            marginRight: 2,
        },
        '& .ant-collapse-content-box': {
            padding: 0,
            '& li': {
                padding: '10px 20px',
                borderBottom: `1px solid ${colors.BORDER_GREY}`,
                fontSize: 14,
                lineHeight: 1.45,
                color: colors.CG900,
            },
            '& li:nth-last-of-type(1)': {
                borderBottom: 'none',
            },
            '& p': {
                float: 'left',
                width: '40%',
                marginBottom: 0,
            },
            '& span': {
                width: '60%',
            },
        },
        '& .ant-collapse-content': {
            borderTop: 'none',
        },
    },
    alarmReportError: {
        '& .ant-collapse-header': {
            display: 'flex',
            alignItems: 'center',
            padding: '0px !important',
            '& .alarm': {
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '11px 12px',
                borderRadius: 4,
                cursor: 'not-allowed',
            },
            '& .error': {
                background: colors.ERROR,
                color: colors.WHITE,
                cursor: 'pointer',
            },
            '&::after': {
                background: 'url("/assets/common/keyboard_arrow_down_white.svg")',
            },
        },
        '& img': {
            marginRight: 2,
        },
        '& .ant-collapse-content-box': {
            padding: 0,
            '& li': {
                padding: '10px 20px',
                borderBottom: `1px solid ${colors.BORDER_GREY}`,
                fontSize: 14,
                lineHeight: 1.45,
                color: colors.CG900,
            },
            '& li:nth-last-of-type(1)': {
                borderBottom: 'none',
            },
            '& p': {
                float: 'left',
                width: '40%',
                marginBottom: 0,
            },
            '& span': {
                width: '60%',
            },
        },
    },
    mapReport: {
        '& .ant-collapse-content-box': {
            height: 515,
            padding: 0,
            overflow: 'hidden',
            '& iframe': {
                height: '515px',
            },
        },
    },
}));
