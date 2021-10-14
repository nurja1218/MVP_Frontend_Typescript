import React from 'react';
import { GoogleMap, Marker, Polyline, useJsApiLoader } from '@react-google-maps/api';
import { colors, GOOGLE_MAPS_KEY } from '../../../configs/variables';
import { memo, useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { isNeedReloadByLangState } from '../../../recoil/atoms';
import uniqueBy from '../../../tools/mapper/array.unique';
import { useTranslation } from 'react-i18next';

const containerStyle = {
    width: '400px',
    height: '515px',
};

const generatePolylines = (markers: any) => {
    if (markers.length <= 1) {
        return [];
    }
    const polylines = [];
    for (let i = 0; i < markers.length; i++) {
        polylines.push({
            lat: markers[i].latitude,
            lng: markers[i].longitude,
        });
    }
    return polylines;
};

// google map return 함수
function MapWithGoogleMap(transportMarkers: any, zoom: any) {
    const [markers, setMarkers] = useState<any>(null);
    const { t, i18n } = useTranslation();

    const [map, setMap] = useState<any>(null);
    const [uniqueMarkers, setUniqueMarkers] = useState<any>([]);
    const [center, setCenter] = useState<any>();
    const [path, setPath] = useState<any>([]);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_MAPS_KEY,
        language: i18n.language === 'ko' ? 'ko' : 'en',
    });

    useEffect(() => {
        if (transportMarkers.length > 0) {
            setMarkers(transportMarkers.filter((mark: any) => mark !== false));
        }
    }, [transportMarkers]);

    useEffect(() => {
        if (markers) {
            const uniqueByPlaceName = uniqueBy('locationType');
            // 출검도 위도/경도 배열
            const uniques = uniqueByPlaceName(markers);

            if (uniques.length > 0) {
                setUniqueMarkers(uniques);
                setCenter({
                    lat: uniques[0].latitude,
                    lng: uniques[0].longitude,
                });
            } else {
                setUniqueMarkers([]);
                setCenter(null);
            }
            setPath([]);
        }
    }, [markers]);

    useEffect(() => {
        if (map) {
            if (uniqueMarkers.length > 1) {
                const bounds = new window.google.maps.LatLngBounds();
                uniqueMarkers
                    .map((marker: any, idx: any) => ({
                        id: idx,
                        position: {
                            lat: marker.latitude,
                            lng: marker.longitude,
                        },
                    }))
                    .map((item: any, idx: any) => {
                        bounds.extend(item.position);
                        return item.id;
                    });
                map.fitBounds(bounds);
                setPath(generatePolylines(uniqueMarkers));
            }
        }
    }, [map, uniqueMarkers]);

    const onLoad = useCallback(
        function callback(map) {
            const bounds = new window.google.maps.LatLngBounds();
            uniqueMarkers
                .map((marker: any, idx: number) => ({
                    id: idx,
                    position: {
                        lat: marker.latitude,
                        lng: marker.longitude,
                    },
                }))
                .map((item: any, idx: number) => {
                    bounds.extend(item.position);
                    return item.id;
                });
            map.fitBounds(bounds);
            setPath(generatePolylines(uniqueMarkers));
            map.fitBounds(bounds);
            setMap(map);
        },
        [uniqueMarkers],
    );

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
        setMarkers(null);
        setUniqueMarkers([]);
        // 임의로 null 값 줌
        setCenter(null);
        setPath([]);
    }, []);

    return (
        <>
            {isLoaded && center && uniqueMarkers.length > 0 ? (
                <GoogleMap
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    zoom={zoom}
                    mapContainerStyle={containerStyle}
                    center={center}
                >
                    <>
                        {uniqueMarkers.length !== 0 &&
                            uniqueMarkers.map((marker: any, idx: number) => (
                                <Marker
                                    key={`mark-${idx}`}
                                    position={{
                                        lat: marker.latitude,
                                        lng: marker.longitude,
                                    }}
                                    icon={`/assets/common/map_pin_${marker.locationType}_${i18n.language}.svg`}
                                    // depart / inspect / arrive
                                    // label={t(ARRIVE_PLACES[marker.placeRoleName])}
                                    // ${marker.placeRoleName.toLowerCase()}
                                />
                            ))}
                        {path.length > 0 && (
                            <Polyline
                                path={path}
                                options={{ strokeColor: colors.CG900, strokeWeight: 5 }}
                                // 일단
                                // geodesic={true}
                            />
                        )}
                    </>
                </GoogleMap>
            ) : (
                <>{t('출력할 지도 정보가 없습니다.')}</>
            )}
        </>
    );
}

// 지도의 위치값을 읽은 후 리렌더링 필요! > memo()로 이 작업을 해줘야 정상적으로 해당 마커위치 기반으로 중앙을 잡는다.
export default memo(function MapViewer({ zoom = 11, transportMarkers, height = '100%' }: any) {
    const [isNeedReloadByLang, setIsNeedReloadByLang] = useRecoilState(isNeedReloadByLangState);

    useEffect(() => {
        if (isNeedReloadByLang) {
            setIsNeedReloadByLang(false);
        }
    }, [isNeedReloadByLang, setIsNeedReloadByLang, transportMarkers, zoom]);
    return (
        <>
            {isNeedReloadByLang
                ? window.location.reload()
                : MapWithGoogleMap(transportMarkers, zoom)}
        </>
    );
});
