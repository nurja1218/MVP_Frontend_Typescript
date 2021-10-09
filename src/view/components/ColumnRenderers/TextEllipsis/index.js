import { Tooltip } from 'antd';
import { useStyles } from './style';

export default function TextEllipsis({ children }) {
    const classes = useStyles();
    return (
        <Tooltip title={children && children.length > 10 && children}>
            <span className={classes.textEllipsis}>{children}</span>
        </Tooltip>
    );
}
