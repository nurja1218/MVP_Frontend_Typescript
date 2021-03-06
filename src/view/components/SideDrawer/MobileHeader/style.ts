import { makeStyles } from '@material-ui/core/styles';
import { sizes } from '../../../../configs/variables';

const { DRAWER_WIDTH }: any = sizes;

export const useStyles = makeStyles((theme) => ({
    gridAlign: {
        textAlign: 'right'
    },
    appBar: {
        color: 'white',
        zIndex: 9,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${DRAWER_WIDTH}px)`,
            marginLeft: DRAWER_WIDTH,
        },
    },
    menuButton: {
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
        '& svg': {
            fill: 'white',
        },
    },
}));
