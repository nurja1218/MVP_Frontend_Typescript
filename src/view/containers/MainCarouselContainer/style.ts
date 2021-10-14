import { makeStyles } from '@material-ui/core';
import { colors } from '../../../configs/variables';

export const useStyles = makeStyles(() => ({
    mainCarouselContainer: {
        '&::after': {
            position: 'absolute',
            top: 0,
            right: -20,
            content: '""',
            width: 45,
            height: '100%',
            background: `linear-gradient(270deg, ${colors.CG100} 36.34%, rgba(239, 240, 244, 0) 100%)`,
        },
    },
    mainCarousel: {
        width: '100%',
        height: 437, // 원래는 407
    },
    // 일단
    // horizontalWrapper: {
    //     overflowX: 'scroll !important',
    //     '&::-webkit-scrollbar': {
    //         height: 0,
    //     },
    // },
    
    carouselItem: {
        float: 'left',
        width: 302,
        marginRight: 20,
        paddingTop: 15,
        paddingBottom: 15,
        '&:nth-last-of-type(0)': {
            marginRight: 0,
        },
        '& span': {
            color: colors.CG800,
        },
        transition: 'all 0.3s',
        '&:hover': {
            marginTop: -5,
        },
    },
    slideButton: {
        position: 'absolute',
        zIndex: 3,
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 48,
        height: 48,
        borderRadius: 48,
        background: colors.CG900,
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s ease-in',
        '&:hover': {
            opacity: 0.6,
        },
    },
    prevSlide: {
        left: -24,
    },
    nextSlide: {
        right: -24,
    },
    slideNone: {
        cursor: 'not-allowed',
        opacity: 0.3,
        '&:hover': {
            opacity: 0.3,
        },
    },
    moreViewButton: {
        display: 'flex',
        alignItems: 'center',
        margin: '15px 20px 23px 0',
        padding: '0 16px',
        border: `1px solid ${colors.BORDER_GREY}`,
        borderRadius: 5,
        background: 'none',
        fontSize: 14,
        fontWeight: 700,
        color: colors.CG400,
        lineHeight: 1,
        transition: 'all 0.3s',
        '&:hover': {
            background: 'rgba(255,255,255,0.5)',
            color: colors.CG500,
        },
    },
}));
