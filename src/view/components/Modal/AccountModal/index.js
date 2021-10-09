import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogActions, DialogContent, Grid } from '@material-ui/core';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useStyles } from '../style';
import { Form, Input, Select, message } from 'antd';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { useTranslation } from 'react-i18next';
import Transition from '../Transition';
import SubmitButton from '../../SubmitButton';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { CREATE_ACCOUNT, MODIFY_USER } from '../../../../apollo/scripts/mutations';
import { ACCOUNT_ROLES } from '../../../../configs/enum';
import { accountModalState, userState, needRefetchState } from '../../../../recoil/atoms';
import { USER_DETAIL } from '@/apollo/scripts/queries';
import { colors } from '../../../../configs/variables';

const { Option } = Select;

export default function AccountModal({ status }) {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const { roleId: clientType } = useRecoilValue(userState);
    const [user, setUser] = useState(null);
    const [createAccount] = useMutation(CREATE_ACCOUNT);
    const [modifyAccount] = useMutation(MODIFY_USER);
    const [modal, setModal] = useRecoilState(accountModalState);
    const classes = useStyles();
    const roles = Object.keys(ACCOUNT_ROLES);
    const setNeedRefetch = useSetRecoilState(needRefetchState);
    // 추후 "수정" 시 사용
    // const [roles, setRoles] = useState([]);

    const { data: userDetailData, error: userDetailError } = useQuery(USER_DETAIL, {
        variables: {
            id: modal.accountId,
        },
        skip: modal.type !== 'modify' || !modal.accountId,
        fetchPolicy: 'network-only',
    });

    useEffect(() => {
        if (userDetailData) {
            if (modal.type === 'modify') {
                // query명과 동일한 변수에 query 데이터를 담는다
                const { userDetail } = userDetailData;
                setUser(userDetail);
            }
        }
        if (userDetailError) {
            console.log(userDetailError.message);
            // console.error(productDetailError);
        }
    }, [userDetailData, userDetailError, modal.type]);

    useEffect(() => {
        if (modal.type === 'add') {
            setUser(null);
            form.resetFields();
        }
    }, [modal.type, form]);

    useEffect(() => {
        if (user) {
            form.setFieldsValue(user);
        }
    }, [user, form]);

    const handleSubmit = (formContent) => {
        const { name, roleId, phone, email } = formContent;
        setUser({
            ...user,
            ...formContent,
        });
        if (modal.type === 'add') {
            createAccount({
                variables: {
                    user: {
                        name,
                        phone,
                        email,
                        roleId,
                    },
                },
            })
                .then(({ data }) => {
                    message.success(t('사용자가 추가되었습니다.'));
                    handleClose();
                    setNeedRefetch(true);
                })
                .catch((err) => {
                    console.log(err.message);
                    if (err.message.includes('already a user with email')) {
                        message.error(t('사용중인 이메일입니다.'));
                    }
                });
        } else if (modal.type === 'modify') {
            modifyAccount({
                variables: {
                    user: {
                        phone,
                    },
                    id: modal.accountId,
                },
            })
                .then(({ data }) => {
                    message.success(t('사용자 정보가 변경되었습니다.'));
                    handleClose();
                    setNeedRefetch(true);
                })
                .catch((err) => {
                    console.log(`error: ${err.message}`);
                });
        }
    };

    const handleClose = () => {
        form.resetFields();
        setModal({ open: false, type: 'modify', accountId: null });
        setUser(null);
    };

    return (
        <Dialog
            onClose={handleClose}
            open={modal.open || false}
            TransitionComponent={Transition}
            keepMounted
            maxWidth="md" // sm / lg / md
            aria-labelledby="confirmation-dialog-title"
        >
            <DialogTitle id="confirmation-dialog-title" style={{ padding: '0' }}>
                <Grid
                    container
                    className={classes.header}
                    style={{
                        position: 'sticky',
                        top: '0',
                    }}
                >
                    <Grid item xs={12} sm={10}>
                        <span>
                            {modal.type === 'add' && t(`회원정보 등록`)}
                            {modal.type === 'add' && (
                                <span className={classes.formItemHeaderEssential}>
                                    &#42; {t('필수 입력')}
                                </span>
                            )}

                            {modal.type === 'modify' && t('회원정보 변경')}
                        </span>
                    </Grid>
                    <Grid item xs={12} sm={2} align="right">
                        <CloseOutlinedIcon className={classes.iconButton} onClick={handleClose} />
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent
                className={`${classes.wrapper} account`}
                style={{ position: 'relative' }}
            >
                {(modal.type === 'add' || (modal.type === 'modify' && user)) && (
                    <Form onFinish={handleSubmit} form={form}>
                        {/* Form 컨테이너 */}
                        <Grid container>
                            {/* 이름 */}
                            <Grid container className={classes.formWrapper}>
                                <Grid item xs={12} sm={3}>
                                    <span
                                        className={`${classes.formItemTitle} ${classes.formItemEssential}`}
                                    >
                                        {t('이름')}
                                    </span>
                                </Grid>
                                <Grid item xs={12} sm={9}>
                                    <Form.Item
                                        name="name"
                                        rules={[
                                            { required: true, message: t('이름을 입력해주세요.') },
                                        ]}
                                        initialValue={user && user.name}
                                    >
                                        <Input
                                            placeholder={t('이름을 입력해주세요.')}
                                            disabled={modal.type === 'modify' ? true : false}
                                        />
                                    </Form.Item>
                                </Grid>
                            </Grid>

                            {/* 등급 */}
                            <Grid container>
                                <Grid container className={classes.formWrapper}>
                                    <Grid item xs={12} sm={3}>
                                        <span
                                            className={`${classes.formItemTitle} ${classes.formItemEssential}`}
                                        >
                                            {t('등급')}
                                        </span>
                                    </Grid>
                                    <Grid item xs={12} sm={9}>
                                        <Form.Item
                                            name="roleId"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: t('등급을 선택해주세요.'),
                                                },
                                            ]}
                                            initialValue={user && user.roleId}
                                        >
                                            <Select
                                                disabled={modal.type === 'modify' ? true : false}
                                                showSearch
                                                placeholder={t('등급을 선택해주세요.')}
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    option.children
                                                        .toLowerCase()
                                                        .indexOf(input.toLowerCase()) >= 0
                                                }
                                            >
                                                {roles.map((roleId, idx) =>
                                                    clientType === 'COMPANY_ADMIN_M' ? (
                                                        <Option value={roleId} key={`role-${idx}`}>
                                                            {t(ACCOUNT_ROLES[roleId])}
                                                        </Option>
                                                    ) : roleId === 'COMPANY_ADMIN_M' ? (
                                                        ''
                                                    ) : (
                                                        <Option value={roleId} key={`role-${idx}`}>
                                                            {t(ACCOUNT_ROLES[roleId])}
                                                        </Option>
                                                    ),
                                                )}
                                            </Select>
                                        </Form.Item>
                                    </Grid>
                                </Grid>
                            </Grid>

                            {/* 연락처 */}
                            <Grid container className={classes.formWrapper}>
                                <Grid item xs={12} sm={3}>
                                    <span
                                        className={`${classes.formItemTitle} ${classes.formItemEssential}`}
                                    >
                                        {t('연락처')}
                                    </span>
                                </Grid>
                                <Grid item xs={12} sm={9}>
                                    <Form.Item
                                        name="phone"
                                        rules={[
                                            {
                                                required: true,
                                                message: t('연락처를 입력해주세요.'),
                                            },
                                        ]}
                                        initialValue={user && user.phone}
                                    >
                                        <Input
                                            placeholder={'+82 10-1234-5678'}
                                            disabled={
                                                modal.type === 'modify'
                                                    ? clientType === 'COMPANY_ADMIN_M'
                                                        ? false
                                                        : true
                                                    : false
                                            }
                                            maxLength={20}
                                        />
                                    </Form.Item>
                                </Grid>
                            </Grid>

                            {/* 이메일 */}
                            <Grid container className={classes.formWrapper}>
                                <Grid item xs={12} sm={3}>
                                    <span
                                        className={`${classes.formItemTitle} ${classes.formItemEssential}`}
                                    >
                                        {t('이메일')}
                                    </span>
                                </Grid>
                                <Grid item xs={12} sm={9}>
                                    <Form.Item
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                type: 'email',
                                                message: t('이메일을 입력해주세요.'),
                                            },
                                        ]}
                                        initialValue={user && user.email}
                                    >
                                        <Input
                                            placeholder={t('이메일을 입력해주세요.')}
                                            disabled={modal.type === 'modify' ? true : false}
                                        />
                                    </Form.Item>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </DialogContent>
            <DialogActions
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    borderTop: `1px solid ${colors.BORDER_GREY}`,
                    padding: 24,
                }}
            >
                <SubmitButton onClick={() => form.submit()}>
                    {modal.type === 'add' && t('등록')}
                    {modal.type === 'modify' && t('변경')}
                </SubmitButton>
            </DialogActions>
        </Dialog>
    );
}
