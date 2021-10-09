import { useStyles } from './style';
import { Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';
const CheckboxGroup = Checkbox.Group;

export default function Checkboxes(props) {
    const classes = useStyles();
    const { t } = useTranslation();
    return (
        <CheckboxGroup
            className={classes.checkboxGroup}
            {...props}
            options={props.options.map((option) => ({
                ...option,
                label: t(option.label),
            }))}
        />
    );
}
