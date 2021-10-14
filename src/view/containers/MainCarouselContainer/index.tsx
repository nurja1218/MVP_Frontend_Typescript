import { useState, useEffect } from 'react';
import moment from 'moment';
import ProductProgressCard from '../../components/ProductProgressCard';
import ProductAddCard from '../../components/ProductProgressCard/ProductAddCard';
import { useQuery } from '@apollo/react-hooks';
import { TODAY_TRANSPORT_STATUS_COUNTS } from '../../../apollo/scripts/queries';
import { useStyles } from './style';
import { Link, useHistory } from 'react-router-dom';
import ProductModal from '../../components/Modal/ProductModal';
import dateRangeMapper from '../../../tools/mapper/date-range.mapper';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { productModalState } from '../../../recoil/atoms';
import { controlSearchState, needRefetchState } from '../../../recoil/atoms';
import HorizontalScroll from 'react-scroll-horizontal';
import { useTranslation } from 'react-i18next';

export default function MainCarouselContainer() {
    // const [moving, setMoving] = useState(0);
    const classes: any = useStyles();
    return (
        <div
            style={{ position: 'relative', marginLeft: 28 }}
            className={classes.mainCarouselContainer}
        >
            <MainCarousel state={0} />
        </div>
    );
}

function MoreViewButton() {
    const { t } = useTranslation();
    const classes: any = useStyles();
    return (
        <Link to="/product" className={classes.moreViewButton}>
            {t('더보기')}
        </Link>
    );
}

function MainCarousel({ state }: any) {
    const classes: any = useStyles();
    const history = useHistory();
    const setControlSearch: any = useSetRecoilState(controlSearchState);
    const setModal: any = useSetRecoilState(productModalState);
    const {
        data: todayTransportStatus,
        error: todayTransportStatusError,
        refetch,
    } = useQuery(TODAY_TRANSPORT_STATUS_COUNTS, {
        variables: {
            dateRange: dateRangeMapper(moment(), moment()),
        },
    });

    const [transportData, setTransportData] = useState<any>({
        result: [],
    });

    // Global Refetch by recoil state
    const [needRefetch, setNeedRefetch] = useRecoilState<any>(needRefetchState);
    useEffect(() => {
        if (needRefetch) {
            try {
                refetch();
            } catch (err) {
                console.log(err);
            } finally {
                setNeedRefetch(false);
            }
        }
    }, [needRefetch, setNeedRefetch, refetch]);

    useEffect(() => {
        if (todayTransportStatus) {
            const { transportStatusCounts } = todayTransportStatus;
            if (transportStatusCounts.length !== 0) {
                setTransportData({
                    result: transportStatusCounts
                        .map((ttsc: any) => ({
                            title: ttsc.productName,
                            departureProducts: ttsc.departureCount,
                            arrivalProducts: ttsc.arrivalCount,
                            abnormalAlarmProduct: ttsc.abnormalAlarmCount,
                        }))
                        .slice(0, 10),
                });
            }
        }
        if (todayTransportStatusError) {
            console.error(todayTransportStatusError);
        }
    }, [todayTransportStatus, todayTransportStatusError]);

    const onAddProductClick = (e: any) => {
        e.preventDefault();
        setModal({
            open: true,
            type: 'add',
        });
    };

    const onNavigateToControl = (e: any, productName: any) => {
        e.preventDefault();
        setControlSearch({
            active: true,
            text: productName,
        });
        history.push('/control');
    };

    return (
        <div className={classes.mainCarousel} style={{ position: 'relative' }}>
            <ProductModal />
            <HorizontalScroll className={classes.horizontalWrapper} reverseScroll={true}>
                <div />
                {transportData.result.length > 0 ? (
                    <>
                        {transportData.result.map((data: any, idx: any) => (
                            <div key={idx} className={classes.carouselItem}>
                                <a
                                    href="#search"
                                    onClick={(e) => onNavigateToControl(e, data.title)}
                                >
                                    <ProductProgressCard data={data} />
                                </a>
                            </div>
                        ))}
                        {new Array(10 - transportData.result.length).fill(0).map((_, idx) => (
                            <div className={classes.carouselItem} key={idx}>
                                <a href="#search" onClick={onAddProductClick}>
                                    <ProductAddCard />
                                </a>
                            </div>
                        ))}
                        <MoreViewButton />
                    </>
                ) : (
                    <>
                        {new Array(10).fill(0).map((_, idx) => (
                            <div className={classes.carouselItem} key={idx}>
                                <a href="#search" onClick={onAddProductClick}>
                                    <ProductAddCard />
                                </a>
                            </div>
                        ))}
                        <MoreViewButton />
                    </>
                )}
            </HorizontalScroll>
        </div>
    );
}
