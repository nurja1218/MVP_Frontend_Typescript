import { makeStyles } from '@material-ui/core';
import { colors } from '@/configs/variables';

export const useStyles = makeStyles((theme) => ({
    iconButton: {
        cursor: 'pointer',
        fill: colors.CG500,
        '&:hover': {
            fill: colors.GREY,
        },
    },
    wrapper: {
        position: 'relative',
        padding: '0px !important',
        fontSize: 14,
    },
    header: {
        position: 'sticky',
        top: 0,
        padding: '25px 40px',
        borderBottom: `1px solid ${colors.BORDER_GREY}`,
        lineHeight: 1,
        '&.setting': {
            background: colors.CG900,
            '& span': {
                color: colors.WHITE,
            },
        },
        '& span': {
            fontSize: 18,
            fontWeight: 700,
        },
    },
    certificateModal: {
        '& .MuiGrid-item': {
            '&+&': {
                border: `1px solid ${colors.BORDER_GREY}`,
            },
        },
        '& .MuiDialog-paperWidthMd': {
            maxWidth: '1200px !important',
        },
        '& .MuiPaper-root': {
            overflow: 'hidden',
        },
    },
    certificateWrap: {
        fontSize: 18,
        letterSpacing: 1,
        padding: 80,
        wordBreak: 'keep-all',
        fontFamily:
            "'Nanum Myeongjo', -apple-system, 'Noto Sans KR', BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
        '& > span': {
            float: 'right',
            marginRight: 20,
        },
        cursor: 'default',
        userSelect: 'none',
    },
    tableWrap: {
        '& table': {
            width: '100%',
            borderCollapse: 'collapse',
            border: `1px solid ${colors.CG400}`,
            borderBottom: 'none',
            '&:nth-last-of-type(1)': {
                borderBottom: `0.5px solid ${colors.CG400}`,
            },
        },
        '& tr': {
            border: 'none',
            borderBottom: 'none',
        },
        '& td': {
            padding: '15px 12px 15px 15px',
            border: `0.5px solid ${colors.CG400}`,
            borderBottom: 'none',
            borderLeft: 'none',
        },
    },
    tableTitle: {
        margin: '50px 0 100px',
        fontSize: 30,
        fontWeight: 700,
        textAlign: 'center',
    },
    user: {
        width: 20,
        padding: '7px 3px !important',
        '& p': {
            margin: '0 auto',
        },
    },
    cellName: {
        width: 100,
    },
    cellContent: {
        width: 170,
        '& span': {
            display: 'inline-block',
            marginRight: 15,
            fontWeight: 700,
        },
    },
    footer: {
        margin: '30px 0',
        lineHeight: 1.75,
        letterSpacing: 1.3,
    },
    issueDate: {
        margin: '50px 0',
        textAlign: 'center',
        letterSpacing: 2,
    },
    signatureWrap: {
        margin: '10px 0',
    },
    signatureName: {
        paddingLeft: 20,
        textAlign: 'left',
    },
    signature: {
        position: 'relative',
        '& img': {
            position: 'absolute',
            top: -15,
            right: 0,
            width: 100,
        },
    },
}));
