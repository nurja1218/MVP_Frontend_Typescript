import { makeStyles } from '@material-ui/core';
import { colors } from '../../../configs/variables';

export const useStyles = makeStyles((theme) => ({
    // 여기가 문제
    badge: {
        padding: '2px 8px',
        borderRadius: '4px',
        fontSize: '14px',
        lineHeight: 1,
        fontWeight: 'bold' as 'bold',
    },

    PROGRESS: {
        background: colors.LIGHT_PRIMARY,
        color: colors.PRIMARY,
    },
    ARRIVE: {
        background: colors.LIGHT_GREEN,
        color: colors.GREEN,
    },
    UNUSED: {
        background: colors.LIGHT_GREY,
        color: colors.GREY,
    },
    COMPANY_ADMIN_M: {
        position: 'relative',
        paddingRight: 15,
        background: colors.CG900,
        color: colors.WHITE,
        '&::after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            right: -10,
            width: 24,
            height: 24,
            transform: 'translateY(-50%)',
            background: 'url("/assets/common/icon_master.svg")',
            backgroundRepeat: 'no-repeat',
        },
    },
    COMPANY_ADMIN: {
        background: colors.SECONDARY,
        color: colors.WHITE,
    },
    COMPANY_USER: {
        background: colors.LIGHT_PRIMARY,
        color: colors.PRIMARY,
    },
}));
