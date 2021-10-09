import { useStyles } from './style';

export default function RowActionButton({
    action,
    style,
    className,
    children,
    onMouseOver,
    onMouseLeave,
}) {
    const classes = useStyles();

    return (
        <span
            className={`${classes.rowActionButton} ${className}`}
            onClick={action}
            style={style}
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
        >
            {children}
        </span>
    );
}
