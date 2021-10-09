import { makeStyles } from '@material-ui/core';
import { colors } from '../../../configs/variables';

export const useStyle = makeStyles((theme) => ({
    controlTable: {
        background: colors.WHITE,
        border: `1px solid ${colors.BORDER_GREY}`,
        borderRadius: '5px',
        '& .ant-table-cell': {
            verticalAlign: 'top',
        },
        '& .ant-table-cell:nth-of-type(1)': {
            paddingLeft: 15,
        },
        '& .ant-table-cell:nth-of-type(2),& .ant-table-cell:nth-of-type(7)': {
            fontWeight: 700,
        },
        '& .ant-table-tbody > tr.ant-table-row:hover > td': {
            cursor: 'pointer',
        },
        '& .ant-table-selection': {
            marginLeft: -5,
        },
    },
}));
