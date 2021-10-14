import { makeStyles } from '@material-ui/core';
import { colors } from '../../../configs/variables';

export const useStyles = makeStyles((theme) => ({
    certificateButton: {
        display: 'flex',
        alignItems: 'center',
        verticalAlign: 'middle',
        // width: 'max-content',
        padding: '4px 10px 4px 8px',
        borderRadius: 4,
        backgroundColor: colors.PRIMARY,
        border: 'none',
        fontSize: 14,
        fontWeight: 700,
        lineHeight: 1,
        color: colors.WHITE,
        outline: 'none',
        '& img': {
            width: 20,
            marginRight: 4,
        },
        transition: 'all 0.3s',
        '&:hover': {
            background: colors.SECONDARY,
            color: colors.WHITE,
        },
        '&:focus': {
            boxShadow: `0 0 0 2px ${colors.LIGHT_PRIMARY}`,
        },
    },
    MULTIPART: {
        height: 32,
        background: colors.WHITE,
        border: `1px solid ${colors.PRIMARY}`,
        color: colors.PRIMARY,
        '&:hover': {
            border: `1px solid ${colors.LIGHT_PRIMARY}`,
        },
    },
    NON_ISSUED: {
        cursor: 'not-allowed',
        background: colors.DISABLED,
        color: colors.DARK_DISABLED,
        '&:hover': {
            background: colors.DISABLED,
            color: colors.DARK_DISABLED,
        },
        '&:focus': {
            boxShadow: `none`,
        },
    },
    NOT_YET: {
        cursor: 'not-allowed',
        opacity: 0.3,
        '&:hover': {
            background: colors.PRIMARY,
        },
    },
}));
