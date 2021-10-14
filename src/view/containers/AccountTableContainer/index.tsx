import { useEffect, useState } from 'react';
import DataTable from '../../../view/components/DataTable';
import localeSorter from '../../../view/components/DataTable/sorter/locale.sorter';
import numberSorter from '../../../view/components/DataTable/sorter/number.sorter';
import DataTablePagination from '../../../view/components/DataTable/DataTablePagination';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Grid } from '@material-ui/core';
import { Space, Modal, message, Tooltip } from 'antd';
import Checkboxes from '../../../view/components/Checkboxes';
import DateRangePicker from '../../../view/components/DateRangePicker';
import SearchInput from '../../../view/components/SearchInput';
import RowStateBadge from '../../../view/components/RowStateBadge';
import XlsxDownloadButton from '../../../view/components/XlsxDownloadButton';
import { useStyles } from './style';
import { useQuery, useMutation } from '@apollo/react-hooks';
import tableMapper from '../../../tools/mapper/table.mapper';
import { DELETE_USER } from '../../../apollo/scripts/mutations';
import { USERS_BY_COMPANY } from '../../../apollo/scripts/queries';
import RowActionButton from '../../../view/components/RowActionButton';
import AddButton from '../../components/AddButton';
import AccountModal from '../../components/Modal/AccountModal';
import { ACCOUNT_ROLES } from '../../../configs/enum';
import { accountModalState, needRefetchState, userState } from '../../../recoil/atoms';
import TextEllipsis from '../../components/ColumnRenderers/TextEllipsis';
import dateRangeMapper from '../../../tools/mapper/date-range.mapper';
import { exportToXLSX } from '../../../tools/file-export/xlsx';
import { tableDataMapper } from '../../../tools/file-export/mappers';
import { useTranslation } from 'react-i18next';

const defaultColumns = [
    {
        title: 'No.',
        width: '80px',
        dataIndex: 'id',
        fontWeight: '700',
        sorter: numberSorter('id'),
    },
    {
        title: '이용자',
        width: '20%',
        dataIndex: 'name',
        sorter: localeSorter('name'),
        render: (text: any) => <TextEllipsis>{text}</TextEllipsis>,
    },
    {
        title: '휴대폰 번호',
        // width: '220px',
        dataIndex: 'phone',
        render: (text: any) => <TextEllipsis>{text}</TextEllipsis>,
    },
    {
        title: '이메일',
        dataIndex: 'email',
        sorter: localeSorter('email'),
        render: (text: any) => <TextEllipsis>{text}</TextEllipsis>,
    },
    {
        title: '등급',
        width: '10%',
        dataIndex: 'roleId',
        render: (state: any) => <RoleBadge status={state} />,
        sorter: localeSorter('roleId'),
    },
    {
        title: '등록일',
        width: '180px',
        dataIndex: 'createdAt',
        sorter: localeSorter('createdAt'),
    },
];

const moreColumnsByAdminM = [
    {
        title: '변경',
        width: '150px',
        dataIndex: 'modifyKey',
        render: (modifyKey: any) => {
            const [key, role, email] = modifyKey.split('/');
            return <ProductChangeButton id={key} role={role} email={email} />;
        },
    },
    {
        title: '삭제',
        width: '150px',
        dataIndex: 'deleteKey',
        render: (deleteKey: any) => {
            const [key, role] = deleteKey.split('/');
            return <AccountDeleteButton id={key} role={role} />;
        },
    },
];

// 변경 버튼
function ProductChangeButton({ id: accountId, role, email }: any) {
    const { email: clientEmail } = useRecoilValue<any>(userState);
    const { t } = useTranslation();
    const setModal = useSetRecoilState<any>(accountModalState);
    const [hoverd, setHoverd] = useState<any>(false);
    const handleMouseOver: any = () => {
        setHoverd(true);
    };
    const handleMouseLeave: any = () => {
        setHoverd(false);
    };
    return (
        <>
            {role !== 'COMPANY_ADMIN_M' ? (
                <RowActionButton
                    action={(e: any) => {
                        setModal({
                            open: true,
                            type: 'modify',
                            accountId,
                        });
                        e.stopPropagation();
                    }}
                    onMouseOver={handleMouseOver}
                    onMouseLeave={handleMouseLeave}
                >
                    <img
                        src={`${hoverd ? `/assets/common/change_dark.png` : `/assets/common/change.png`
                            }`}
                        alt=""
                        style={{ width: '20px' }}
                    />
                    {t('변경')}
                </RowActionButton>
            ) : (
                email === clientEmail && (
                    <RowActionButton
                        action={(e: any) => {
                            setModal({
                                open: true,
                                type: 'modify',
                                accountId,
                            });
                            e.stopPropagation();
                        }}
                        onMouseOver={handleMouseOver}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img
                            src={`${hoverd
                                ? `/assets/common/change_dark.png`
                                : `/assets/common/change.png`
                                }`}
                            alt=""
                            style={{ width: '20px' }}
                        />
                        {t('변경')}
                    </RowActionButton>
                )
            )}
        </>
    );
}

// 삭제 버튼
// 등급이 COMPANY_ADMIN_M -> 삭제 버튼 disabled(className에 disabled 추가)
function AccountDeleteButton({ id: accountId, role }: any) {
    const { t } = useTranslation();
    // 삭제 버튼 효과
    const [hoverd, setHoverd] = useState(false);
    const handleMouseOver = () => {
        setHoverd(true);
    };
    const handleMouseLeave = () => {
        setHoverd(false);
    };

    const classes = useStyles();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const setNeedRefetch = useSetRecoilState(needRefetchState);
    const onAction = () => {
        setIsModalVisible(true);
    };
    const okText = () => {
        deleteUser({
            variables: {
                id: accountId,
            },
        })
            .then(({ data }) => {
                message.success(t('사용자가 삭제되었습니다.'));
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

    const [deleteUser] = useMutation(DELETE_USER);

    return (
        <>
            {role !== 'COMPANY_ADMIN_M' && (
                <RowActionButton
                    action={onAction}
                    onMouseOver={handleMouseOver}
                    onMouseLeave={handleMouseLeave}
                >
                    <img
                        src={`${hoverd ? `/assets/common/delete_dark.png` : `/assets/common/delete.png`
                            }`}
                        alt=""
                        style={{ width: '20px' }}
                    />
                    {t('삭제')}
                </RowActionButton>
            )}
            <Modal
                title={t('회원정보 삭제')}
                visible={isModalVisible}
                onOk={okText}
                onCancel={cancleText}
                okText={t('회원정보 삭제')}
                cancelText={t('취소')}
                className={classes.deleteModal}
            >
                <p>{t('회원정보를 정말 삭제하시겠습니까?')}</p>
            </Modal>
        </>
    );
}

// 등급 뱃지
function RoleBadge({ status }: any) {
    return <RowStateBadge status={status} />;
}

const roles = {
    admin_m: ACCOUNT_ROLES.COMPANY_ADMIN_M,
    admin: ACCOUNT_ROLES.COMPANY_ADMIN,
    user: ACCOUNT_ROLES.COMPANY_USER,
};

const checkOptions = [
    {
        label: roles.admin_m,
        value: 'COMPANY_ADMIN_M',
    },
    {
        label: roles.admin,
        value: 'COMPANY_ADMIN',
    },
    {
        label: roles.user,
        value: 'COMPANY_USER',
    },
];

const defaultOptionValue = ['COMPANY_ADMIN_M', 'COMPANY_ADMIN', 'COMPANY_USER'];

export default function AccountTableContainer() {
    const { t, i18n } = useTranslation();
    const classes: any = useStyles();
    const { roleId: clientType } = useRecoilValue<any>(userState);
    const setModal = useSetRecoilState<any>(accountModalState);
    const [tableData, setTableData] = useState<any>({
        result: [],
    });
    const [search, setSearch] = useState<any>({
        text: '',
        dateRange: {
            from: '',
            to: '',
        },
    });
    const [page, setPage] = useState<any>({
        pageNumber: 1,
        pageSize: 100,
    });
    const [searchType, setSearchType] = useState<any>(defaultOptionValue);
    const {
        data: usersData,
        error: usersError,
        refetch,
    } = useQuery(USERS_BY_COMPANY, {
        variables: {
            page,
            search: {
                ...search,
                types: searchType == null ? [] : searchType,
            },
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

    useEffect(() => {
        if (usersData) {
            // query명과 동일한 변수에 query 데이터를 담는다
            const { usersByCompany } = usersData;
            const { result, pages } = tableMapper(usersByCompany, i18n.language);
            // tableData에 set함수로 데이터를 형태 변환할 부분을 바꾸고 동일하면 그대로 담는다
            setTableData({
                result: result.map((r: any) => ({
                    ...r,
                    modifyKey: `${r.key}/${r.roleId}/${r.email}`,
                    deleteKey: `${r.key}/${r.roleId}`,
                })),
                pages,
            });
        }
        if (usersError) {
            console.error(usersError);
        }
    }, [usersData, usersError, i18n.language]);

    // 추가 버튼을 클릭한 경우 setModal 실행
    const onAddButtonClick = () => {
        setModal({
            open: true,
            type: 'add',
            productId: null, // 새로 추가할 경우엔 productId가 필요없다.
        });
    };

    // page change 이벤트
    const onPageChange = (pageNumber: any, pageSize: any) => {
        setPage({
            pageNumber,
            pageSize,
        });
    };
    // 단어 검색 이벤트
    const onSearch = (value: any) => {
        setSearch({ ...search, text: value });
    };
    // 기간 검색 이벤트
    const onDateChange = ([from, to]: Array<string>) => {
        setSearch({
            ...search,
            dateRange: dateRangeMapper(from, to),
        });
    };

    const onSelectChange = (value: any) => {
        if (Array.isArray(value) && value.length === 0) {
            value = [''];
        }
        setSearchType(value);
    };

    const handleExportXLSX = () => {
        exportToXLSX({
            data: tableDataMapper(defaultColumns, tableData.result, {
                roleId: (value: any) => ACCOUNT_ROLES[value],
            }),
            configs: {
                title: '사용자관리',
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
        <div>
            <AccountModal />
            <div className={classes.accountTable}>
                <Grid
                    container
                    spacing={1}
                    alignItems="center"
                    style={{
                        padding: '16px 20px',
                    }}
                >
                    <Tooltip title={t('이용자 정보를 입력하여 조회할 수 있습니다.')}>
                        <Grid item xs={12} sm={3}>
                            <SearchInput placeholder="Search" onSearch={onSearch} />
                        </Grid>
                    </Tooltip>

                    <Tooltip title={t('등록일을 입력하여 조회할 수 있습니다.')}>
                        <Grid item xs={12} sm={3}>
                            <DateRangePicker onChange={onDateChange} />
                        </Grid>
                    </Tooltip>
                    <Grid item xs={12} sm={3}>
                        <Checkboxes
                            options={checkOptions}
                            onChange={onSelectChange}
                            defaultValue={defaultOptionValue}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3} className={classes.gridAlign}>
                        <Space size={12}>
                            <Tooltip title={t('사용자목록을 다운로드 할 수 있습니다.')}>
                                <div>
                                    <XlsxDownloadButton onClick={handleExportXLSX} />
                                </div>
                            </Tooltip>
                            <Tooltip title={t('사용자를 추가 할 수 있습니다.')}>
                                <div>
                                    <AddButton onClick={onAddButtonClick} />
                                </div>
                            </Tooltip>
                        </Space>
                    </Grid>
                </Grid>
                <DataTable
                    columns={
                        clientType === 'COMPANY_ADMIN_M'
                            ? [...defaultColumns, ...moreColumnsByAdminM]
                            : defaultColumns
                    }
                    data={tableData.result}
                    scroll={{ x: 1200, y: 'calc(100vh - 268px)' }}
                    style={{ height: 'calc(100vh - 222px)' }}
                // rowEventWithKey={(key) => history.push(`/device/detail/${key}`)}
                // 등급이 MASTER -> 삭제 버튼 disabled(className에 disabled 추가)
                />
                <DataTablePagination
                    total={tableData.pages && tableData.pages.totalItems}
                    defaultCurrent={page.pageNumber}
                    defaultPageSize={page.pageSize}
                    onChange={onPageChange}
                />
            </div>
        </div>
    );
}
