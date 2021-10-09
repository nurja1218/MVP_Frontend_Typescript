// import { assetsDir } from '../../../configs/variables';
import { useStyles } from './style';

export default function SubmitButton({ onClick, children, disabled, style }) {
    const classes = useStyles();
    return (
        <button
            className={classes.submitButton}
            onClick={onClick}
            disabled={disabled}
            style={{
                opacity: disabled && '0.3',
                ...style,
            }}
        >
            {children}
        </button>
    );
}
