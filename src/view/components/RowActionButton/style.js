import { makeStyles } from '@material-ui/core';
import { colors } from '../../../configs/variables';

export const useStyles = makeStyles((theme) => ({
    rowActionButton: {
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'fit-content',
        padding: '3px 9px 3px 7px',
        border: `1px solid ${colors.CG400}`,
        borderRadius: 4,
        fontSize: 14,
        fontWeight: 700,
        lineHeight: 1,
        color: '#8f9094',
        '&.disabled': {
            opacity: 0.3,
            cursor: 'not-allowed',
        },
        '& img': {
            marginRight: 4,
        },
        transition: 'all 0.3s',
        '&:hover': {
            border: `1px solid ${colors.DARK_DEFAULT}`,
            color: colors.DARK_DEFAULT,
        },
    },
}));
