import { makeStyles } from '@material-ui/core';
import { colors } from '../../../configs/variables';

export const useStyles = makeStyles((theme) => ({
    certificateCard: {
        width: '100%',
        // height: 500,
        padding: '28px 24px',
        '& h2': {
            color: colors.WHITE,
            fontWeight: 700,
        },
    },
    NORMAL_ARRIVE: {
        background: 'url("/assets/common/delivered_normal.svg") no-repeat',
        backgroundSize: 'contain',
    },
    NORMAL_PROGRESS: {
        background: 'url("/assets/common/delivered_normal.svg") no-repeat',
        backgroundSize: 'contain',
        opacity: '.3',
        '& button': {
            cursor: 'not-allowed',
        },
    },
    ABNORMAL: {
        background: 'url("/assets/common/delivered_abnormal.svg") no-repeat',
        backgroundSize: 'contain',
        '& button': {
            cursor: 'not-allowed',
        },
    },
    certificateDownloadButton: {
        padding: '0px 10px',
        border: 'none',
        borderRadius: 4,
        background: colors.WHITE,
        fontSize: 14,
        fontWeight: 700,
        color: colors.PRIMARY,
        '&.ABNORMAL': {
            opacity: 0.2,
            color: colors.DARK_ERROR,
        },
    },
}));
