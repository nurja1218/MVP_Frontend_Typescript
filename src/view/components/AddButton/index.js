import { assetsDir } from '../../../configs/variables';
import { useStyles } from './style';
import { useTranslation } from 'react-i18next';

export default function AddButton({ onClick }) {
    const classes = useStyles();
    const { t } = useTranslation();
    return (
        <button className={classes.addButton} onClick={onClick}>
            <img src={`${assetsDir.common}add_circle_light.png`} alt="추가 아이콘" />
            {t('추가')}
        </button>
    );
}
/**
 * 온클릭에 alert넣을 경우,
 * onClick={() => alert('click')}
 * 온클릭에 함수,
 * onClick={() => {}}
 */
