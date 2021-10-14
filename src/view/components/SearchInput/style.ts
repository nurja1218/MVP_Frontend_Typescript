import { makeStyles } from '@material-ui/core';
import { colors } from '../../../configs/variables';

export const useStyles = makeStyles((theme) => ({
    searchInput: {
        position: 'relative',
        height: 36,
        borderRadius: 5,
        transition: 'all 0.4s',
        '& input': {
            width: '100%',
            height: '100%',
            padding: '6px 8px 6px 16px',
            borderRadius: 5,
            border: `1px solid ${colors.BORDER_GREY}`,
            outline: 'none',
            transition: `all 0.4s`,
            '&::placeholder': {
                fontSize: 14,
                color: colors.CG400,
            },
            '&:hover': {
                border: `1px solid ${colors.PRIMARY}`,
            },
            '&:focus': {
                border: `1px solid ${colors.PRIMARY}`,
                boxShadow: `0 0 0 2px ${colors.LIGHT_PRIMARY}`,
            },
        },
        '& button': {
            position: 'absolute',
            top: 0,
            right: 1,
            height: '100%',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
        },
    },
    // searchInput: {
    //     width: '100%',
    //     animationDuration: '0s !important',
    //     '& .ant-click-animating-node': {
    //         display: 'none !important',
    //     },
    //     '& input::placeholder': {
    //         fontSize: 14,
    //     },
    //     '& .ant-input': {
    //         backgroundColor: colors.LIGHT_BLUE_2,
    //         padding: '6px 8px 6px 16px',
    //         borderRadius: 5,
    //     },
    //     '& .ant-input-group': {
    //         position: 'relative',
    //     },
    //     '& .ant-input-group-wrapper': {
    //         border: `1px solid ${colors.BORDER_GREY}`,
    //     },
    //     '& .ant-input-search-button': {
    //         width: 40,
    //         backgroundColor: 'none',
    //         border: 'none',
    //     },
    //     '& .ant-input-group > .ant-input:first-child': {
    //         borderRadius: '5px !important',
    //     },
    //     '& .ant-btn': {
    //         background: 'none',
    //     },
    //     '& .ant-input-group-addon': {
    //         display: 'flex',
    //         alignItems: 'center',
    //         height: '100%',
    //         borderRadius: '5px !important',
    //         background: ' none',
    //         '& button': {
    //             '& span::after': {
    //                 content: "''",
    //                 zIndex: 2,
    //                 position: 'absolute',
    //                 left: 'auto !important',
    //                 top: '50%',
    //                 right: 8,
    //                 transform: 'translateY(-50%)',
    //                 width: 24,
    //                 height: 24,
    //                 backgroundImage: "url('/assets/common/search.svg')",
    //                 backgroundSize: 'cover',
    //             },
    //         },
    //         '& svg': {
    //             display: 'none',
    //         },
    //     },
    //     '& .ant-input-search > .ant-input-group > .ant-input-group-addon:last-child': {
    //         left: 'auto !important',
    //     },
    //     '& .ant-input-group-addon:last-child': {
    //         position: 'absolute',
    //         left: 'auto !important',
    //         right: 1,
    //     },
    //     '& .anticon anticon-search': {
    //         display: 'block',
    //     },
    // },
}));
