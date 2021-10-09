import { useTranslation } from 'react-i18next';
import { useStyles } from './style';
import { useHistory } from 'react-router-dom';

export default function AppToolbarMenuViewer({ menus }) {
    const classes = useStyles();
    const { t } = useTranslation();
    const history = useHistory();
    const handleGoBack = () => {
        history.goBack();
    };
    return (
        <span className={classes.currentMenu}>
            {menus &&
                menus.map((menu, idx) => {
                    if (idx < menus.length - 1) {
                        return (
                            <span key={`current-menu-${idx}`} className={classes.subMenuText}>
                                <button
                                    onClick={handleGoBack}
                                    type="text"
                                    className={classes.backButton}
                                >
                                    <img src="/assets/common/back.png" alt="이전 메뉴로 돌아가기" />
                                </button>
                                {t(menu)} /{' '}
                                {/* textEllipsis 넣을지 여부는 추후 결정 (제품명일 경우엔 없어도 될 듯) */}
                            </span>
                        );
                    }
                    return (
                        <span key={`current-menu-${idx}`} className={classes.lastMenuText}>
                            {t(menu)}
                        </span>
                    );
                })}
        </span>
    );
}
