import { makeStyles } from '@material-ui/core';
import { colors } from '../../../configs/variables';

export const useStyles = makeStyles((theme) => ({
    badge: {},
    ABNORMAL: {
        display: 'flex',
        alignItems: 'center',
        width: 'fit-content',
        padding: '4px 8px',
        borderRadius: 4,
        background: colors.LIGHT_ERROR,
        fontWeight: 700,
        '& img': {
            width: 20,
            marginRight: 4,
        },
    },
}));
