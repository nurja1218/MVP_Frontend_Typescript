import { Grid } from '@material-ui/core';
import { Dropdown, message, Space } from 'antd';
import { useStyles } from './style';
import userMyMenu from './userMyMenu';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentMenuState, userState, settingModalState, notificationState } from '@/recoil/atoms';
import AppToolbarMenuViewer from './AppToolbarMenuViewer';
import { useEffect } from 'react';
import LangSelector from '@/view/components/LangSelector';
import Alarm from './Alarm';
import { logoutHandler } from '@/recoil/selectors';
import { useTranslation } from 'react-i18next';
import SettingModal from '../Modal/SettingModal';
import { useMutation } from '@apollo/react-hooks';
import { LOGOUT } from '@/apollo/scripts/mutations';

export default function AppToolbar() {
    const classes = useStyles();
    const { t } = useTranslation();
    const currentMenu = useRecoilValue(currentMenuState);
    const user = useRecoilValue(userState);
    const logout = useSetRecoilState(logoutHandler);
    const setModal = useSetRecoilState(settingModalState);
    const setNotifications = useSetRecoilState(notificationState);
    const [clearToken] = useMutation(LOGOUT);

    useEffect(() => {
        const currentTitle = currentMenu[currentMenu.length - 1];
        document.title = currentTitle ? `${currentTitle} - willog` : 'willog';
    }, [currentMenu]);

    const handleLogout = async (e) => {
        e.preventDefault();
        await clearToken();
        setNotifications([]);
        logout();
        message.success(t('로그아웃 되었습니다.'));
    };

    const handleSetting = (e) => {
        setModal({
            open: true,
            type: 'saved',
        });
    };

    return (
        <>
            <SettingModal />
            <Grid container>
                <Grid item xs={12} sm={4} className={classes.appToolBar}>
                    <AppToolbarMenuViewer menus={currentMenu} />
                </Grid>
                <Grid item xs={12} sm={8} align="right" style={{ paddingRight: 16 }}>
                    <Space size={36}>
                        <Alarm />
                        <LangSelector />
                        <Dropdown
                            overlay={() =>
                                userMyMenu({
                                    classes,
                                    handleLogout,
                                    handleSetting,
                                    t,
                                })
                            }
                            trigger={['click']}
                        >
                            <a href="/" onClick={(e) => e.preventDefault()}>
                                <span className={classes.userName}>{user && user.email}</span>

                                <img src="/assets/common/expand_more.svg" alt="설정 보기" />
                            </a>
                        </Dropdown>
                    </Space>
                </Grid>
            </Grid>
        </>
    );
}
