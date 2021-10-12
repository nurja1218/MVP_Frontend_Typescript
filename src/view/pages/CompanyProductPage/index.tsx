import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSetRecoilState } from 'recoil';
import { currentMenuState } from '@/recoil/atoms';
import ProductTableContainer from '@/view/containers/ProductTableContainer';

export default function CompanyProductPage() {
    const { t } = useTranslation();
    const setCurrentMenu = useSetRecoilState(currentMenuState);
    useEffect(() => {
        setCurrentMenu([t('제품등록')]);
    }, [setCurrentMenu, t]);

    return (
        <div style={{ paddingTop: 15 }}>
            <div
                style={{
                    background: '#FFF',
                    border: `1px solid #d4d5d9`,
                    borderRadius: '5px',
                }}
            >
                {/* 상단바 / 테이블 / 페이지네이션 */}
                {/* 해당하는 내용에 상단바, 페이지네이션 등 모든 내용을 넣는다.
            테이블 내의 정보를 이용해야 하기 때문 */}
                <ProductTableContainer />
            </div>
        </div>
    );
}
