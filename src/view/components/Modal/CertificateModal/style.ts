import { makeStyles } from '@material-ui/core';
import { colors } from '../../../../configs/variables';

export const useStyles = makeStyles((theme) => ({
    gridAlign: {
        textAlign: 'right'
    },
    tableStyle: {
        '& table': {
            fontFamily:
                "'Nanum Myeongjo', -apple-system, 'Noto Sans KR', BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
            fontSize: '1vw',
            width: '100%',
            borderCollapse: 'collapse',
            border: `1px solid ${colors.CG400}`,
            borderBottom: 'none',
            '&:nth-last-of-type(1)': {
                borderBottom: `0.5px solid ${colors.CG400}`,
            },
        },
        '& th': {
            width: '15%',
            padding: '0.3vw .4vw 0.3vw 1.5vw',
            border: `0.5px solid ${colors.CG400}`,
            borderBottom: 'none',
            borderLeft: 'none',
        },
        '& tr': {
            border: `0.5px solid ${colors.CG400}`,
            borderBottom: 'none',
        },
        '& td': {
            padding: '0.3vw .4vw 0.3vw 1.5vw',
            border: `0.5px solid ${colors.CG400}`,
            borderBottom: 'none',
            borderLeft: 'none',
        },
    },
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
        fontSize: '.5vw',
    },
    header: {
        position: 'sticky',
        top: 0,
        padding: '2vw 3vw',
        borderBottom: `1px solid ${colors.BORDER_GREY}`,
        lineHeight: 1,
        '&.setting': {
            background: colors.CG900,
            '& span': {
                color: colors.WHITE,
            },
        },
        '& span': {
            fontSize: '1vw',
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
            maxWidth: 'none !important',
        },
        '& .MuiPaper-root': {
            overflow: 'hidden',
        },
    },
    certificateWrap: {
        fontSize: '1vw',
        letterSpacing: 1,
        padding: '5vw',
        wordBreak: 'keep-all',
        fontFamily:
            "'Nanum Myeongjo', -apple-system, 'Noto Sans KR', BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
        '& > span': {
            float: 'right',
            marginRight: '1.5vw',
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
            padding: '1vw .8vw 1vw 1vw',
            border: `0.5px solid ${colors.CG400}`,
            borderBottom: 'none',
            borderLeft: 'none',
        },
    },
    tableTitle: {
        margin: '0vw 0 4vw',
        fontSize: '1.5vw',
        fontWeight: 700,
        textAlign: 'center',
    },
    user: {
        width: '1.5vw',
        padding: '1vw 0.4vw !important',
        '& p': {
            margin: '0 auto',
        },
    },
    cellName: {
        width: '6vw',
    },
    cellContent: {
        width: '11vw',
        '& span': {
            display: 'inline-block',
            marginRight: 15,
            fontWeight: 700,
        },
    },
    footer: {
        margin: '2vw 0',
        lineHeight: 1.75,
        letterSpacing: 1.3,
    },
    issueDate: {
        margin: '3vw 0',
        textAlign: 'center',
        letterSpacing: 2,
    },
    signatureWrap: {
        margin: '.6vw 0',
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
            width: '6vw',
        },
    },
    recordWrapper: {
        padding: '7% 10% 0',
        userSelect: 'none',
    },
}));
