import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogActions, DialogContent, Grid } from '@material-ui/core';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { useStyles } from '../style';
import { useTranslation } from 'react-i18next';
import { Form, Input, Tabs, message } from 'antd';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import Transition from '../Transition';
import SubmitButton from '../../SubmitButton';
import { needRefetchState, settingModalState, userState } from '../../../../recoil/atoms';
import { CURRENT_USER_DETAIL } from '@/apollo/scripts/queries';
import { MODIFY_USER_AND_COMPANY, CHANGE_PASSWORD } from '../../../../apollo/scripts/mutations';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { logoutHandler } from '@/recoil/selectors';
import { colors } from '../../../../configs/variables';
// import { ConsoleSqlOutlined } from '@ant-design/icons';

// const { Option } = Select;

export default function SettingModal({ status }) {
    const [form] = Form.useForm();
    const { roleId: clientType } = useRecoilValue(userState);
    const TabPane = Tabs.TabPane;
    const { t } = useTranslation();
    const [tabStatus, setTabStatus] = useState('userInfo');
    const [modifyAccountSelf] = useMutation(MODIFY_USER_AND_COMPANY);
    const [changePassword] = useMutation(CHANGE_PASSWORD);
    const [currentUser, setCurrentUser] = useState(null);
    const [modal, setModal] = useRecoilState(settingModalState);
    const logout = useSetRecoilState(logoutHandler);
    const classes = useStyles();

    const setNeedRefetch = useSetRecoilState(needRefetchState);

    const { data: currentUserData, error: currentUserError } = useQuery(CURRENT_USER_DETAIL, {
        fetchPolicy: 'network-only',
    });

    useEffect(() => {
        if (currentUserData) {
            if (modal.type === 'saved') {
                // query명과 동일한 변수에 query 데이터를 담는다
                const { userDetail } = currentUserData;
                setCurrentUser(userDetail);
            }
        }
        if (currentUserError) {
            console.log(currentUserError.message);
            // console.error(productDetailError);
        }
    }, [currentUserData, currentUserError, modal.type]);

    const handleSubmit = (formContent) => {
        if (tabStatus === 'userInfo') {
            const { role, companyName, address, phone } = formContent;
            setCurrentUser({
                ...currentUser,
                phone,
                companyName,
                address,
            });
            if (role === '관리자M') {
                modifyAccountSelf({
                    variables: {
                        company: {
                            name: companyName,
                            address,
                        },
                        user: {
                            phone,
                        },
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
        } else if (tabStatus === 'password') {
            const { currentPassword, newPassword, newPasswordConfirm } = formContent;
            if (newPassword !== newPasswordConfirm) {
                message.error(t('새 비밀번호와 비밀번호 확인이 일치하지 않습니다.'));
                return;
            }
            if (currentPassword === newPassword) {
                message.error(t('새 비밀번호와 현재 비밀번호가 동일합니다.'));
                return;
            }
            changePassword({
                variables: {
                    passwords: {
                        currentPassword,
                        newPassword,
                    },
                },
            })
                .then(({ data }) => {
                    if (data.changePassword) {
                        message.success(
                            t('비밀번호가 변경되었습니다. 개인정보를 위해 다시 로그인해주세요.'),
                        );
                        handleClose();
                        logout();
                    }
                })
                .catch((err) => {
                    if (err.message.includes('PASSWORD_INCORRECT')) {
                        message.error(t('현재 비밀번호를 다시 입력해주세요.'));
                        return;
                    }
                    message.error(t('비밀번호 변경 중 문제가 발생했습니다.'));
                });
        }
    };

    const handleClose = () => {
        form.resetFields();
        setModal({ open: false, type: 'saved', accountId: null });
        // setCurrentUser(null);
    };
    const handleChange = (key) => {
        setTabStatus(key);
    };

    return (
        <Dialog
            onClose={handleClose}
            open={modal.open || false}
            TransitionComponent={Transition}
            keepMounted
            maxWidth="md"
            aria-labelledby="confirmation-dialog-title"
            className={classes.settingModal}
        >
            <DialogTitle id="confirmation-dialog-title" style={{ padding: '0' }}>
                <Grid
                    container
                    className={`${classes.header} setting`}
                    style={{
                        position: 'sticky',
                        top: '0',
                    }}
                >
                    <Grid item xs={12} sm={10}>
                        <span>{t('설정')}</span>
                    </Grid>
                    <Grid item xs={12} sm={2} align="right">
                        <CloseOutlinedIcon className={classes.iconButton} onClick={handleClose} />
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent className={`${classes.wrapper} setting`} style={{ overflow: 'hidden' }}>
                {modal.type === 'saved' && currentUser && (
                    <Tabs
                        defaultActiveKey="userInfo"
                        type="card"
                        size="large"
                        onChange={handleChange}
                    >
                        <TabPane tab={t('회원 정보 수정')} key="userInfo">
                            {tabStatus === 'userInfo' && (
                                <Form
                                    form={form}
                                    onFinish={handleSubmit}
                                    className={classes.tabContent}
                                >
                                    <Grid container>
                                        <Grid container className={classes.formWrapper}>
                                            <Grid item xs={12} sm={3}>
                                                <span className={classes.formItemTitle}>
                                                    {t('이름')}
                                                </span>
                                            </Grid>
                                            <Grid item xs={12} sm={9}>
                                                <Form.Item
                                                    name="name"
                                                    initialValue={currentUser && currentUser.name}
                                                >
                                                    <Input
                                                        placeholder={t('윌로그바이오')}
                                                        disabled
                                                    />
                                                </Form.Item>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid container className={classes.formWrapper}>
                                                <Grid item xs={12} sm={3}>
                                                    <span className={classes.formItemTitle}>
                                                        {t('등급')}
                                                    </span>
                                                </Grid>
                                                <Grid item xs={12} sm={9}>
                                                    <Form.Item
                                                        name="role"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: t('등급을 선택해주세요.'),
                                                            },
                                                        ]}
                                                        initialValue={
                                                            currentUser && currentUser.roleName
                                                        }
                                                    >
                                                        <Input placeholder={t('관리자')} disabled />
                                                    </Form.Item>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid container className={classes.formWrapper}>
                                            <Grid item xs={12} sm={3}>
                                                <span className={classes.formItemTitle}>
                                                    {t('이메일')}
                                                </span>
                                            </Grid>
                                            <Grid item xs={12} sm={9}>
                                                <Form.Item
                                                    name="email"
                                                    initialValue={currentUser && currentUser.email}
                                                >
                                                    <Input
                                                        placeholder={'willogbio@willog.io'}
                                                        disabled
                                                    />
                                                </Form.Item>
                                            </Grid>
                                        </Grid>
                                        <Grid container className={classes.formWrapper}>
                                            <Grid item xs={12} sm={3}>
                                                <span className={classes.formItemTitle}>
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
                                                    initialValue={currentUser && currentUser.phone}
                                                >
                                                    <Input
                                                        placeholder={t('연락처 입력')}
                                                        disabled={
                                                            currentUser &&
                                                            currentUser.roleId === 'COMPANY_ADMIN_M'
                                                                ? false
                                                                : true
                                                        }
                                                    />
                                                </Form.Item>
                                            </Grid>
                                        </Grid>

                                        <Grid
                                            container
                                            className={classes.formGrey}
                                            style={{ marginTop: '40px', padding: '20px 0' }}
                                        >
                                            <Grid container className={classes.formWrapper}>
                                                <Grid item xs={12} sm={3}>
                                                    <span className={classes.formItemTitle}>
                                                        {t('회사명')}
                                                    </span>
                                                </Grid>
                                                <Grid item xs={12} sm={9}>
                                                    <Form.Item
                                                        name="companyName"
                                                        initialValue={
                                                            currentUser && currentUser.companyName
                                                        }
                                                    >
                                                        <Input
                                                            placeholder={t('회사명 입력')}
                                                            disabled={
                                                                clientType === 'COMPANY_ADMIN_M'
                                                                    ? false
                                                                    : true
                                                            }
                                                        />
                                                    </Form.Item>
                                                </Grid>
                                            </Grid>
                                            <Grid container className={classes.formWrapper}>
                                                <Grid item xs={12} sm={3}>
                                                    <span className={classes.formItemTitle}>
                                                        {t('주소')}
                                                    </span>
                                                </Grid>
                                                <Grid item xs={12} sm={9}>
                                                    <Form.Item
                                                        name="address"
                                                        initialValue={
                                                            currentUser && currentUser.address
                                                        }
                                                    >
                                                        <Input
                                                            placeholder={t('주소 입력')}
                                                            disabled={
                                                                clientType === 'COMPANY_ADMIN_M'
                                                                    ? false
                                                                    : true
                                                            }
                                                        />
                                                    </Form.Item>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Form>
                            )}
                        </TabPane>
                        <TabPane tab={t('비밀번호 변경')} key="password">
                            {tabStatus === 'password' && (
                                <Form form={form} onFinish={handleSubmit}>
                                    <Grid container>
                                        <Grid container className={classes.formWrapper}>
                                            <Grid item xs={12} sm={3}>
                                                <span className={classes.formItemTitle}>
                                                    {t('현재 비밀번호')}
                                                </span>
                                            </Grid>
                                            <Grid item xs={12} sm={9}>
                                                <Form.Item
                                                    name="currentPassword"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: t('현재 비밀번호 입력'),
                                                        },
                                                    ]}
                                                >
                                                    <Input.Password
                                                        placeholder={t('현재 비밀번호 입력')}
                                                    />
                                                </Form.Item>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid container className={classes.formWrapper}>
                                                <Grid item xs={12} sm={3}>
                                                    <span className={classes.formItemTitle}>
                                                        {t('새 비밀번호')}
                                                    </span>
                                                </Grid>
                                                <Grid item xs={12} sm={9}>
                                                    <Form.Item
                                                        name="newPassword"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: t('새 비밀번호 입력'),
                                                            },
                                                        ]}
                                                    >
                                                        <Input.Password
                                                            placeholder={t('새 비밀번호')}
                                                        />
                                                    </Form.Item>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid container className={classes.formWrapper}>
                                            <Grid item xs={12} sm={3}>
                                                <span className={classes.formItemTitle}>
                                                    {t('새 비밀번호 확인')}
                                                </span>
                                            </Grid>
                                            <Grid item xs={12} sm={9}>
                                                <Form.Item
                                                    name="newPasswordConfirm"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: t('새 비밀번호 확인'),
                                                        },
                                                    ]}
                                                >
                                                    <Input.Password
                                                        placeholder={t('새 비밀번호 확인')}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message:
                                                                    t(
                                                                        '새 비밀번호와 일치하지 않습니다.',
                                                                    ),
                                                            },
                                                        ]}
                                                        // iconRender={(visible) =>
                                                        //     visible ? (
                                                        //         <img src="/assets/common/eye1.svg" alt="" />
                                                        //     ) : (
                                                        //         <img
                                                        //             src="/assets/common/icon_master.svg"
                                                        //             alt=""
                                                        //         />
                                                        //     )
                                                        // }
                                                    />
                                                </Form.Item>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Form>
                            )}
                        </TabPane>
                    </Tabs>
                )}
            </DialogContent>
            <DialogActions
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    borderTop: `1px solid ${colors.BORDER_GREY}`,
                    padding: '24px',
                }}
            >
                <SubmitButton
                    onClick={() => form.submit()}
                    disabled={tabStatus === 'userInfo' && clientType !== 'COMPANY_ADMIN_M'}
                >
                    {modal.type === 'saved' && t('저장')}
                </SubmitButton>
            </DialogActions>
        </Dialog>
    );
}
