import React, { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogTitle, DialogActions, DialogContent, Grid } from '@material-ui/core';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useStyles } from '../style';
import { Form, Input, InputNumber, Space, message } from 'antd';
// import { useTranslation } from 'react-i18next';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import Transition from '../Transition';
// import moment from 'moment';
import { productModalState } from '../../../../recoil/atoms';
import SubmitButton from '../../SubmitButton';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { CREATE_PRODUCT } from '../../../../apollo/scripts/mutations';
import { MODIFY_PRODUCT } from '../../../../apollo/scripts/mutations';
import { GET_PRODUCT } from '../../../../apollo/scripts/queries';
import { colors } from '../../../../configs/variables';
import { needRefetchState } from '../../../../recoil/atoms';

/**
 * 문제
 * 1. 시리얼 범위 지정값 2개가 남은 경우 '-' 클릭시 '+' 기능
 * 2. 시리얼 단일등록 인풋개수와 범위등록의 인풋개수가 동일하게만 유지
 */

/**
 * form.item에는 name이 필수적
 * form.item 하나에는 input 하나만
 * grid container에는 xs, sm 값 금지
 */

// 모달 내 추가, 삭제 버튼
function SerialNoAddButton({ onClick }: any) {
    const classes = useStyles();
    return (
        <span className={classes.serialNoButton} onClick={onClick}>
            <img src="/assets/common/plus.svg" alt="" style={{ width: '12px' }} />
        </span>
    );
}
function SerialNoDeleteButton({ onClick }: any) {
    const classes = useStyles();
    return (
        <span className={classes.serialNoButton} onClick={onClick}>
            <img src="/assets/common/minus.svg" alt="" style={{ width: '12px' }} />
        </span>
    );
}

function* _keygen_for_serial() {
    let key = 2;
    while (true) {
        yield key++;
    }
}
function* _keygen_for_range() {
    let key = 2;
    while (true) {
        yield key++;
    }
}
const keygen = _keygen_for_serial();
const keygen2 = _keygen_for_range();

const defaultDataRange = {
    minTemperature: null,
    maxTemperature: null,
    minHumidity: null,
    maxHumidity: null,
    maxShock: null,
};

const defaultIsRangeAbnormal = {
    temperature: false,
    humidity: false,
};

export default function ProductModal() {
    const { t, i18n } = useTranslation();
    const [form] = Form.useForm();
    const [createProduct] = useMutation(CREATE_PRODUCT);
    const [modifyProduct] = useMutation(MODIFY_PRODUCT);
    const [modal, setModal] = useRecoilState<any>(productModalState);
    const [product, setProduct] = useState<any>(null);
    const [dataRange, setDataRange] = useState<any>(defaultDataRange);
    const [isRangeAbnormal, setIsRangeAbnormal] = useState<any>(defaultIsRangeAbnormal);
    const classes: any = useStyles();

    const setNeedRefetch = useSetRecoilState(needRefetchState);

    // 제품 데이터 query로 일어올 때 인자는 page, search
    const { data: productDetailData, error: productDetailError } = useQuery(GET_PRODUCT, {
        variables: {
            id: modal.productId,
        },
        skip: modal.type !== 'modify' || !modal.productId,
        fetchPolicy: 'network-only',
    });

    useEffect(() => {
        if (productDetailData) {
            // query명과 동일한 변수에 query 데이터를 담는다
            const { getProduct } = productDetailData;
            setProduct(getProduct);
        }
        if (productDetailError) {
            console.log(productDetailError.message);
            // console.error(productDetailError);
        }
    }, [productDetailData, productDetailError, product]);

    useEffect(() => {
        setProduct(null);
        form.resetFields();
    }, [form, modal.type]);

    useEffect(() => {
        if (product) {
            form.setFieldsValue(product);
        }
    }, [product, form]);

    const handleSubmit = (formContent: any) => {
        const {
            name,
            placeName,
            minTemperature,
            maxTemperature,
            minHumidity,
            maxHumidity,
            maxShock,
        } = formContent;

        // 값을 입력하지 않아도 0으로 저장되는 현상을 방지
        setProduct({
            ...product,
            ...formContent,
        });

        const deviceSerials: any = [];
        let rangeSerialsFrom: any = null;
        for (const key in formContent) {
            const value = formContent[key];
            if (key.includes('serial')) {
                +value > 0 && deviceSerials.push(+value);
            } else if (key.includes('range-min')) {
                rangeSerialsFrom = +value;
            } else if (key.includes('range-max')) {
                const rangeSerialsTo = +value;
                if (+rangeSerialsFrom > 0 && +rangeSerialsTo > 0)
                    for (let i = rangeSerialsFrom; i <= rangeSerialsTo; i++) {
                        deviceSerials.push(String(i));
                    }
            }
        }

        if (modal.type === 'add') {
            if (deviceSerials.length === 0) {
                message.error(t('S/N를 입력하세요.'));
                return;
            }
            createProduct({
                variables: {
                    product: {
                        name,
                        placeName,
                        minTemperature:
                            minTemperature === '' || minTemperature === null
                                ? null
                                : +minTemperature,
                        maxTemperature:
                            maxTemperature === '' || maxTemperature === null
                                ? null
                                : +maxTemperature,
                        minHumidity:
                            minHumidity === '' || minHumidity === null ? null : +minHumidity,
                        maxHumidity:
                            maxHumidity === '' || maxHumidity === null ? null : +maxHumidity,
                        maxShock: maxShock === '' || maxShock === null ? null : +maxShock,
                        // deviceSerials: [...new Set(deviceSerials)], 
                        // typescript에선 구조분해할당에 set이 해당이 안되므로 대체 방안이 필요 - set을 문자열로 형변환
                        deviceSerials: [...Array.from(new Set(deviceSerials))],
                    },
                },
            })
                .then(({ data }) => {
                    const { createProduct: result } = data;
                    if (result.success) {
                        message.success(t('제품이 등록되었습니다.'));
                        handleClose();
                        form.resetFields();
                        setNeedRefetch(true);
                    } else {
                        const { failedSerials } = result;
                        message.error(
                            i18n.language === 'ko'
                                ? `사용중인 S/N:${failedSerials.map(
                                      (s: any) => ` ${s}`,
                                  )}이 포함되어 있습니다. 다시 확인하세요.`
                                : i18n.language === 'en'
                                ? `S/N ${failedSerials.map(
                                      (s: any) => ` ${s}`,
                                  )} in use. Please try again`
                                : '',
                        );
                    }
                })
                .catch((err) => {
                    console.log(err.message);
                    if (err.message.includes('empty device serials')) {
                        message.error(t('S/N를 입력하세요.'));
                    }
                });
        } else if (modal.type === 'modify') {
            modifyProduct({
                variables: {
                    product: {
                        name,
                        placeName,
                        minTemperature:
                            minTemperature === '' || minTemperature === null
                                ? null
                                : +minTemperature,
                        maxTemperature:
                            maxTemperature === '' || maxTemperature === null
                                ? null
                                : +maxTemperature,
                        minHumidity:
                            minHumidity === '' || minHumidity === null ? null : +minHumidity,
                        maxHumidity:
                            maxHumidity === '' || maxHumidity === null ? null : +maxHumidity,
                        maxShock: maxShock === '' || maxShock === null ? null : +maxShock,
                    },
                    id: modal.productId,
                },
            })
                .then(({ data }) => {
                    const { modifyProduct } = data;
                    if (modifyProduct === modal.productId) {
                        message.success(t('제품이 수정되었습니다.'));
                        handleClose();
                        setNeedRefetch(true);
                        // form.resetFields();
                    }
                })
                .catch((err) => {
                    console.log(`error: ${err.message}`);
                });
        }
    };

    useEffect(() => {
        if (modal.type === 'modify') {
            if (product) {
                setDataRange({
                    minTemperature: product.minTemperature,
                    maxTemperature: product.maxTemperature,
                    minHumidity: product.minHumidity,
                    maxHumidity: product.maxHumidity,
                    maxShock: product.maxShock,
                });
            }
        } else {
            setDataRange(defaultDataRange);
            setIsRangeAbnormal(defaultIsRangeAbnormal);
        }
    }, [modal.type, product]);

    const handleClose = () => {
        setDataRange(defaultDataRange);
        setIsRangeAbnormal(defaultIsRangeAbnormal);
        setProduct(null);
        form.resetFields();
        setModal({ open: false, type: 'modify', productId: null });
    };

    // 시리얼번호 추가
    const [serialList, setSerialList] = useState<any>([
        {
            key: 0,
        },
    ]);
    const [serialRangeList, setSerialRangeList] = useState<any>([
        {
            key: 0,
        },
    ]);
    // 삭제버튼 클릭한 경우
    const handleRemoveClick = (key: any) => {
        const newList = serialList.filter((item: any) => item.key !== key);
        setSerialList(newList);
    };
    const handleRangeRemoveClick = (key: any) => {
        const newList = serialRangeList.filter((item: any) => item.key !== key);
        setSerialRangeList(newList);
    };
    // 추가버튼 클릭한 경우
    const handleAddClick = () => {
        const { value: key } = keygen.next();
        setSerialList([...serialList, { key }]);
    };
    const handleRangeAddClick = () => {
        const { value: key } = keygen2.next();
        setSerialRangeList([...serialRangeList, { key }]);
    };

    const onChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            setDataRange({
                ...dataRange,
                [name]: value,
            });
        },
        [dataRange],
    );

    useEffect(() => {
        setIsRangeAbnormal({
            temperature:
                (dataRange.minTemperature &&
                    dataRange.maxTemperature &&
                    +dataRange.minTemperature > +dataRange.maxTemperature) ||
                false,
            humidity:
                (dataRange.minHumidity &&
                    dataRange.maxHumidity &&
                    +dataRange.minHumidity > +dataRange.maxHumidity) ||
                false,
        });
    }, [dataRange]);

    return (
        <Dialog
            onClose={handleClose}
            open={modal.open || false}
            TransitionComponent={Transition}
            keepMounted
            maxWidth="md" // sm / lg / md
            aria-labelledby="confirmation-dialog-title"
        >
            <DialogTitle id="confirmation-dialog-title" style={{ padding: '0' }}>
                <Grid
                    container
                    className={classes.header}
                    style={{
                        position: 'sticky',
                        top: '0',
                    }}
                >
                    <Grid item xs={12} sm={10}>
                        <span>
                            {modal.type === 'add' && t(`제품 신규 등록`)}
                            {modal.type === 'add' && (
                                <span className={classes.formItemHeaderEssential}>
                                    &#42; {t('필수 입력')}
                                </span>
                            )}

                            {modal.type === 'modify' && t('제품 정보 변경')}
                            {/* {'제품'} - {modal.type === 'add' && '신규 등록'}
                                {modal.type === 'modify' && '정보 변경'} */}
                        </span>
                    </Grid>
                    <Grid item xs={12} sm={2} className={classes.gridAlign}>
                        <CloseOutlinedIcon className={classes.iconButton} onClick={handleClose} />
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent className={classes.wrapper} style={{ position: 'relative' }}>
                <Form onFinish={handleSubmit} form={form}>
                    {/* Form 컨테이너 */}
                    {(modal.type === 'add' || (modal.type === 'modify' && product)) && (
                        <Grid container>
                            {/* 제품명 */}
                            <Grid
                                container
                                className={classes.formWrapper}
                                style={{ marginTop: '18px' }}
                            >
                                <Grid item xs={12} sm={3}>
                                    <span
                                        className={`${classes.formItemTitle} ${classes.formItemEssential}`}
                                    >
                                        {t('제품명')}
                                    </span>
                                    {/* formItemAssential 추가 */}
                                </Grid>
                                <Grid item xs={12} sm={9}>
                                    <Form.Item
                                        name="name"
                                        rules={[{ required: true, message: t('제품명 입력') }]}
                                        initialValue={
                                            modal.type === 'add' ? '' : product && product.name
                                        }
                                    >
                                        <Input placeholder={t('제품명 입력')} />
                                    </Form.Item>
                                </Grid>
                            </Grid>
                            {/* 출고지 */}
                            <Grid container className={classes.formWrapper}>
                                <Grid item xs={12} sm={3}>
                                    <span
                                        className={`${classes.formItemTitle} ${classes.formItemEssential}`}
                                    >
                                        {t('출고지')}
                                    </span>
                                </Grid>
                                <Grid item xs={12} sm={9}>
                                    <Form.Item
                                        name="placeName"
                                        rules={[
                                            {
                                                required: true,
                                                message: t('ex) 본사, 아산 1공장, F06 창고 등'),
                                            },
                                        ]}
                                        initialValue={
                                            modal.type === 'add' ? '' : product && product.placeName
                                        }
                                    >
                                        <Input placeholder={t('출고지 입력')} />
                                    </Form.Item>
                                </Grid>
                            </Grid>
                            {/* 알람 설정 */}
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                style={{
                                    padding: '0 40px 16px',
                                }}
                            >
                                <span className={classes.formItemTitle}>
                                    {t('알람 설정')}
                                    <span
                                        className={classes.formItemGrey}
                                        style={{ marginLeft: '6px' }}
                                    >
                                        {t('(범위를 입력하지 않으면 알람이 작동하지 않습니다.)')}
                                    </span>
                                </span>
                            </Grid>
                            {/* 범위 설정영역 */}
                            <Grid container className={classes.formGrey}>
                                {/* 온도 범위 */}
                                <Grid container className={classes.formRangeList}>
                                    <Grid item xs={12} sm={3}>
                                        <span className={classes.formItemTitle}>
                                            {t('온도 범위')}
                                        </span>
                                    </Grid>
                                    <Grid item xs={12} sm={9}>
                                        <Space>
                                            <Form.Item
                                                name="minTemperature"
                                                initialValue={
                                                    modal.type === 'add'
                                                        ? ''
                                                        : product && product.minTemperature
                                                }
                                            >
                                                <Input
                                                    type="number"
                                                    name="minTemperature"
                                                    placeholder={t('값 입력')}
                                                    onChange={onChange}
                                                />
                                            </Form.Item>
                                            {/* 숫자만 입력 가능하도록, value값이 아래에도 공유되도록 */}
                                            <span
                                                className={classes.formItemUnit}
                                                style={{ marginLeft: '8px' }}
                                            >
                                                {'℃'}
                                            </span>
                                            <span className={classes.formItemUnit}>{'~'}</span>
                                            <Form.Item
                                                name="maxTemperature"
                                                initialValue={
                                                    modal.type === 'add'
                                                        ? ''
                                                        : product && product.maxTemperature
                                                }
                                            >
                                                <Input
                                                    type="number"
                                                    name="maxTemperature"
                                                    placeholder={t('값 입력')}
                                                    onChange={onChange}
                                                />
                                            </Form.Item>
                                            <span
                                                className={classes.formItemUnit}
                                                style={{ marginLeft: '8px' }}
                                            >
                                                {'℃'}
                                            </span>
                                        </Space>
                                        {/* 여기에 잘못된 값 입력된 알림 메세지 입력 */}
                                        {/* <span>{correctMinMax !== null ? correctMinMax : ''}</span> */}
                                        <Grid item xs={12} sm={12}>
                                            {isRangeAbnormal.temperature ? (
                                                <span className={classes.formItemRed}>
                                                    {t('올바른 범위의 값을 입력하세요.')}
                                                </span>
                                            ) : (
                                                <span className={classes.formItemGrey}>
                                                    {/* 여기에 input의 value값 공유 */}

                                                    {i18n.language === 'ko'
                                                        ? `${
                                                              dataRange.minTemperature === null ||
                                                              dataRange.minTemperature === ''
                                                                  ? '최소값'
                                                                  : dataRange.minTemperature
                                                          }~${
                                                              dataRange.maxTemperature === null ||
                                                              dataRange.maxTemperature === ''
                                                                  ? '최대값'
                                                                  : dataRange.maxTemperature
                                                          }(℃)의 범위를 벗어날 때 온도 알람이 발생합니다.`
                                                        : i18n.language === 'en'
                                                        ? `Alarms occur when the temperature is out of range ${
                                                              dataRange.minTemperature === null ||
                                                              dataRange.minTemperature === ''
                                                                  ? 'min'
                                                                  : dataRange.minTemperature
                                                          }~${
                                                              dataRange.maxTemperature === null ||
                                                              dataRange.maxTemperature === ''
                                                                  ? 'max'
                                                                  : dataRange.maxTemperature
                                                          }(℃)`
                                                        : ''}
                                                    {/* 상단에서 선언해주기 */}
                                                </span>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Grid>

                                {/* 습도 범위 */}
                                <Grid container className={classes.formRangeList}>
                                    <Grid item xs={12} sm={3}>
                                        <span className={classes.formItemTitle}>
                                            {t('습도 범위')}
                                        </span>
                                    </Grid>
                                    <Grid item xs={12} sm={9}>
                                        <Space>
                                            <Form.Item
                                                name="minHumidity"
                                                initialValue={
                                                    modal.type === 'add'
                                                        ? ''
                                                        : product && product.minHumidity
                                                }
                                            >
                                                <Input
                                                    type="number"
                                                    name="minHumidity"
                                                    placeholder={t('값 입력')}
                                                    onChange={onChange}
                                                />
                                            </Form.Item>
                                            <span
                                                className={classes.formItemUnit}
                                                style={{ marginLeft: '8px' }}
                                            >
                                                {'%'}
                                            </span>
                                            <span className={classes.formItemUnit}>{'~'}</span>
                                            <Form.Item
                                                name="maxHumidity"
                                                initialValue={
                                                    modal.type === 'add'
                                                        ? ''
                                                        : product && product.maxHumidity
                                                }
                                            >
                                                <Input
                                                    type="number"
                                                    name="maxHumidity"
                                                    placeholder={t('값 입력')}
                                                    onChange={onChange}
                                                />
                                            </Form.Item>
                                            <span
                                                className={classes.formItemUnit}
                                                style={{ marginLeft: '8px' }}
                                            >
                                                {'%'}
                                            </span>
                                        </Space>
                                        <Grid item xs={12} sm={12}>
                                            {isRangeAbnormal.humidity ? (
                                                <span className={classes.formItemRed}>
                                                    {t('올바른 범위의 값을 입력하세요.')}
                                                </span>
                                            ) : (
                                                <span className={classes.formItemGrey}>
                                                    {i18n.language === 'ko'
                                                        ? `${
                                                              dataRange.minHumidity === null ||
                                                              dataRange.minHumidity === ''
                                                                  ? '최소값'
                                                                  : dataRange.minHumidity
                                                          }~${
                                                              dataRange.maxHumidity === null ||
                                                              dataRange.maxHumidity === ''
                                                                  ? '최대값'
                                                                  : dataRange.maxHumidity
                                                          }(%)의 범위를 벗어날 때 습도 알람이 발생합니다.`
                                                        : i18n.language === 'en'
                                                        ? `Alarms occur when the humidity is out of range ${
                                                              dataRange.minHumidity === null ||
                                                              dataRange.minHumidity === ''
                                                                  ? 'min'
                                                                  : dataRange.minHumidity
                                                          }~${
                                                              dataRange.maxHumidity === null ||
                                                              dataRange.maxHumidity === ''
                                                                  ? 'max'
                                                                  : dataRange.maxHumidity
                                                          }(%)`
                                                        : ''}
                                                </span>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* 충격 범위 */}
                                <Grid container className={classes.formRangeList}>
                                    <Grid item xs={12} sm={3}>
                                        <span className={classes.formItemTitle}>
                                            {t('충격 감지')}
                                        </span>
                                    </Grid>
                                    <Grid item xs={12} sm={9}>
                                        <Space>
                                            <Grid>
                                                <Form.Item
                                                    name="maxShock"
                                                    initialValue={
                                                        modal.type === 'add'
                                                            ? ''
                                                            : product && product.maxShock
                                                    }
                                                >
                                                    <Input
                                                        type="number"
                                                        name="maxShock"
                                                        placeholder={t('값 입력')}
                                                        onChange={onChange}
                                                    />
                                                </Form.Item>
                                            </Grid>
                                            <span className={classes.formItemUnit}>
                                                {i18n.language === 'ko' ? 'G 이하' : 'G under'}
                                            </span>
                                        </Space>
                                        <Grid item xs={12} sm={12}>
                                            <span className={classes.formItemGrey}>
                                                {i18n.language === 'ko'
                                                    ? `${
                                                          dataRange.maxShock === null ||
                                                          dataRange.maxShock === ''
                                                              ? '최대값'
                                                              : dataRange.maxShock
                                                      }(G)를 초과할 때 충격 알람이 발생합니다.`
                                                    : i18n.language === 'en'
                                                    ? `Alarms occur when the shock is over ${
                                                          dataRange.maxShock === null ||
                                                          dataRange.maxShock === ''
                                                              ? 'max'
                                                              : dataRange.maxShock
                                                      }(G)`
                                                    : ''}
                                            </span>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* S/N */}
                            {modal.type !== 'modify' && (
                                <Grid
                                    container
                                    className={`${classes.formWrapper} ${classes.serialNoList}`}
                                >
                                    <Grid item xs={12} sm={3}>
                                        <span
                                            className={`${classes.formItemTitle} ${classes.formItemEssential}`}
                                        >
                                            {'S/N'}
                                        </span>
                                    </Grid>
                                    <Grid item xs={12} sm={9}>
                                        {/* 단일 시리얼번호 등록 */}
                                        {serialList.map((item: any) => {
                                            return (
                                                <Grid
                                                    container
                                                    alignItems="center"
                                                    key={item.key}
                                                    className={classes.serialNoInput}
                                                >
                                                    <Grid item xs={12} sm={4}>
                                                        <Form.Item
                                                            name={`serial-${item.key}`}
                                                        >
                                                            <InputNumber
                                                                placeholder={t('Serial No. 입력')}
                                                                type="number"
                                                                // 여기
                                                                // style={{
                                                                //     WebkitAppearance: 'none',
                                                                //     margin: 0,
                                                                // }}
                                                            />
                                                        </Form.Item>
                                                    </Grid>

                                                    <Grid item xs={12} sm={8}>
                                                        <Space className={classes.spacing}>
                                                            <SerialNoAddButton
                                                                onClick={handleAddClick}
                                                            />
                                                            {item.key > 0 && (
                                                                <SerialNoDeleteButton
                                                                    onClick={() =>
                                                                        handleRemoveClick(item.key)
                                                                    }
                                                                />
                                                            )}
                                                        </Space>
                                                    </Grid>
                                                    {item.key === 0 && (
                                                        <Grid>
                                                            <span
                                                                className={
                                                                    classes.formItemLightGrey
                                                                }
                                                            >
                                                                {t(
                                                                    `1개 단위로 시리얼 번호를 등록할 수 있습니다.`,
                                                                )}
                                                            </span>
                                                        </Grid>
                                                    )}
                                                </Grid>
                                            );
                                        })}
                                        <Grid container>
                                            <span
                                                style={{
                                                    width: '100%',
                                                    height: 1,
                                                    margin: '16px 0',
                                                    background: colors.BORDER_GREY,
                                                }}
                                            />
                                        </Grid>

                                        {/* 범위 시리얼번호 등록 */}
                                        {serialRangeList.map((items: any) => {
                                            return (
                                                <Grid
                                                    container
                                                    alignItems="center"
                                                    key={items.key}
                                                    className={classes.serialNoInput}
                                                >
                                                    <Grid item xs={12} sm={9}>
                                                        <Space>
                                                            <Form.Item
                                                                name={`range-min-${items.key}`}
                                                            >
                                                                <InputNumber
                                                                    placeholder={t(
                                                                        'Serial No. 입력',
                                                                    )}
                                                                />
                                                            </Form.Item>
                                                            <span
                                                                className={classes.formItemUnit}
                                                                style={{ margin: '0px 8px' }}
                                                            >
                                                                {'~'}
                                                            </span>
                                                            <Form.Item
                                                                name={`range-max-${items.key}`}
                                                            >
                                                                <InputNumber
                                                                    placeholder={t(
                                                                        'Serial No. 입력',
                                                                    )}
                                                                />
                                                            </Form.Item>
                                                        </Space>
                                                    </Grid>

                                                    <Grid item xs={12} sm={3}>
                                                        <Space className={classes.spacing}>
                                                            <SerialNoAddButton
                                                                onClick={handleRangeAddClick}
                                                            />
                                                            {items.key > 0 && (
                                                                <SerialNoDeleteButton
                                                                    onClick={() =>
                                                                        handleRangeRemoveClick(
                                                                            items.key,
                                                                        )
                                                                    }
                                                                />
                                                            )}
                                                        </Space>
                                                    </Grid>
                                                    {items.key === 0 && (
                                                        <Grid>
                                                            <span
                                                                className={
                                                                    classes.formItemLightGrey
                                                                }
                                                            >
                                                                {t(
                                                                    `여러개의 시리얼 번호를 등록할 수 있습니다.`,
                                                                )}
                                                            </span>
                                                        </Grid>
                                                    )}
                                                </Grid>
                                            );
                                        })}
                                    </Grid>
                                </Grid>
                            )}
                        </Grid>
                    )}
                </Form>
            </DialogContent>
            <DialogActions
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    borderTop: `1px solid ${colors.BORDER_GREY}`,
                    padding: '24px',
                }}
            >
                <SubmitButton
                    disabled={isRangeAbnormal.temperature || isRangeAbnormal.humidity}
                    onClick={() => form.submit()}
                >
                    {modal.type === 'add' && t('등록')}
                    {modal.type === 'modify' && t('변경')}
                </SubmitButton>
            </DialogActions>
        </Dialog>
    );
}
