/**
 * Data for table -> Data for xlsx (body, header)
 * bodyReplacements {
 *      dataIndex {
 *          key (original): value (replacement)
 *      }
 * }
 * exceptedIndexes [string]
 */

function tableDataMapper(columns, data, bodyReplacements, exceptedIndexes) {
    let columnsToMap = columns;
    let dataToMap = data;

    if (exceptedIndexes) {
        columnsToMap = columns.filter((column) => !exceptedIndexes.includes(column.dataIndex));
        dataToMap = data.map((d) => {
            let dataObject = {};
            for (const key in d) {
                const value = d[key];
                if (!exceptedIndexes.includes(key)) {
                    dataObject[key] = value;
                }
            }
            return dataObject;
        });
    }

    const header = columnsToMap.map((column) => column.title);
    const indexes = columnsToMap.map((column) => column.dataIndex);
    const body = [];

    for (const eachData of dataToMap) {
        const eachBody = [];
        for (const index of indexes) {
            const value = eachData[index];
            if (bodyReplacements && bodyReplacements[index]) {
                const rep = bodyReplacements[index];
                if (typeof rep === 'object') {
                    eachBody.push(rep[value] || '');
                } else {
                    eachBody.push(rep(value) || '');
                }
            } else {
                eachBody.push(value || '');
            }
        }
        body.push(eachBody);
    }

    return {
        header,
        body,
    };
}

export { tableDataMapper };
