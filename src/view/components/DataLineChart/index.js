import { Line, G2 } from '@ant-design/charts';
import { useEffect, useState } from 'react';
import { colors } from '../../../configs/variables';

const defaultGraphConfig = {
    autoFit: true,
    height: 500,
    data: [],
    xField: 'date',
    yField: 'value',
    seriesField: 'type',
    tooltip: { showMarkers: false },
    point: { shape: 'breath-point' },
    slider: {
        start: 0.7,
        end: 1,
    },
};

const alarmInGraph = (alarmData) => {
    G2.registerShape('point', 'breath-point', {
        draw: function draw(cfg, container) {
            const { x, y, data } = cfg;
            const group = container.addGroup();
            // 알람 데이터에 포함된 데이터일 경우 아래 실행

            if (
                alarmData.result.length !== 0 &&
                alarmData.result.findIndex(
                    (value) => value.date === data.date,
                    // moment(value.date).format('YY.MM.DD HH:mm') === data.date,
                ) !== -1
            ) {
                const decorator1 = group.addShape('circle', {
                    attrs: {
                        x,
                        y,
                        r: 5,
                        fill: colors.SECONDARY,
                        opacity: 0.4,
                    },
                });
                const decorator2 = group.addShape('circle', {
                    attrs: {
                        x,
                        y,
                        r: 5,
                        fill: colors.SECONDARY,
                        opacity: 0.4,
                    },
                });
                const decorator3 = group.addShape('circle', {
                    attrs: {
                        x,
                        y,
                        r: 5,
                        fill: colors.SECONDARY,
                        opacity: 0.2,
                    },
                });
                decorator1.animate(
                    {
                        r: 20,
                        opacity: 0,
                    },
                    {
                        duration: 1800,
                        easing: 'easeLinear',
                        repeat: true,
                    },
                );
                decorator2.animate(
                    {
                        r: 20,
                        opacity: 0,
                    },
                    {
                        duration: 1800,
                        easing: 'easeLinear',
                        repeat: true,
                        delay: 600,
                    },
                );
                decorator3.animate(
                    {
                        r: 20,
                        opacity: 0,
                    },
                    {
                        duration: 1800,
                        easing: 'easeLinear',
                        repeat: true,
                        delay: 1200,
                    },
                );
                group.addShape('circle', {
                    attrs: {
                        x,
                        y,
                        r: 3,
                        fill: cfg.color,
                        opacity: 0.3,
                    },
                });
                group.addShape('circle', {
                    attrs: {
                        x,
                        y,
                        r: 1.5,
                        fill: colors.SECONDARY,
                        opacity: 0.3,
                    },
                });
            }
            return group;
        },
    });
};

export default function DataLineChart({ config, inspectAndAlarm, alarmData }) {
    // graph animation 설정 부분

    const [graphData, setGraphData] = useState({
        result: [],
    });
    const [graphConfig, setGraphConfig] = useState(defaultGraphConfig);

    // const [alarmData, setAlarmData] = useState({ result: [] });

    useEffect(() => {
        if (config) {
            const { data } = config;
            if (data.length !== 0) {
                setGraphData({
                    result: data.map((r) => ({
                        // date: moment(r.date).format('YY.MM.DD HH:mm'),
                        date: r.date,
                        value: r.value,
                        type: r.type,
                    })),
                });
            }
        }
    }, [config, inspectAndAlarm]);

    useEffect(() => {
        if (graphData && inspectAndAlarm) {
            const { minTemperature, maxTemperature } = inspectAndAlarm;
            alarmInGraph(alarmData);
            setGraphConfig({
                ...defaultGraphConfig,
                data: graphData.result,
                min: minTemperature,
                max: maxTemperature,
                annotations: [
                    {
                        type: 'region',
                        start: ['min', minTemperature === null ? 'min' : minTemperature],
                        end: ['max', maxTemperature === null ? 'max' : maxTemperature],
                        style: {
                            fill: '#3c6af5',
                        },
                    },
                    // {
                    //     type: 'line',
                    //     start: [2, 'max'],
                    //     end: [2, 'min'],
                    //     style: {
                    //         stroke: '#8F9094',
                    //         lineDash: [5, 5],
                    //         lineWidth: 2,
                    //     },
                    // },
                    // {
                    //     type: 'text',
                    //     position: [2, 'max'],
                    //     content: '검수',
                    //     offsetX: 0,
                    //     offsetY: -10,
                    //     style: {
                    //         fill: '#68686C',
                    //         stroke: '#000',
                    //         fontSize: 14,
                    //         fontWeight: 700,
                    //         textAlign: 'center',
                    //         textBaseline: 'bottom',
                    //     },
                    // },
                    // {
                    //     type: 'dataMarker',
                    //     position: [2, 'max'],
                    //     point: {
                    //         style: {
                    //             fill: '#8F9094',
                    //             stroke: '#8F9094',
                    //         },
                    //     },
                    // },
                    // {
                    //     type: 'dataMarker',
                    //     position: [2, 'min'],
                    //     point: {
                    //         style: {
                    //             fill: '#8F9094',
                    //             stroke: '#8F9094',
                    //         },
                    //     },
                    // },
                ],
            });
        }
    }, [graphData, inspectAndAlarm, alarmData]);

    return (
        <div>
            <Line {...graphConfig} />
        </div>
    );
}
