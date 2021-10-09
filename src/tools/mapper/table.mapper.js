// id: Fake ID
// key: UUID

import moment from 'moment';
/*
table 형태로 나타내야 하는 첫번째 data가 아래와 같다면
data[{
        id: 438
        name: 'abc'
    }, ...
]

query를 통해 데이터를 가져올 때
{
    key: DB_ID
    id: 1
... data
}의 형태로 데이터를 뿌려주면 됨
*/

export default function tableMapper(data, lang = 'ko', idxStart = 0, specialKey) {
    const { result, pages } = data;
    const { pageSize, currentPage } = pages;
    return {
        result: result.map((d, idx) => ({
            ...d,
            key: specialKey ? d[specialKey] : d.id,
            id: pageSize * (currentPage - 1) + idx + idxStart + 1,
            createdAt:
                d.createdAt &&
                moment(d.createdAt)
                    .local()
                    .format(`${lang === 'ko' ? 'YYYY-MM-DD' : 'DD-MM-YYYY'}`),
            updatedAt:
                d.updatedAt &&
                moment(d.updatedAt)
                    .local()
                    .format(`${lang === 'ko' ? 'YYYY-MM-DD' : 'DD-MM-YYYY'}`),
        })),
        pages,
    };
}
