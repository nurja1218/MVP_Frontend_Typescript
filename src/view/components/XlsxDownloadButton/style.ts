import { makeStyles } from '@material-ui/core';
import { colors } from '../../../configs/variables';

export const useStyles = makeStyles((theme) => ({
    xlsxButton: {
        cursor: 'pointer',
        display: 'flex',
        height: 32,
        alignItems: 'center',
        verticalAlign: 'middle',
        borderRadius: 4,
        backgroundColor: 'none',
        border: `1px solid ${colors.PRIMARY}`,
        background: 'none',
        fontSize: 14,
        fontWeight: 700,
        lineHeight: 1,
        color: colors.PRIMARY,
        outline: 'none',
        '& img': {
            width: 20,
            marginRight: 4,
        },
        transition: 'all 0.3s',
        '&:hover': {
            border: `1px solid ${colors.SECONDARY}`,
            background: colors.SECONDARY,
            color: colors.WHITE,
        },
        '&:focus': {
            boxShadow: `0 0 0 2px ${colors.LIGHT_PRIMARY}`,
        },
    },
}));
