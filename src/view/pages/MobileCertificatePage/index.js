import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { CERTIFICATE_BY_UUID_MOBILE } from '../../../apollo/scripts/queries';
import ViewerSection from '@/view/components/ViewerSection';
import { CertificateView } from '../../components/Modal/CertificateModal';
import qs from 'qs';
import { useTranslation } from 'react-i18next';

export default function MobileCertificatePage({ match, location }) {
    const { t } = useTranslation();
    const { token } = qs.parse(location.search, { ignoreQueryPrefix: true });
    const { uuid } = match.params;
    const [certificate, setCertificate] = useState(null);
    const [isError, setIsError] = useState(false);
    const { data, error } = useQuery(CERTIFICATE_BY_UUID_MOBILE, {
        variables: {
            uuid,
            token,
        },
        skip: !uuid || !token,
    });

    useEffect(() => {
        if (!uuid || !token) {
            setIsError(true);
        }
    }, [uuid, token]);

    useEffect(() => {
        if (data) {
            setCertificate(data.certificateByUUIDForMobile);
            setIsError(false);
        }
        if (error) {
            console.log(error);
            setIsError(true);
        }
    }, [data, error]);

    useEffect(() => {
        const viewport = document.querySelector('meta[name="viewport"]');

        if (viewport) {
            viewport.content = 'initial-scale=0.1';
            viewport.content = 'width=1200';
        }
    }, []);

    return (
        <>
            {isError && (
                <p
                    style={{
                        margin: 15,
                        fontSize: '5rem',
                        fontWeight: 'bold',
                    }}
                >
                    {t('잘못된 접근입니다.')}
                </p>
            )}
            {!isError && certificate && (
                <div
                    style={{
                        width: 1200,
                        overflow: 'scroll',
                    }}
                >
                    <ViewerSection>
                        <CertificateView certificate={certificate} />
                    </ViewerSection>
                </div>
            )}
        </>
    );
}
