import { Dialog, DialogTitle, DialogActions, DialogContent, Grid } from '@material-ui/core';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { certificateState } from '../../../../recoil/atoms';
import { message } from 'antd';
import SubmitButton from '../../SubmitButton';
import { useStyles } from './style';
import { CERTIFICATE_BY_UUID } from '../../../../apollo/scripts/queries';
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment';
import { exportToPDF } from '@/tools/file-export/pdf';
import ViewerSection from '@/view/components/ViewerSection';
import { useTranslation } from 'react-i18next';

// const sampleData = {
//     productName: 'AZ백신',
//     quantity: '10',
//     size: '1 Vial',
//     storageMethod: '냉장보관',
//     manufacturerName: '(주)윌로그',
//     manufacturerAddress: '서울시 강남구 선릉로 513 8F',
//     manufactureNumber: 'AZ27805',
//     expirationDate: '20190405',
//     sellerName: '(주)윌로그바이오',
//     sellerAddress: '서울시 강남구 선릉로 513 8F',
//     packageMethod: '냉장제품 2~8°C 보관',
//     departureTime: '2021.07.14 12:49',
//     receiverName: '(주)윌로그상사',
//     receiverAddress: '서울시 강남구 선릉로 513 8F',
//     temperature: '2.4°C',
//     arrivalTime: '2021.07.14 13:49',
//     sellerSignature: '/assets/common/sellerSignature.png',
//     receiverSignature: '/assets/common/receiverSignature.png',
// };

export default function CertificateModal() {
    const classes = useStyles();
    const { t } = useTranslation();
    const [modal, setModal] = useRecoilState(certificateState);
    const [certificate, setCertificate] = useState(null);
    const { data, error } = useQuery(CERTIFICATE_BY_UUID, {
        variables: {
            uuid: modal.uuid,
        },
        skip: !modal?.uuid,
        fetchPolicy: 'network-only',
    });

    useEffect(() => {
        if (data) {
            setCertificate(data.certificateByUUID);
        }
        if (error) {
            message.error(t('출하증명서를 불러오는 중 문제가 발생했습니다.'));
            setModal({
                open: false,
                uuid: null,
            });
        }
    }, [data, error, setModal, t]);

    const handleDownload = () => {
        if (!certificate) {
            return;
        }
        const { productName, departureTime } = certificate;
        exportToPDF({
            domId: 'viewer-section',
            filename: `출하증명서-${productName}-${departureTime}`,
        })
            .then(() => {
                message.success(t('파일 추출이 시작되었습니다. 다운로드 내역을 확인하세요.'));
            })
            .catch(() => {
                message.error(t('파일 추출 중 문제가 발생했습니다.'));
            });
    };

    const handleClose = () => {
        setModal({ open: false, uuid: null });
    };
    return (
        <Dialog
            onClose={handleClose}
            open={modal.open || false}
            maxWidth="md"
            aria-labelledby="confirmation-dialog-title"
            className={classes.certificateModal}
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
                        <span>{t('출하증명서')}</span>
                    </Grid>
                    <Grid item xs={12} sm={2} align="right">
                        <CloseOutlinedIcon className={classes.iconButton} onClick={handleClose} />
                    </Grid>
                </Grid>
            </DialogTitle>
            {certificate && (
                <DialogContent
                    className={`${classes.wrapper} certificate`}
                    style={{ position: 'relative' }}
                >
                    <ViewerSection>
                        <CertificateView certificate={certificate} />
                    </ViewerSection>
                </DialogContent>
            )}
            {certificate && certificate.certificateStatusId === 'ISSUED' && (
                <DialogActions
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        borderTop: '1px solid #d4d5d9',
                        padding: '24px',
                    }}
                >
                    <SubmitButton onClick={handleDownload}>{t('다운로드')}</SubmitButton>
                </DialogActions>
            )}
        </Dialog>
    );
}

export function CertificateView({ certificate }) {
    const classes = useStyles();
    return (
        <div className={classes.certificateWrap}>
            <h2 className={classes.tableTitle}>생물학적 제제등 출하증명서</h2>
            <span>※ 표시란은 수령자가 기록할 것</span>
            <div className={classes.tableWrap}>
                <table style={{ tableLayout: 'fixed' }}>
                    <tbody>
                        <tr>
                            <td className={classes.cellName}>① 제품명</td>
                            <td style={{ width: '35%', wordBreak: 'break-all' }}>
                                {certificate.productName}
                            </td>
                            <td className={classes.cellName}>② 수 량</td>
                            <td style={{ width: '25%', wordBreak: 'break-all' }}>
                                {certificate.quantity}
                            </td>
                        </tr>
                        <tr>
                            <td className={classes.cellName}>③ 규 격</td>
                            <td style={{ width: '35%', wordBreak: 'break-all' }}>
                                {certificate.size}
                            </td>
                            <td className={classes.cellName}>④ 저장방법</td>
                            <td style={{ width: '25%', wordBreak: 'break-all' }}>
                                {certificate.storageMethod}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                        <tr>
                            <td rowSpan={4} className={classes.user}>
                                <p
                                    style={{
                                        writingMode: 'tb-rl',
                                    }}
                                >
                                    제조(수입)업자
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td className={classes.cellName}>⑤ 상 호</td>
                            <td colSpan={3} className={classes.cellContent}>
                                {certificate.manufacturerName}
                            </td>
                        </tr>
                        <tr>
                            <td className={classes.cellName}>⑥ 주 소</td>
                            <td colSpan={3} className={classes.cellContent}>
                                {certificate.manufacturerAddress}
                            </td>
                        </tr>

                        <tr>
                            <td className={classes.cellName}>⑦ 제조번호</td>
                            <td className={classes.cellContent}>{certificate.manufactureNumber}</td>
                            <td className={classes.cellName}>⑧ 유효기한</td>
                            <td className={classes.cellContent}>
                                {moment
                                    .unix(certificate.expirationDate / 1000)
                                    .local()
                                    .format('YYYYMMDD')}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                        <tr>
                            <td rowSpan={4} className={classes.user}>
                                <p style={{ writingMode: 'tb-rl' }}>판매(출하)자</p>
                            </td>
                        </tr>
                        <tr>
                            <td className={classes.cellName}>⑨ 상 호</td>
                            <td colSpan={3} className={classes.cellContent}>
                                {certificate.sellerName}
                            </td>
                        </tr>
                        <tr>
                            <td className={classes.cellName}>⑩ 주 소</td>
                            <td colSpan={3} className={classes.cellContent}>
                                {certificate.sellerAddress}
                            </td>
                        </tr>

                        <tr>
                            <td className={classes.cellName}>⑪ 포장형태</td>
                            <td className={classes.cellContent}>{certificate.packageMethod}</td>
                            <td className={classes.cellName}>⑫ 발송일시</td>
                            <td className={classes.cellContent}>
                                {moment
                                    .unix(certificate.departureTime / 1000)
                                    .local()
                                    .format('YYYY.MM.DD HH:mm')}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                        <tr>
                            <td rowSpan={4} className={classes.user}>
                                <p style={{ writingMode: 'tb-rl' }}>수령자</p>
                            </td>
                        </tr>
                        <tr>
                            <td className={classes.cellName}>⑬ 상 호</td>
                            <td colSpan={3} className={classes.cellContent}>
                                {certificate.receiverName}
                            </td>
                        </tr>
                        <tr>
                            <td className={classes.cellName}>⑭ 주 소</td>
                            <td colSpan={3} className={classes.cellContent}>
                                {certificate.receiverAddress}
                            </td>
                        </tr>
                        <tr>
                            <td className={classes.cellName}>⑮ 수령 시 제품 온도</td>
                            <td className={classes.cellContent}>
                                <span>※</span>
                                {certificate.temperature && `${certificate.temperature}℃`}
                            </td>
                            <td className={classes.cellName}>⑯ 수령일시</td>
                            <td className={classes.cellContent}>
                                <span>※</span>
                                {certificate.arrivalTime &&
                                    moment
                                        .unix(certificate.arrivalTime / 1000)
                                        .local()
                                        .format('YYYY.MM.DD HH:mm')}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <Grid container className={classes.footer}>
                    <Grid item xs={12} sm={12}>
                        「 약사법 」 제47조제1항 및 「 생물학적 제제 등의 제조 · 판매관리 규칙 」
                        제6조제1항제6호에 따라 위와 같이 출하하였음을 증명합니다.
                    </Grid>
                    <Grid item xs={12} sm={12} className={classes.issueDate}>
                        {moment
                            .unix(certificate.departureTime / 1000)
                            .local()
                            .format('YYYY년 MM월 DD일')}
                    </Grid>
                    <Grid item xs={12} sm={12} className={classes.signatureWrap} align="right">
                        <Grid container>
                            <Grid item xs={12} sm={6}>
                                판매(출하)자
                            </Grid>
                            <Grid item xs={6} sm={3} className={classes.signatureName}>
                                (주)윌로그바이오
                            </Grid>
                            <Grid item xs={6} sm={3} className={classes.signature}>
                                <img src={'/assets/common/sellerSignature.png'} alt="서명" />
                                (서명 또는 날인)
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} className={classes.signatureWrap} align="right">
                        <Grid container>
                            <Grid item xs={12} sm={6} style={{ letterSpacing: 5 }}>
                                수령자
                            </Grid>
                            <Grid item xs={6} sm={3} className={classes.signatureName}>
                                (주)윌로그상사
                            </Grid>
                            <Grid item xs={6} sm={3} className={classes.signature}>
                                {certificate.receiverSignature === null ? (
                                    ''
                                ) : (
                                    <img src={certificate.receiverSignature} alt="서명" />
                                )}
                                (서명 또는 날인)
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
