import { Empty } from 'antd';
import T from '../T';

const tableLocale = {
    triggerDesc: '내림차순으로 정렬',
    triggerAsc: '오름차순으로 정렬',
    cancleSort: '정렬 해제',
    emptyText: (
        <Empty
            description={
                <span style={{ color: '#777' }}>
                    <T>데이터가 없습니다.</T>
                </span>
            }
            style={{
                margin: '25px 8px',
            }}
        />
    ),
};

export default tableLocale;
