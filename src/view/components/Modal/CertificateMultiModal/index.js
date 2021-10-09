import { Dialog, DialogTitle, DialogContent, Grid, DialogActions } from '@material-ui/core';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { certificatesState } from '../../../../recoil/atoms';
import { message } from 'antd';
import { useStyles } from '../CertificateModal/style';
import { CERTIFICATE_BY_UUID_MUTATION } from '../../../../apollo/scripts/queries';
import { useMutation } from '@apollo/react-hooks';
import { exportToPDF } from '@/tools/file-export/pdf';
import ViewerSection from '@/view/components/ViewerSection';
import SubmitButton from '../../SubmitButton';
import { CertificateView } from '../CertificateModal';
import { useTranslation } from 'react-i18next';

// const sampleData = {
//     productName: 'AZ백신',
//     quantity: '10',
//     size: '1 Vial',
//     storageMethod: '냉장보관',
//     manufacturerName: '(주)윌로그',
//     manufacturerAddress: '서울시 강남구 선릉로 513 8F',
//     manufactureNumber: 'AZ27805',
//     expirationData: '20190405',
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

export default function CertificateMultiModal() {
    const classes = useStyles();
    const { t, i18n } = useTranslation();
    const [modal, setModal] = useRecoilState(certificatesState);
    const [certificate, setCertificate] = useState(null);
    const [getCertificate] = useMutation(CERTIFICATE_BY_UUID_MUTATION);
    const [isStart, setIsStart] = useState(false);

    const handleDownload = async () => {
        setIsStart(true);
        const pendingUUIDs = [...modal.uuids];
        message.info(
            i18n.language === 'ko'
                ? `${pendingUUIDs.length}개의 출하증명서 다운로드가 시작되었습니다.`
                : i18n.language === 'en'
                ? `${pendingUUIDs.length} PoD documents being downloaded`
                : '',
        );
        while (pendingUUIDs.length > 0) {
            getCertificate({
                variables: {
                    uuid: pendingUUIDs.pop(),
                },
            })
                .then(({ data }) => {
                    const { certificateByUUIDInMutation } = data;
                    setCertificate(certificateByUUIDInMutation);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    useEffect(() => {
        async function download() {
            if (!certificate) return;
            const { productName, departureTime } = certificate;
            try {
                await exportToPDF({
                    domId: 'viewer-section',
                    filename: `출하증명서-${productName}-${departureTime}`,
                });
            } catch (err) {
                message.error(`[${productName}] ${t('파일 추출 중 문제가 발생했습니다.')}`);
            }
        }
        download();
    }, [certificate, modal.uuids, t]);

    const handleClose = () => {
        setCertificate(null);
        setModal({ open: false, uuids: [] });
        setIsStart(false);
    };
    return (
        <Dialog
            onClose={handleClose}
            open={modal.open || false}
            maxWidth="xs"
            aria-labelledby="confirmation-dialog-title"
            className={classes.certificateModal}
        >
            <DialogTitle id="confirmation-dialog-title" style={{ padding: '0' }}>
                <Grid container className={classes.header}>
                    <Grid item xs={12} sm={10}>
                        <span>{t('출하증명서 다운로드')}</span>
                    </Grid>
                    <Grid item xs={12} sm={2} align="right">
                        <CloseOutlinedIcon className={classes.iconButton} onClick={handleClose} />
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogActions
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '24px',
                }}
            >
                {modal.uuids &&
                    (isStart ? (
                        <SubmitButton
                            onClick={handleDownload}
                            style={{
                                backgroundColor: '#777',
                            }}
                        >
                            {t('다시 다운로드')}
                        </SubmitButton>
                    ) : (
                        <SubmitButton onClick={handleDownload}>
                            {i18n.language === 'ko'
                                ? `정상발급 ${modal.uuids.length}개 다운로드`
                                : i18n.language === 'en'
                                ? `${modal.uuids.length} documents downloaded`
                                : ''}
                        </SubmitButton>
                    ))}
            </DialogActions>
            {certificate && (
                <DialogContent
                    className={`${classes.wrapper} certificate`}
                    style={{
                        position: 'relative',
                        height: 1,
                        width: 1200,
                        overflow: 'hidden',
                    }}
                >
                    <ViewerSection>
                        <CertificateView certificate={certificate} />
                    </ViewerSection>
                </DialogContent>
            )}
        </Dialog>
    );
}
