import { makeStyles } from '@material-ui/core';
import { colors } from '../../../configs/variables';

export const useStyles = makeStyles((theme) => ({
    submitButton: {
        cursor: 'pointer',
        width: 360,
        height: 40,
        outline: 'none',
        border: 'none',
        borderRadius: 4,
        background: colors.PRIMARY,
        fontWeight: 700,
        color: colors.WHITE,
        transition: 'all 0.3s',
        '&:hover': {
            background: colors.SECONDARY,
        },
    },
}));
