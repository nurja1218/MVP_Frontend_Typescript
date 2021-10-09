import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { accessTokenState, clientTypeState, langState } from './recoil/atoms';
import { loginHandler, logoutHandler } from './recoil/selectors';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { message } from 'antd';
import Root from './view/components/Root';
import { themeGen } from './configs/mui.global.style';
import { VERIFY_LOGIN } from './apollo/scripts/queries';

/**
 * UTC Timezone set
 */
import './configs/locale.utc';

/**
 * Apollo Client
 */
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import createClient from './apollo/clients/hybrid.client';

/**
 * Localization
 */
import './configs/localization/i18n';
import { useTranslation } from 'react-i18next';

/**
 * Routes
 */
import { RoutesForCompany, RoutesForGuest } from './routes';

export default function App() {
    const lang = useRecoilValue(langState);
    const clientType = useRecoilValue(clientTypeState);
    const accessToken = useRecoilValue(accessTokenState);
    const logout = useSetRecoilState(logoutHandler);
    const { i18n, t } = useTranslation();

    useEffect(() => {
        async function langSet() {
            await i18n.changeLanguage(lang);
            message.success(
                `${i18n.language === 'ko' ? '언어가 변경되었습니다.' : 'Language changed.'}`,
            );
        }
        if (lang && i18n.language !== lang) {
            langSet();
        }
    }, [i18n, lang, t]);

    return (
        <MuiThemeProvider theme={themeGen(clientType)}>
            <ApolloProvider client={createClient(clientType, accessToken, logout)}>
                <TokenLoader>
                    <Routers />
                </TokenLoader>
            </ApolloProvider>
        </MuiThemeProvider>
    );
}

function TokenLoader({ children }) {
    const [load, setLoad] = useState(false);
    const [tokenLoaded, setTokenLoaded] = useState(false);
    const { data: verifyData, error: verifyError } = useQuery(VERIFY_LOGIN);
    const setAfterLogin = useSetRecoilState(loginHandler);
    useEffect(() => {
        if (verifyData) {
            setAfterLogin(verifyData.verifyLogin);
            setTokenLoaded(true);
        }
        if (verifyError) {
            setTokenLoaded(true);
        }
    }, [verifyData, verifyError, setAfterLogin]);
    useEffect(() => {
        if (tokenLoaded) {
            setLoad(true);
        }
    }, [tokenLoaded]);

    return <>{load && children}</>;
}

function Routers() {
    const clientType = useRecoilValue(clientTypeState);
    return (
        <Router>
            <CssBaseline />
            {clientType === 'guest' && <RoutesForGuest />}
            {clientType === 'company' && (
                <Root>
                    <RoutesForCompany />
                </Root>
            )}
        </Router>
    );
}
