import { useEffect, useState } from 'react';
import DataTable from '../../../view/components/DataTable';
import localeSorter from '../../../view/components/DataTable/sorter/locale.sorter';
import numberSorter from '../../../view/components/DataTable/sorter/number.sorter';
import RowActionButton from '../../../view/components/RowActionButton';
import DataTablePagination from '../../../view/components/DataTable/DataTablePagination';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { productModalState, userState } from '../../../recoil/atoms';
import ProductModal from '../../../view/components/Modal/ProductModal';
import { Grid } from '@material-ui/core';
import { Space } from 'antd';
import AddButton from '../../../view/components/AddButton';
import DateRangePicker from '../../../view/components/DateRangePicker';
import SearchInput from '../../../view/components/SearchInput';
import XlsxDownloadButton from '../../../view/components/XlsxDownloadButton';
import { useQuery, useMutation } from '@apollo/react-hooks';
import tableMapper from '../../../tools/mapper/table.mapper';
import minMaxRange from '../../../tools/mapper/minmax.range';
import { PRODUCTS_BY_COMPANY } from '../../../apollo/scripts/queries';
import { DELETE_PRODUCT } from '../../../apollo/scripts/mutations';
import { useStyles } from './style';
import TextEllipsis from '../../components/ColumnRenderers/TextEllipsis';
import Modal from 'antd/lib/modal/Modal';
import dateRangeMapper from '../../../tools/mapper/date-range.mapper';
import { Tooltip, message } from 'antd';
import { needRefetchState } from '../../../recoil/atoms';
import { exportToXLSX } from '../../../tools/file-export/xlsx';
import { tableDataMapper } from '../../../tools/file-export/mappers';
import { useTranslation } from 'react-i18next';
// import TextEllipsis from '@/components/ColumnRenderers/TextEllipsis';
// import numberSorter from '@/view/components/DataTable/sorter/number.sorter';

const defaultColumns = [
    /**
     * title : 테이블 헤더(th)
     * dataIndex :
     * key : 고유 키 값
     * width : 컬럼 가로사이즈
     * sorter : 각 열 정렬
     * render : 값이 아닌 버튼이나 태그 인 경우
     */
    {
        title: 'No.',
        width: '80px',
        dataIndex: 'id', // index를 위한 값 = id / 실제(DB) 제품id값 = key
        sorter: numberSorter('id'),
    },
    {
        title: '제품명',
        width: '20%',
        dataIndex: 'name',
        render: (text: any) => <TextEllipsis>{text}</TextEllipsis>,
    },
    {
        title: '온도 범위',
        dataIndex: 'temperatureRange',
    },
    {
        title: '습도 범위',
        dataIndex: 'humidityRange',
    },
    {
        title: '충격 범위(MAX)',
        width: '15%',
        dataIndex: 'maxShock',
        render: (value: any) => <TextEllipsis>{value || '-'}</TextEllipsis>,
    },
    {
        title: '등록일',
        width: '180px',
        dataIndex: 'createdAt',
        sorter: localeSorter('createdAt'),
    },
    {
        title: '변경',
        width: '150px',
        dataIndex: 'modifyKey',
        render: (key: any) => <ProductChangeButton id={key} />,
    },
];

const moreColumnsByAdminM = [
    {
        title: '삭제',
        width: '150px',
        dataIndex: 'deleteKey',
        render: (key: any) => <ProductDeleteButton id={key} />,
    },
];


// 변경 버튼
function ProductChangeButton({ id: productId }: any) {
    const { t } = useTranslation();
    const setModal: any = useSetRecoilState(productModalState);
    const [hoverd, setHoverd] = useState(false);
    const handleMouseOver = () => {
        setHoverd(true);
    };
    const handleMouseLeave = () => {
        setHoverd(false);
    };
    return (
        <RowActionButton
            // 클릭한 경우
            action={(e: any) => {
                setModal({
                    open: true,
                    type: 'modify',
                    productId, // 해당하는 productId에 맞는 내용을 불러와서 수정
                });
                e.stopPropagation();
            }}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
        >
            <img
                src={`${hoverd ? `/assets/common/change_dark.png` : `/assets/common/change.png`}`}
                alt=""
                style={{ width: '20px' }}
            />
            {t('변경')}
        </RowActionButton>
    );
}

// 삭제 버튼
function ProductDeleteButton({ id: productId }: any) {
    const { t } = useTranslation();
    const setNeedRefetch = useSetRecoilState(needRefetchState);
    const [hoverd, setHoverd] = useState(false);
    const handleMouseOver = () => {
        setHoverd(true);
    };
    const handleMouseLeave = () => {
        setHoverd(false);
    };

    const classes = useStyles();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const onAction = () => {
        setIsModalVisible(true);
    };
    const okText = () => {
        // 여기에 제품 삭제 쿼리
        deleteProduct({
            variables: {
                id: productId,
            },
        })
            .then(({ data }) => {
                message.success(t('제품이 삭제되었습니다.'));
                setNeedRefetch(true);
            })
            .catch((err) => {
                console.log(err.message);
            });
        setIsModalVisible(false);
    };
    const cancleText = () => {
        setIsModalVisible(false);
    };

    const [deleteProduct] = useMutation(DELETE_PRODUCT);

    return (
        <Tooltip title={t('관리자 마스터만 삭제 할 수 있습니다.')}>
            <RowActionButton
                action={onAction}
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
            >
                <img
                    src={`${
                        hoverd ? `/assets/common/delete_dark.png` : `/assets/common/delete.png`
                    }`}
                    alt=""
                    style={{ width: '20px' }}
                />
                {t('삭제')}
            </RowActionButton>
            <Modal
                title={t('제품 삭제')}
                visible={isModalVisible}
                onOk={okText}
                onCancel={cancleText}
                okText={t('제품 삭제')}
                cancelText={t('취소')}
                className={classes.deleteModal}
            >
                <p>{t('제품정보를 정말 삭제하시겠습니까?')}</p>
            </Modal>
        </Tooltip>
    );
}

export default function ProductTableContainer() {
    const { t, i18n } = useTranslation();
    const classes = useStyles();
    const { roleId: clientType } = useRecoilValue(userState);
    // const [modal, setModal] = useSetRecoilState(productModalState);
    const setModal: any = useSetRecoilState(productModalState);
    // tableMapper의 값을 담을 변수 생성
    const [tableData, setTableData] = useState<any>({
        result: [],
    });
    // search input 담을 변수 선언
    const [search, setSearch] = useState<any>({
        text: '',
        dateRange: {
            from: '',
            to: '',
        },
    });
    // page input 변수 선언
    const [page, setPage] = useState<any>({
        pageNumber: 1,
        pageSize: 100,
    });
    // 제품 데이터 query로 일어올 때 인자는 page, search
    const {
        data: productsData,
        error: productsError,
        refetch,
    } = useQuery(PRODUCTS_BY_COMPANY, {
        variables: {
            page,
            search,
        },
    });

    // Global Refetch by recoil state
    const [needRefetch, setNeedRefetch] = useRecoilState(needRefetchState);
    useEffect(() => {
        if (needRefetch) {
            try {
                refetch();
            } catch (err) {
                console.log(err);
            } finally {
                setNeedRefetch(false);
            }
        }
    }, [needRefetch, setNeedRefetch, refetch]);

    // query로 데이터 읽어 온 후 동작할 effect
    useEffect(() => {
        if (productsData) {
            // query명과 동일한 변수에 query 데이터를 담는다
            const { productsByCompany } = productsData;
            const { result, pages }: any = tableMapper(productsByCompany, i18n.language);
            // tableData에 set함수로 데이터를 형태 변환할 부분을 바꾸고 동일하면 그대로 담는다
            setTableData({
                result: result.map((r: any) => ({
                    ...r,
                    modifyKey: r.key,
                    deleteKey: r.key,
                    temperatureRange: minMaxRange(r.minTemperature, r.maxTemperature, '℃'),
                    humidityRange: minMaxRange(r.minHumidity, r.maxHumidity, '%'),
                })),
                pages,
            });
        }
        if (productsError) {
            console.error(productsError);
        }
    }, [productsData, productsError, i18n.language]);

    // page change 이벤트
    const onPageChange = (pageNumber: number, pageSize: number) => {
        setPage({
            pageNumber,
            pageSize,
        });
    };
    // 단어 검색 이벤트
    const onSearch = (value: string) => {
        setSearch({ ...search, text: value });
    };
    // 기간 검색 이벤트
    const onDateChange = ([from, to]: string[]) => {
        setSearch({
            ...search,
            dateRange: dateRangeMapper(from, to),
        });
    };

    // 추가 버튼을 클릭한 경우 setModal 실행
    const onAddButtonClick = () => {
        setModal({
            open: true,
            type: 'add',
            productId: null, // 새로 추가할 경우엔 productId가 필요없다.
        });
    };

    const handleExportXLSX = () => {
        exportToXLSX({
            data: tableDataMapper(
                defaultColumns,
                tableData.result,
                {
                    maxShock: (value: any) => value || '-',
                },
                ['modifyKey', 'deleteKey'],
            ),
            configs: {
                title: '제품',
            },
        })
            .then(() => {
                message.success(t('파일 추출이 시작되었습니다. 다운로드 내역을 확인하세요.'));
            })
            .catch(() => {
                message.error(t('파일 추출 중 문제가 발생했습니다.'));
            });
    };

    return (
        <div className={classes.productTable}>
            <ProductModal />
            <Grid
                container
                spacing={1}
                alignItems="center"
                style={{
                    padding: '16px 20px',
                }}
            >
                <Tooltip title={t('제품명을 입력하여 조회할 수 있습니다.')}>
                    <Grid item sm={3}>
                        <SearchInput placeholder="Search" onSearch={onSearch} />
                    </Grid>
                </Tooltip>
                <Tooltip title={t('등록일을 입력하여 조회할 수 있습니다.')}>
                    <Grid item sm={3}>
                        <DateRangePicker onChange={onDateChange} />
                    </Grid>
                </Tooltip>
                <Grid item sm={6} className={classes.xlsxButton}>
                    <Space size={12}>
                        <Tooltip title={t('제품목록을 다운로드 할 수 있습니다.')}>
                            <div>
                                <XlsxDownloadButton onClick={handleExportXLSX} />
                            </div>
                        </Tooltip>
                        <Tooltip title={t('제품을 추가할 수 있습니다.')}>
                            <div>
                                <AddButton onClick={onAddButtonClick} />
                            </div>
                        </Tooltip>
                    </Space>
                </Grid>
            </Grid>
            {/* DataTable의 data는 tableData의 result와 동일한 형태 */}
            <DataTable
                // columns={columns}
                columns={
                    clientType === 'COMPANY_ADMIN_M'
                        ? [...defaultColumns, ...moreColumnsByAdminM]
                        : defaultColumns
                }
                data={tableData.result}
                scroll={{ x: 1200, y: 'calc(100vh - 275px)' }}
                style={{ height: 'calc(100vh - 225px)' }}
            />
            <DataTablePagination
                total={tableData.pages && tableData.pages.totalItems}
                defaultCurrent={page.pageNumber}
                defaultPageSize={page.pageSize}
                onChange={onPageChange}
            />
        </div>
    );
}
