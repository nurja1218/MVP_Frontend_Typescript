import { AppBar, CssBaseline, Hidden, Toolbar } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useSetRecoilState } from 'recoil';
import { needRefetchState } from '@/recoil/atoms';
import AppToolbar from '../AppToolbar';
import SideDrawer from '../SideDrawer';
import { useStyles } from './style';
import { GlobalLoadingIndicator } from '@/apollo/clients/hybrid.client';
import { notificationFilter } from '../../../recoil/selectors';
import useWindowDimensions from './useWindowDimensions';
import { useTranslation } from 'react-i18next';

export default function Root(props) {
    const location = useLocation();
    const classes = useStyles();
    const { t } = useTranslation();
    // const [mobileOpen, setMobileOpen] = useRecoilState(mobileDrawerState);
    const setNeedRefetch = useSetRecoilState(needRefetchState);
    const filterAlarms = useSetRecoilState(notificationFilter);

    // const handleDrawerToggle = () => {
    //     setMobileOpen(!mobileOpen);
    // };

    // const container = window !== undefined ? () => window().document.body : undefined;

    useEffect(() => {
        setNeedRefetch(true);
        filterAlarms();
    }, [location, setNeedRefetch, filterAlarms]);

    // 햄버거 메뉴
    const [collapsed, setCollapsed] = useState(false);
    const onClick = (e) => setCollapsed(!collapsed);
    const DRAWER_WIDTH = collapsed === true ? 80 : 240;
    const DRAWER_MAIN_WIDTH = DRAWER_WIDTH + 40;
    // const onChange = (e) => {};
    // const sideDrawer = DRAWER_WIDTH === 80 && setCollapsed(true);

    // screenWidth < 1024px 일 때,
    const { width } = useWindowDimensions();
    useEffect(() => {
        if (width < 1024) {
            setCollapsed(true);
        }
    }, [width]);

    return (
        <>
            <div className={classes.root}>
                <CssBaseline />
                <Hidden xsDown implementation="css">
                    <AppBar
                        position="fixed"
                        className={classes.appBar}
                        style={{ width: `calc(100% - ${DRAWER_WIDTH}px)` }}
                    >
                        <Toolbar>
                            <AppToolbar />
                        </Toolbar>
                    </AppBar>
                </Hidden>

                <nav
                    className={classes.drawer}
                    style={{ width: `${DRAWER_WIDTH}px` }}
                    aria-label="menu"
                >
                    <button
                        onClick={onClick}
                        className="hamburgerMenu"
                        style={collapsed === true ? { display: 'block' } : {}}
                    >
                        <img
                            src={
                                collapsed === true
                                    ? '/assets/common/menu_open.svg'
                                    : '/assets/common/menu_fold.svg'
                            }
                            alt={collapsed === true ? t('사이드메뉴 접기') : t('사이드메뉴 펼치기')}
                            style={{ width: 24 }}
                        />
                    </button>
                    {/* 
                            여기에 버튼 생성해서 클릭하면 SideDrawer로 넘겨주기
                            inlineCollapsed = {collapsed} > collapsed 자체를 넘겨주기 > state로
                        */}

                    <SideDrawer state={collapsed} style={{ width: { DRAWER_WIDTH } }} />
                </nav>
                <main className={classes.content} style={{ paddingLeft: DRAWER_MAIN_WIDTH }}>
                    <Hidden smUp implementation="css">
                        <div className={classes.toolbar} />
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <div className={classes.toolbar} />
                    </Hidden>
                    <GlobalLoadingIndicator>{props.children}</GlobalLoadingIndicator>
                </main>
            </div>
        </>
    );
}

// function getWindowWidth() {
//     return window.innerWidth;
// }
