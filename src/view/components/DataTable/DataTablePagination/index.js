import { Pagination } from 'antd';
import { useStyles } from './style';
import { useCallback } from 'react';

export default function DataTablePagination({ total, defaultCurrent, defaultPageSize, onChange }) {
    const classes = useStyles();
    const handleChange = useCallback(
        (pageNumber) => {
            onChange(pageNumber, defaultPageSize);
        },
        [defaultPageSize, onChange],
    );

    return (
        <div className={classes.tablePaginationWrapper}>
            <Pagination
                className={classes.tablePagination}
                total={total}
                defaultPageSize={defaultPageSize}
                current={defaultCurrent || 1}
                showSizeChanger={false}
                onChange={handleChange}
            />
        </div>
    );
}
/**
 * total : 페이지네이션 할 총 개수
 * current : 현재 페이지
 * defaultCurrent : 기본 초기 페이지 번호
 * defaultPageSize : 페이지당 기본 데이터 항목 수
 * pageSize : 페이지당 데이터 항목 수
 * showSizeChanger : pagesize 선택을 표시할지 여부 결정(10개, 50개씩 ..)
 * onChange : 페이지 번호 또는 pagesize 변경될 때 호출, 결과 페이지 번호와 pagesize를 인수로 취함 function(page, pagesize)
 */
