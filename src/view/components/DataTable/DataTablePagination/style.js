import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../../../configs/variables';

export const useStyles = makeStyles((theme) => ({
    tablePaginationWrapper: {
        padding: '12px 24px',
        height: 50,
        width: '100%',
        borderTop: `1px solid #d4d5d9`,
        '& .ant-table-thead .ant-table-cell, & .ant-table-column-sorters': {
            padding: 14,
        },
    },
    mobilePagination: {
        padding: '19px 0px 0',
    },
    tablePagination: {
        display: 'flex',
        overflow: 'hidden',
        '& .ant-pagination-total-text': {
            color: `${'#9e9e9e'} !important`,
        },
        '& .ant-pagination-item': {
            display: 'flex',
            justifyContent: 'center',
            minWidth: 24,
            height: 24,
            borderRadius: '50%',
            // 제품등록 API연동 후 페이지네이션 active클래스가 추가되지 않음
            // ant-pagination-item이 2개 이상일 때, 변경?
            backgroundColor: '#fff',
            borderColor: colors.BORDER_GREY,
            '& a': {
                marginTop: -4,
                padding: 0,
                color: colors.CG500,
                // letterSpacing: -2,
            },
            '&:hover': {
                borderColor: '#3c6af5',
                '& a': {
                    color: colors.PRIMARY,
                },
            },
        },
        '& .ant-pagination-item-active': {
            backgroundColor: '#3c6af5',
            borderColor: '#3c6af5',
            '& a': {
                marginTop: -4,
                color: 'white !important',
            },
        },

        '& .ant-pagination-prev, & .ant-pagination-next': {
            minWidth: 24,
            height: 24,
            '& span': {
                display: 'block',
                marginTop: 0,
            },
            '& .ant-pagination-item-link': {
                borderRadius: '50%',
                borderColor: '#d4d5d9',
                '& svg': {
                    fill: '#9e9e9e',
                },
            },
        },
        '& .ant-pagination-disabled.ant-pagination-prev,& .ant-pagination-disabled.ant-pagination-next':
            {
                opacity: 0.3,
            },
    },
}));
