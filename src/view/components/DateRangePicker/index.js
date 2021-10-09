import { DatePicker } from 'antd';
import rangePickerLocale from './locale';
import { useStyles } from './style';
const { RangePicker } = DatePicker;

export default function DateRangePicker(props) {
    const classes = useStyles();
    return (
        <RangePicker
            className={classes.rangeInput}
            {...props}
            locale={rangePickerLocale}
            allowClear={false}
        />
    );
}
