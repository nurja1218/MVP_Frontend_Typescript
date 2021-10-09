import { Dropdown, Menu, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSetRecoilState } from 'recoil';
import langAvailables from '@/configs/localization/lang-availables';
import { langState, isNeedReloadByLangState } from '@/recoil/atoms';
import { useStyles } from './style';

function LangMenu() {
    const { i18n, t } = useTranslation();
    const classes = useStyles();
    const setLang = useSetRecoilState(langState);
    const setIsNeedReloadByLang = useSetRecoilState(isNeedReloadByLangState);
    const handleChange = ({ key }) => {
        setLang(key);
        setIsNeedReloadByLang(true);
    };

    return (
        <Menu className={classes.langMenu} onClick={handleChange}>
            {langAvailables.map((m) => (
                // <Menu.Item key={m.value}>
                //     {m.name} {i18n.language === m.value && <CheckCircleTwoTone />}
                // </Menu.Item>
                <Menu.Item key={m.value}>
                    <div
                        className={
                            i18n.language === m.value ? classes.langSelect : classes.langList
                        }
                    >
                        <div>{i18n.language === m.value && <span />}</div>
                        {t(m.name)}
                    </div>
                </Menu.Item>
            ))}
        </Menu>
    );
}

export default function LangSelector() {
    const { i18n, t } = useTranslation();
    const classes = useStyles();
    return (
        <Tooltip title={t('언어 변경')} placement="left">
            <Dropdown overlay={<LangMenu />} trigger={['click']}>
                <a href="/#" onClick={(e) => e.preventDefault()} className={classes.langDropButton}>
                    <img src="/assets/common/language.svg" alt="" />
                    <span className={classes.currentLang}>{i18n.language}</span>
                    <img src="/assets/common/expand_more.svg" alt="" />
                </a>
            </Dropdown>
        </Tooltip>
    );
}
