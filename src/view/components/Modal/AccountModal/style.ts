import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
    gridAlign: {
        textAlign: 'right'
    },
    iconButton: {
        cursor: 'pointer',
        fill: '#8f9094',
        '&:hover': {
            fill: '#9e9e9e',
        },
    },
    smallIcon: {
        width: 20,
    },
    // 컨텐츠
    wrapper: {
        position: 'relative',
        width: 640,
        padding: '28px 0 68px !important',
        '& .ant-input, & .ant-select:not(.ant-select-customize-input) .ant-select-selector': {
            height: 40,
            border: `1px solid #B0B1B4`,
            borderRadius: 5,
        },
        '& .ant-select-selection-placeholder, & .ant-select-selection-item': {
            marginTop: 3,
        },
        '& .ant-input-number': {
            height: 40,
            border: `1px solid #B0B1B4`,
            borderRadius: 5,
        },
        '& .ant-input-number-input': {
            height: 40,
        },
        '& .ant-form-item': {
            marginBottom: '0px !important',
        },
    },
    header: {
        // position: '-webkit-sticky',
        position: 'sticky',
        top: 0,
        padding: '25px 40px',
        borderBottom: `1px solid ${'#d4d5d9'}`,
        '& span': {
            fontSize: 18,
            fontWeight: 700,
        },
    },
    formItemHeaderEssential: {
        position: 'relative',
        marginLeft: 20,
        fontSize: '12px !important',
        color: '#3c6af5',
        '&::after': {
            content: '"*"',
            position: 'absolute',
            top: 0,
            left: -7,
            color: '#3c6af5',
        },
    },
    titleWrapper: {},
    modalTitle: {
        fontSize: 18,
        fontWeight: 700,
    },
    formItemTitle: {
        display: 'inline-block',
        paddingTop: 10,
        fontSize: 14,
        fontWeight: 700,
    },
    formItemEssential: {
        position: 'relative',
        '&::after': {
            content: '"*"',
            position: 'absolute',
            top: 10,
            right: -10,
            color: '#3c6af5',
        },
    },
    formItemGrey: {
        fontSize: 12,
        fontWeight: 400,
        color: '#424242',
    },
    formWrapper: {
        padding: '10px 40px',
    },
}));
