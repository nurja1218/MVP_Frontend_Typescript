import { makeStyles } from '@material-ui/core';
import { colors } from '../../../configs/variables';

export const useStyles = makeStyles((theme) => ({
    accountTable: {
        background: '#fff',
        border: '1px solid #d4d5d9',
        borderRadius: '5px',
        '& .ant-table-cell:nth-of-type(2)': {
            fontWeight: 700,
        },
    },
    deleteModal: {
        '& .ant-modal-content': {
            width: 460,
            borderRadius: 5,
            border: `1px solid ${colors.BORDER_GREY} !important`,
        },
        '& .ant-modal-header': {
            padding: '32px 40px',
            borderBottom: 'none',
            borderRadius: '5px 5px 0 0',
        },
        '& .ant-modal-title': {
            fontSize: 18,
            fontWeight: 700,
        },
        '& .ant-modal-body': {
            padding: '0 40px 32px',
        },
        '& .ant-modal-close': {
            top: 15,
            right: 15,
            background: colors.WHITE,
            '&::after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 24,
                height: 24,
                transform: 'translate(-50%, -50%)',
                background: `${colors.WHITE} url("/assets/common/close.svg") no-repeat`,
            },
        },
        '& .ant-btn': {
            width: 120,
            height: 40,
            borderRadius: 4,
            '& span': {
                display: 'inline-block',
                fontWeight: 700,
            },
            '&:nth-of-type(1)': {
                border: `1px solid ${colors.CG400}`,
                '& span': {
                    color: colors.CG600,
                },
                '&:hover': {
                    borderColor: colors.CG700,
                    '& span': {
                        color: colors.CG700,
                    },
                },
            },
        },
        '& .ant-btn-primary': {
            width: 248,
            border: 'none',
            background: colors.ERROR,
            textShadow: 'none',
            '&:hover': {
                background: '#f18b7e',
            },
        },
        '& .ant-modal-footer': {
            padding: '23px 40px',
            borderTop: `1px solid ${colors.BORDER_GREY}`,
        },
    },
}));
