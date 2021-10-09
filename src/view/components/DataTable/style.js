import { makeStyles } from '@material-ui/core';
import { colors } from '../../../configs/variables';

export const useStyles = makeStyles((theme) => ({
    dataTable: {
        '& .ant-table-expanded-row-fixed': {
            maxWidth: 1000,
            margin: '0 auto',
        },
        '& .ant-table-thead th': {
            borderBottom: `1px solid ${colors.BORDER_GREY}`,
            background: colors.CG100,
            fontWeight: 700,
            color: colors.DARK_DEFAULT,
        },
        '& .ant-table-tbody > tr.ant-table-row:hover > td': {
            background: colors.CG50,
        },
        '& .ant-table-column-has-sorters': {
            height: 46,
        },
        '& .ant-table-thead .ant-table-cell': {
            padding: '13px 20px !important',
        },
        '& .ant-table-thead .ant-table-column-sorters': {
            padding: '0 !important',
        },
        '& .ant-table-cell': {
            padding: '18px 20px', // 20으로 진행할지 > 리아 확인
            lineHeight: 1.45,
            borderBottom: `1px solid ${colors.BORDER_GREY}`,
        },
    },
}));
