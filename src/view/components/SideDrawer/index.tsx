import { Link, useHistory } from 'react-router-dom';
import './style.css';
import { useStyles } from './style';
import HEADER_MENUS from '../../../configs/header.menu';
import { assetsDir } from '../../../configs/variables';
import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import { HAS_SUB_MENU } from '../../../configs/header.menu';
import { useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentMenuKey } from '../../../recoil/selectors';
import { mobileDrawerState } from '../../../recoil/atoms';
import { useTranslation } from 'react-i18next';
const { SubMenu } = Menu;

export default function SideDrawer({ state }: any) {
    const { t } = useTranslation();
    const classes: any = useStyles();
    const history = useHistory();
    const defaultKey = useRecoilValue(currentMenuKey);
    const [openKeys, setOpenKeys] = useState<any>([])

    const setMobileDrawerOpen = useSetRecoilState(mobileDrawerState);

    useEffect(() => {
        if (defaultKey && defaultKey.subOpen) {
            setOpenKeys([defaultKey.subOpen]);
        }
    }, [defaultKey]);

    const handleMenuSelect = useCallback(
        ({ key }) => {
            history.push(key);
            const isInSubmenu = key.split('/').length > 2;
            if (!isInSubmenu) {
                setOpenKeys([]);
            }
            if (window.innerWidth <= 600) {
                setMobileDrawerOpen(false);
            }
        },
        [history, setMobileDrawerOpen],
    );

    const handleSubMenuChange = useCallback(
        (keys) => {
            const latestOpenKey = keys.find((key: any) => openKeys.indexOf(key) === -1);
            if (HAS_SUB_MENU.indexOf(latestOpenKey) === -1) {
                setOpenKeys(keys);
            } else {
                setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
            }
        },
        [openKeys],
    );

    return (
        <div className={classes.sideDrawerWrapper}>
            <Link to="/main">
                <Menu
                    className={`${classes.menuList} ${classes.menuLogo}`}
                    mode="inline"
                    theme="dark"
                    selectedKeys={[defaultKey && defaultKey.key]}
                    onSelect={handleMenuSelect}
                    openKeys={openKeys}
                    onOpenChange={handleSubMenuChange}
                    inlineCollapsed={state}
                >
                    <Menu.Item
                        className={`${classes.drawerLogo}`}
                        icon={
                            <img
                                src="/assets/logo/symbol_primary.svg"
                                alt="willog"
                                className={state === true ? `small` : `large`}
                                style={{ marginRight: 8.15 }}
                            />
                        }
                    >
                        {state === true ? null : (
                            <img src="/assets/logo/wordmark_black.svg" alt="" />
                        )}
                    </Menu.Item>
                </Menu>
            </Link>
            <Menu
                className={classes.menuList}
                mode="inline"
                theme="dark"
                selectedKeys={[defaultKey && defaultKey.key]}
                onSelect={handleMenuSelect}
                openKeys={openKeys}
                onOpenChange={handleSubMenuChange}
                inlineCollapsed={state}
            >
                {HEADER_MENUS.map((m: any) => {
                    if (m.submenu) {
                        return (
                            <SubMenu
                                className={classes.drawerSubItem}
                                key={m.link}
                                title={<span className={classes.drawerSubText}>{t(m.name)}</span>}
                            >
                                {m.submenu.map((sub: any) => (
                                    <Menu.Item
                                        key={sub.link}
                                        icon={
                                            <img
                                                className={classes.drawerIcon}
                                                src={`${assetsDir.menuIcons}${m.icon}`}
                                                alt={t(m.name)}
                                            />
                                        }
                                    >
                                        {t(sub.name)}
                                    </Menu.Item>
                                ))}
                            </SubMenu>
                        );
                    } else {
                        return (
                            <Menu.Item
                                className={classes.drawerItem}
                                key={m.link}
                                icon={
                                    <img
                                        className={classes.drawerIcon}
                                        src={`${assetsDir.menuIcons}${m.icon}`}
                                        alt={t(m.name)}
                                    />
                                }
                            >
                                {/* <span className={classes.drawerText}>{t(m.name)}</span> */}
                                {t(m.name)}
                            </Menu.Item>
                        );
                    }
                })}
            </Menu>
        </div>
    );
}
