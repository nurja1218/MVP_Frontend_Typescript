import { useEffect } from 'react';
import { Button, Container, Grid } from '@material-ui/core';
import { Form, Input, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useStyles } from './style';
import { assetsDir } from '@/configs/variables';
import { useLazyQuery } from '@apollo/react-hooks';
import { LOGIN } from '@/apollo/scripts/queries';
import { loginHandler } from '@/recoil/selectors';
import { useSetRecoilState } from 'recoil';
// import { LOGIN } from '../../../apollo/scripts/queries';
// import { INVALID_ACCOUNT } from '@/apollo/clients/exceptions';
import { useApolloClient } from '@apollo/react-hooks';

export default function LoginPage() {
    const classes = useStyles();
    const client = useApolloClient();
    const { t } = useTranslation();
    const [form] = Form.useForm();
    // 페이지 랜더링이 아닌 submit에만 login 데이터 읽어오도록 useLazyQuery 사용
    const [login, { data, error }] = useLazyQuery(LOGIN);
    // 로그인을 한번 한 후의 동작할 handler
    // recoil selector.js에서 loginHandler
    // - get함수: 토큰으로 로그인 상태 정의 / - set함수: 첫 로그인 시 roleId로 등급 분류
    const setAfterLogin = useSetRecoilState(loginHandler);

    // 로그인 시도(= useLazyQuery) 후 동작할 effect
    useEffect(() => {
        if (data) {
            client.cache.reset().then(() => {
                setAfterLogin(data.login);
            });
        }
        if (error) {
            if (error.message.includes('PERMISSION')) {
                message.error(t('권한이 없는 계정입니다.'));
            } else {
                message.error(t('이메일 또는 비밀번호를 다시 확인하세요.'));
            }
        }
    }, [data, error, t, client.cache, setAfterLogin]);

    // submit으로 넘어오는 인자 값은 UserLoginInput과 동일하다
    const handleSubmit = (user) => {
        // user가 이미 UserLoginInput의 Form이므로 바로 login의 variables에 넣어준다
        login({
            variables: {
                user,
            },
        });
    };

    // 입력 안하고 로그인 시도 시
    const handleFail = ({ errorFields }) => {
        if (errorFields[0].name[0] === 'email') {
            message.error(t('이메일을 입력하세요.'));
            return;
        }
        if (errorFields[0].name[0] === 'password') {
            message.error(t('비밀번호를 입력하세요.'));
            return;
        }
    };

    return (
        <Container maxWidth="sm" className={classes.container}>
            <Form onFinish={handleSubmit} form={form} onFinishFailed={handleFail}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} align="center" className={classes.logoWrapper}>
                        <img src={`${assetsDir.logo}logo-black.svg`} alt="willog-logo" />
                    </Grid>
                    <Grid item xs={12}>
                        <Form.Item name="email" rules={[{ required: true }]} noStyle>
                            <Input size="large" placeholder={t('이메일')} />
                        </Form.Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Form.Item name="password" rules={[{ required: true }]} noStyle>
                            <Input.Password size="large" placeholder={t('비밀번호')} />
                        </Form.Item>
                    </Grid>
                    <Grid item xs={12} className={classes.buttonWrapper}>
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            size="large"
                            fullWidth
                            // disabled={loading}
                            className={classes.button}
                        >
                            {t('로그인')}
                        </Button>
                    </Grid>
                </Grid>
            </Form>
        </Container>
    );
}
