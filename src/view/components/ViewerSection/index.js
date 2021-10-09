import { useStyles } from './style';

export default function ViewerSection({ children }) {
    const classes = useStyles();
    return (
        <div id="viewer-section" className={classes.ViewerSection}>
            {children}
        </div>
    );
}
