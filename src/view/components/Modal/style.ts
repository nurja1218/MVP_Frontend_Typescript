import { colors } from '../../../configs/variables';
import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
    spacing: {
        spacing: '6'
    },
    gridAlign: {
        textAlign: 'right'
    },
    iconButton: {
        cursor: 'pointer',
        fill: '#8f9094',
        '&:hover': {
            fill: '#9e9e9e',
        },
    },
    smallIcon: {
        width: 20,
    },
    wrapper: {
        position: 'relative',
        width: 640,
        padding: '0px !important',
        '&.account': {
            padding: '28px 0 68px !important',
        },
        '&.setting': {
            marginTop: -1,
        },

        '& .ant-input, & .ant-select:not(.ant-select-customize-input) .ant-select-selector': {
            height: 40,
            border: `1px solid #B0B1B4`,
            borderRadius: 5,
        },
        '& .ant-input-password': {
            display: 'flex',
            alignItems: 'center',
            height: 40,
            border: `1px solid #B0B1B4`,
            borderRadius: 5,
            '& input': {
                height: '35px',
                background: 'none',
            },
        },
        '& .ant-select-selection-placeholder, & .ant-select-selection-item': {
            marginTop: 3,
        },
        '& .ant-input-number': {
            height: 40,
            border: `1px solid #B0B1B4`,
            borderRadius: 5,
        },
        '& .ant-input-number-input': {
            height: 40,
        },
        '& .ant-input-number-handler-wrap': {
            background: 'transparent',
        },
        '& .ant-form-item': {
            marginBottom: '0px !important',
        },
        '& .ant-tabs-nav': {
            marginTop: 0,
            background: '#16171a',
        },
        '& .ant-tabs-tab': {
            marginLeft: '12px !important',
            background: '#3c3d40 !important',
            fontWeight: 700,
            color: '#b0b1b4',
            borderRadius: '5px 5px 0 0 !important',
            borderTop: 'none !important',
            borderLeft: 'none !important',
            borderRight: 'none !important',
        },
        '& .ant-tabs-tab-active': {
            opacity: 1,
            background: `${colors.WHITE} !important`,
        },
        '& .ant-tabs-nav-wrap': {
            marginLeft: 13,
        },
        '& .ant-tabs-tab-btn': {
            fontSize: 14,
        },
        '& .ant-form-item-explain-error': {
            marginTop: 6,
            lineHeight: 1,
            fontSize: 12,
        },
    },

    header: {
        position: 'sticky',
        top: 0,
        padding: '25px 40px',
        borderBottom: `1px solid ${colors.BORDER_GREY}`,
        lineHeight: 1,
        '&.setting': {
            borderBottom: 'none',
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
    tabContent: {
        // height: '200px',
        overflowY: 'scroll',
    },
    formGrey: {
        background: colors.CG100,
    },
    formItemHeaderEssential: {
        marginLeft: 10,
        fontSize: '12px !important',
        color: colors.PRIMARY,
    },
    titleWrapper: {},
    modalTitle: {
        fontSize: 18,
        fontWeight: 700,
    },
    formItemTitle: {
        display: 'inline-block',
        paddingTop: 10,
        fontSize: 14,
        fontWeight: 700,
    },
    formItemEssential: {
        position: 'relative',
        '&::after': {
            content: '"*"',
            position: 'absolute',
            top: 10,
            right: -10,
            color: colors.PRIMARY,
        },
    },
    formItemGrey: {
        marginTop: 6,
        fontSize: 12,
        fontWeight: 400,
        lineHeight: 1,
        color: '#424242',
    },
    formItemRed: {
        marginTop: 6,
        fontSize: 12,
        fontWeight: 400,
        lineHeight: 1,
        // 일단
        color: theme.palette.primary.dark,
    },
    formItemLightGrey: {
        marginTop: 6,
        fontSize: 12,
        fontWeight: 400,
        lineHeight: 1,
        color: colors.CG400,
    },
    formWrapper: {
        padding: '10px 40px',
    },

    formRangeList: {
        height: 100,
        padding: '16px 40px 0',
        '&+&': {
            borderTop: `1px solid ${colors.BORDER_GREY}`,
        },
        '& input': {
            width: 100,
        },
    },
    formItemUnit: {
        fontSize: 14,
        fontWeight: 700,
        color: colors.CG500,
    },
    serialNoList: {
        marginBottom: 23,
        padding: '20px 40px 25px',
    },
    serialNoInput: {
        // line 없을 경우
        '&+&': {
            marginTop: 12,
        },
        '& .ant-input-number-handler-wrap': {
            display: 'none',
        },
        '& .ant-input-number': {
            width: '132px !important',
        },
    },

    // 모달 내 추가, 삭제 버튼
    serialNoButton: {
        position: 'relative',
        display: 'block',
        cursor: 'pointer',
        width: 24,
        height: 24,
        marginTop: 3,
        padding: 0,
        borderRadius: 4,
        border: `1px solid ${colors.CG400}`,
        '& img': {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
        },
    },
    settingModal: {
        '& .MuiDialog-paperWidthMd': {
            height: '85vh !important',
        },
        '& .ant-form': {
            height: 'calc(85vh - 227px)',
            overflowY: 'scroll',
        },
    },
}));
