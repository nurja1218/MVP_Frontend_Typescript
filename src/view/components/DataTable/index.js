import { Table } from 'antd';
import { useStyles } from './style';
import { useTranslation } from 'react-i18next';
import TextEllipsis from '../../components/ColumnRenderers/TextEllipsis';

export default function DataTable({
    data,
    columns,
    rowSelection,
    rowEventWithKey, // 클릭했을 때 이벤트 (key)
    rowRadioSelection, // 라디오버튼 추가
    rowCheckSelection, // 체크박스 추가
    rowSelectionSetter, // 까먹음
    scroll,
    style,
}) {
    const { t } = useTranslation();
    const classes = useStyles();
    return (
        <div>
            <Table
                className={classes.dataTable}
                columns={columns.map((column) => ({
                    ...column,
                    title: <TextEllipsis>{t(column.title)}</TextEllipsis>,
                }))}
                dataSource={data}
                pagination={false}
                rowSelection={rowSelection}
                scroll={scroll}
                onRow={(record) => {
                    if (!rowEventWithKey) return;
                    return {
                        onClick: () => {
                            const { key } = record;
                            rowEventWithKey(key);
                        },
                    };
                }}
                style={style}
                locale={{
                    triggerDesc: '',
                    triggerAsc: '',
                    cancelSort: '',
                    emptyText: '',
                }}
                // {{
                //     triggerDesc: t(tableLocale.triggerDesc),
                //     triggerAsc: t(tableLocale.triggerAsc),
                //     cancelSort: t(tableLocale.cancleSort),
                //     emptyText: tableLocale.emptyText,
                // }}
                // rowSelection={
                //     (rowRadioSelection || rowCheckSelection) && {
                //         type: rowRadioSelection ? 'radio' : 'check',
                //         selectedRowKeys,
                //         onChange: (selectedRowKeys) => {
                //             setSelectedRowKeys(selectedRowKeys);
                //             rowSelectionSetter && rowSelectionSetter(selectedRowKeys);
                //         },
                //     }
                // }
            />
        </div>
    );
}
