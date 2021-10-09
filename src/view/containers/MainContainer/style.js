import { makeStyles } from '@material-ui/core';
import { colors } from '@/configs/variables';

export const useStyles = makeStyles((theme) => ({
    mainInformation: {
        '& h3': {
            marginBottom: 32,
            fontSize: 32,
            fontWeight: 700,
            lineHeight: 1,
            color: colors.CG400,
        },
        '& ul': {
            marginBottom: 20,
            paddingLeft: 0,
        },
        '& li': {
            display: 'flex',
            alignItems: 'center',
            width: 295,
            borderBottom: `1px solid ${colors.BORDER_GREY}`,
            '&:nth-of-type(2)': {
                marginTop: 24,
            },
        },
        '& img': {
            marginRight: 10,
        },
        '& p': {
            marginBottom: 0,
            fontSize: 20,
            fontWeight: 700,
            lineHeight: 1,
        },
    },
    mainCertificateCard: {
        width: '100%',
        height: 196,
        padding: '28px 24px',
        background: 'url("/assets/common/delivered_normal.svg") no-repeat',
        backgroundSize: 'contain',
        '& h2': {
            marginBottom: 43,
            fontSize: 24,
            fontWeight: 700,
            lineHeight: 1.25,
            color: colors.WHITE,
        },
        '& button': {
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            padding: '6px 34px 6px 10px',
            background: colors.WHITE,
            border: 'none',
            borderRadius: 4,
            fontSize: 14,
            fontWeight: 700,
            color: colors.PRIMARY,
            cursor: 'pointer',
            '&::after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                right: 10,
                transform: 'translateY(-50%)',
                width: 20,
                height: 20,
                background: 'url(/assets/common/more_chevron.svg) no-repeat',
                transition: 'all 0.3s',
            },
            '&:hover': {
                '&::after': {
                    right: 7,
                },
            },
        },
    },
    mainControlTable: {
        // marginTop: 24,
        border: `1px solid ${colors.BORDER_GREY}`,
        borderRadius: 5,
        background: colors.WHITE,
        '& p': {
            marginBottom: 0,
            padding: 20,
            fontSize: 16,
            fontWeight: 700,
            lineHeight: 1,
        },
        '& .ant-table-cell': {
            verticalAlign: 'top',
        },
        '& .ant-table-tbody > tr.ant-table-row:hover > td': {
            cursor: 'pointer',
        },
    },
}));
