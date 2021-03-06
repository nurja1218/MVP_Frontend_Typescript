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

interface TableResultIndex {
    createdAt: string;
    id: number;
    key: string;
    maxHumidity?: number | null;
    maxShock?: number | null;
    maxTemperature?: number | null;
    minHumidity?: number | null;
    minTemperature?: number | null;
    name: string;
    placeName: string;
    updatedAt?: number | undefined;
}
interface TableResult {
    result: Array<TableResultIndex>
}

interface Page {
    currentPage?: number;
    pageSize?: number;
    pageNumber?: number;
    totalItems?: number;
    totalPages?: number;
}

interface TableTypeDB {
    result: Array<TableResultIndex>;
    pages: Page;
}

interface ProductId {
    id : string
}

interface ModalType {
    key?: string;
    open: boolean;
    type: string;
}

const defaultColumns = [
    /**
     * title : ????????? ??????(th)
     * dataIndex :
     * key : ?????? ??? ???
     * width : ?????? ???????????????
     * sorter : ??? ??? ??????
     * render : ?????? ?????? ???????????? ?????? ??? ??????
     */
    {
        title: 'No.',
        width: '80px',
        dataIndex: 'id', // index??? ?????? ??? = id / ??????(DB) ??????id??? = key
        sorter: numberSorter('id'),
    },
    {
        title: '?????????',
        width: '20%',
        dataIndex: 'name',
        render: (text: string) => <TextEllipsis>{text}</TextEllipsis>,
    },
    {
        title: '?????? ??????',
        dataIndex: 'temperatureRange',
    },
    {
        title: '?????? ??????',
        dataIndex: 'humidityRange',
    },
    {
        title: '?????? ??????(MAX)',
        width: '15%',
        dataIndex: 'maxShock',
        render: (value: number) => <TextEllipsis>{value || '-'}</TextEllipsis>,
    },
    {
        title: '?????????',
        width: '180px',
        dataIndex: 'createdAt',
        sorter: localeSorter('createdAt'),
    },
    {
        title: '??????',
        width: '150px',
        dataIndex: 'modifyKey',
        render: (key: string) => <ProductChangeButton id={key} />,
    },
];

const moreColumnsByAdminM = [
    {
        title: '??????',
        width: '150px',
        dataIndex: 'deleteKey',
        render: (key: string) => <ProductDeleteButton id={key} />,
    },
];


// ?????? ??????
function ProductChangeButton({ id: productId }: ProductId) {
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
            // ????????? ??????
            action={(e: any) => {
                setModal({
                    open: true,
                    type: 'modify',
                    productId, // ???????????? productId??? ?????? ????????? ???????????? ??????
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
            {t('??????')}
        </RowActionButton>
    );
}

// ?????? ??????
function ProductDeleteButton({ id: productId }: ProductId) {
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
        // ????????? ?????? ?????? ??????
        deleteProduct({
            variables: {
                id: productId,
            },
        })
            .then(({ data }) => {
                message.success(t('????????? ?????????????????????.'));
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
        <Tooltip title={t('????????? ???????????? ?????? ??? ??? ????????????.')}>
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
                {t('??????')}
            </RowActionButton>
            <Modal
                title={t('?????? ??????')}
                visible={isModalVisible}
                onOk={okText}
                onCancel={cancleText}
                okText={t('?????? ??????')}
                cancelText={t('??????')}
                className={classes.deleteModal}
            >
                <p>{t('??????????????? ?????? ?????????????????????????')}</p>
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
    // tableMapper??? ?????? ?????? ?????? ??????
    const [tableData, setTableData] = useState<any>({
        result: [],
    });
    // search input ?????? ?????? ??????
    const [search, setSearch] = useState<any>({
        text: '',
        dateRange: {
            from: '',
            to: '',
        },
    });
    // page input ?????? ??????
    const [page, setPage] = useState<Page>({
        pageNumber: 1,
        pageSize: 100,
    });
    // ?????? ????????? query??? ????????? ??? ????????? page, search
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

    // query??? ????????? ?????? ??? ??? ????????? effect
    useEffect(() => {
        if (productsData) {
            // query?????? ????????? ????????? query ???????????? ?????????
            const { productsByCompany } = productsData;
            const { result, pages }: TableTypeDB = tableMapper(productsByCompany, i18n.language);
            // tableData??? set????????? ???????????? ?????? ????????? ????????? ????????? ???????????? ????????? ?????????
            setTableData({
                result: result.map((r: TableResultIndex) => ({
                    ...r,
                    modifyKey: r.key,
                    deleteKey: r.key,
                    temperatureRange: minMaxRange(r.minTemperature, r.maxTemperature, '???'),
                    humidityRange: minMaxRange(r.minHumidity, r.maxHumidity, '%'),
                })),
                pages,
            });
        }
        if (productsError) {
            console.error(productsError);
        }
    }, [productsData, productsError, i18n.language]);

    // page change ?????????
    const onPageChange = (pageNumber: number, pageSize: number) => {
        setPage({
            pageNumber,
            pageSize,
        });
    };
    // ?????? ?????? ?????????
    const onSearch = (value: string) => {
        setSearch({ ...search, text: value });
    };
    // ?????? ?????? ?????????
    const onDateChange = ([from, to]: string[]) => {
        setSearch({
            ...search,
            dateRange: dateRangeMapper(from, to),
        });
    };

    // ?????? ????????? ????????? ?????? setModal ??????
    const onAddButtonClick = () => {
        setModal({
            open: true,
            type: 'add',
            productId: null, // ?????? ????????? ????????? productId??? ????????????.
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
                title: '??????',
            },
        })
            .then(() => {
                message.success(t('?????? ????????? ?????????????????????. ???????????? ????????? ???????????????.'));
            })
            .catch(() => {
                message.error(t('?????? ?????? ??? ????????? ??????????????????.'));
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
                <Tooltip title={t('???????????? ???????????? ????????? ??? ????????????.')}>
                    <Grid item sm={3}>
                        <SearchInput placeholder="Search" onSearch={onSearch} />
                    </Grid>
                </Tooltip>
                <Tooltip title={t('???????????? ???????????? ????????? ??? ????????????.')}>
                    <Grid item sm={3}>
                        <DateRangePicker onChange={onDateChange} />
                    </Grid>
                </Tooltip>
                <Grid item sm={6} className={classes.xlsxButton}>
                    <Space size={12}>
                        <Tooltip title={t('??????????????? ???????????? ??? ??? ????????????.')}>
                            <div>
                                <XlsxDownloadButton onClick={handleExportXLSX} />
                            </div>
                        </Tooltip>
                        <Tooltip title={t('????????? ????????? ??? ????????????.')}>
                            <div>
                                <AddButton onClick={onAddButtonClick} />
                            </div>
                        </Tooltip>
                    </Space>
                </Grid>
            </Grid>
            {/* DataTable??? data??? tableData??? result??? ????????? ?????? */}
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
