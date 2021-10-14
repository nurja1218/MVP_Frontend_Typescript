import { makeStyles } from '@material-ui/core/styles';
import { sizes } from '../../../configs/variables';
import { colors } from '../../../configs/variables';

const { APPBAR_HEIGHT } = sizes;

export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100%',
        zIndex: 10,
        [theme.breakpoints.up('sm')]: {
            flexShrink: 0,
        },
        transition: ' width .2s linear',
        '& .hamburgerMenu': {
            display: 'none',
            position: 'absolute',
            top: 78,
            right: -20,
            padding: 8,
            border: 'none',
            borderRadius: 8,
            background: colors.CG900,
            cursor: 'pointer',
        },
        '&:hover': {
            '& .hamburgerMenu': {
                display: 'block',
            },
        },
    },
    appBar: {
        backgroundColor: 'white',
        boxShadow: 'none',
        zIndex: 5,
        borderBottom: `1px solid ${colors.CG200}`,
        '&>div': {
            minHeight: APPBAR_HEIGHT,
        },
        color: '#222',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        //padding: '15px 40px', // main 카드 슬라이드로 인해 padding top은 각각의 페이지에서
        padding: '0 40px 15px',
        width: '100%',
        height: '100%',
        minWidth: 1024,
        overflowX: 'scroll',
    },
}));
