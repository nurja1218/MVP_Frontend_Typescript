import { useEffect, useState } from 'react';

export default function TableDataAlarm({ data, min, max }) {
    const [alarm, setAlarm] = useState(null);

    useEffect(() => {
        if (max === 'null') {
            if (min === 'null') {
                setAlarm('NORMAL');
            } else {
                if (parseFloat(min) <= parseFloat(data)) {
                    setAlarm('NORMAL');
                } else {
                    setAlarm('ABNORMAL');
                }
            }
        } else {
            if (min === 'null') {
                if (parseFloat(data) <= parseFloat(max)) {
                    setAlarm('NORMAL');
                } else {
                    setAlarm('ABNORMAL');
                }
            } else {
                if (parseFloat(min) <= parseFloat(data)) {
                    if (parseFloat(data) <= parseFloat(max)) {
                        setAlarm('NORMAL');
                    } else {
                        setAlarm('ABNORMAL');
                    }
                } else {
                    setAlarm('ABNORMAL');
                }
            }
        }
    }, [data, min, max]);

    return (
        <>
            {alarm !== null && alarm === 'NORMAL' ? (
                <span>{data}</span>
            ) : (
                <span>
                    {data}
                    <img
                        src="/assets/common/report_problem.svg"
                        width="20"
                        height="20"
                        style={{ marginLeft: 4 }}
                        alt=""
                    />
                </span>
            )}
        </>
    );
}
