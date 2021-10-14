import { useStyles } from './style';

export default function ViewerSection({ children }: any) {
    const classes: any = useStyles();
    return (
        <div id="viewer-section" className={classes.ViewerSection}>
            {children}
        </div>
    );
}
