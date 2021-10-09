import { useStyles } from '../style';
import { useTranslation } from 'react-i18next';

export default function ProductAddCard() {
    const classes = useStyles();
    const { t } = useTranslation();
    return (
        <div className={classes.productAddCard}>
            <img src="/assets/common/card_add_product.svg" alt="" />
            <h2>
                {t('제품')} <br />
                {t('추가하기')}
            </h2>
        </div>
    );
}
