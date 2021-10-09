import { makeStyles } from '@material-ui/core';
import { colors } from '../../../configs/variables';

export const useStyle = makeStyles((theme) => ({
    deviceTable: {
        background: colors.WHITE,
        border: `1px solid ${colors.BORDER_GREY}`,
        borderRadius: '5px',
        '& .ant-table-cell:nth-of-type(2),& .ant-table-cell:nth-of-type(5)': {
            fontWeight: 700,
        },
        '& .ant-table-tbody > tr.ant-table-row:hover > td': {
            cursor: 'pointer',
        },
    },
}));
