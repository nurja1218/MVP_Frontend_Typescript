import { RingProgress } from '@ant-design/charts';

export default function DataProgress({ config }) {
    return <RingProgress {...config} />;
    // return <Progress type="circle" strokeLinecap="square" {...config} />;
}

// statistic: {
//     title: {
//         style: {
//             color: '#68686C',
//             fontSize: 16,
//             fontWeight: 700,
//         },
//         formatter: function formatter() {
//             return '정상 발급';
//         },
//     },
// },

// ver 2
// import { Progress } from 'antd';

// export default function DataProgress({ config }) {
//     return <Progress type="circle" {...config} />;
// }

// config에 추가
// format: () => <span>{'32'}건</span>,
