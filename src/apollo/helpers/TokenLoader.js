// import { REFRESH } from '@/apollo/scripts/common/queries';
// import { useMutation } from '@apollo/react-hooks';
// import { useEffect, useState } from 'react';
// import { useRecoilValue, useSetRecoilState } from 'recoil';
// import { accessTokenState, refreshTokenState } from '@/recoil/atoms';
// import { loginHandler } from '@/recoil/selectors';

// export default function TokenLoader({ children }) {
//     const [tokenLoaded, setTokenLoaded] = useState(false);

//     const accessToken = useRecoilValue(accessTokenState);
//     const refreshToken = useRecoilValue(refreshTokenState);
//     const setAfterRefresh = useSetRecoilState(loginHandler);
//     const [refresh] = useMutation(REFRESH);

//     useEffect(() => {
//         if (!accessToken && refreshToken) {
//             refresh({
//                 variables: {
//                     refreshToken,
//                 },
//             })
//                 .then(({ data }) => {
//                     setAfterRefresh(data.refresh);
//                 })
//                 .catch((error) => {
//                     console.error(error);
//                 })
//                 .finally(() => {
//                     setTokenLoaded(true);
//                 });
//         }
//         if (!refreshToken) {
//             setTokenLoaded(true);
//         }
//     }, [accessToken, refreshToken, refresh, setAfterRefresh]);

//     return <>{tokenLoaded && children}</>;
// }
