import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../../../configs/variables';

export const useStyles = makeStyles((theme) => ({
    alarmBadge: {
        '& div': {
            display: 'flex',
            width: 'fit-content',
            alignItems: 'center',
            padding: '3px 16px 3px 10px',
            borderRadius: 35,
            fontWeight: 700,
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            // overflow: 'hidden',
        },
        '& img': {
            marginRight: 4,
        },
        '& .normal': {
            cursor: 'default',
            border: `1px solid ${colors.BORDER_GREY}`,
        },
        '& .abnormal': {
            cursor: 'pointer',
            background: colors.ERROR,
            color: colors.WHITE,
            // '& span': {
            //     overflow: 'hidden',
            //     maxWidth: 150,
            //     textOverflow: 'ellipsis',
            //     whiteSpace: 'nowrap',
            // },
        },
        '&:hover > sup': {
            backgroundColor: '#ff7d7d',
        },
    },
    alarmListWrapper: {
        backgroundColor: colors.WHITE,
        width: 300,
        maxHeight: 400,
        overflowY: 'scroll',
        borderRadius: '5px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    },
    alarmWrapper: {
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        padding: '6px 15px',
        borderBottom: `1px solid ${colors.BORDER_GREY}`,
        '&:hover': {
            backgroundColor: '#edf0fb',
        },
        '&:hover span:first-child': {
            color: `${colors.PRIMARY} !important`,
        },
    },
    alarmContent: {
        color: colors.GREY,
    },
    description: {
        fontSize: '0.75rem',
        margin: '2px 0',
    },
    alarmDate: {
        color: '#acacb6',
    },
    otherContent: {
        marginLeft: 2.5,
    },
    otherTag: {
        marginLeft: 2.5,
    },
}));
