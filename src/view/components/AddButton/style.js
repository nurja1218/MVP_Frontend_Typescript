import { makeStyles } from '@material-ui/core';
import { colors } from '@/configs/variables';

export const useStyles = makeStyles((theme) => ({
    addButton: {
        display: 'flex',
        height: 32,
        alignItems: 'center',
        verticalAlign: 'middle',
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
    },
    NONE: {
        opacity: 0.3,
    },
}));
