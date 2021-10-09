import { makeStyles } from '@material-ui/core';
import { colors } from '../../../configs/variables';

export const useStyles = makeStyles((theme) => ({
    controlTableMenu: {
        float: 'left',
        width: 400,
        '& h2': {
            marginBottom: 32,
            fontSize: 24,
            fontWeight: 700,
            lineHeight: 1.25,
        },
    },
    controlTableContent: {
        float: 'right',
        width: 'calc(100% - 400px - 32px)',
        border: `1px solid ${colors.BORDER_GREY}`,
        borderRadius: 4,
        background: colors.WHITE,
        '&+&': {
            marginTop: 20,
        },
    },
    controlTableHeader: {
        padding: 20,
        borderBottom: `1px solid ${colors.BORDER_GREY}`,
        fontSize: 16,
        fontWeight: 700,
        lineHeight: 1,
    },
    controlTableOption: {
        borderRight: `1px solid ${colors.BORDER_GREY}`,
        '&>div': {
            padding: 20,
            borderBottom: `1px solid ${colors.BORDER_GREY}`,
            '&>div': {
                display: 'flex',
                alignItems: 'center',
                marginBottom: 14,
                '& p': {
                    margin: '0 0 0 6px',
                    fontWeight: 700,
                },
            },
        },
        '& .bar': {
            width: 16,
            height: 3,
        },
        '& li': {
            position: 'relative',
            listStyle: 'none',
            clear: 'both',
            // '&::after': {
            //     content: '""',
            //     position: 'absolute',
            //     top: '50%',
            //     left: -10,
            //     transform: 'translateY(-50%)',
            //     width: 6,
            //     height: 1,
            //     background: '#d4d5d9',
            // },
            '& p': {
                float: 'left',
                marginBottom: 10,
                fontSize: 14,
            },
            '& span': {
                marginLeft: 6,
                fontWeight: 700,
            },
        },
    },
    controlDataTable: {
        // marginBottom: 20, > pagination 으로 변경
        '& .ant-table-column-sorters': {
            padding: 8,
        },
        '& .ant-table-cell': {
            padding: '10px 20px',
        },
    },
}));
