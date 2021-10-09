import { Menu } from 'antd';
// import { Link } from 'react-router-dom';

const userMyMenu = ({ classes, handleLogout, handleSetting, t }) => (
    <div className={classes.userMenuWrapper}>
        <Menu>
            <Menu.Item key="setting">
                <a href="#setting" onClick={handleSetting}>
                    {t('설정')}
                </a>
            </Menu.Item>
            <Menu.Item key="logout">
                <a href="#logout" onClick={handleLogout}>
                    {t('로그아웃')}
                </a>
            </Menu.Item>
        </Menu>
    </div>
);

export default userMyMenu;
