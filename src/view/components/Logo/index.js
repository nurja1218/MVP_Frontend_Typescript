import { assetsDir } from '@/configs/variables';
import { useStyles } from './style';
const { logo } = assetsDir;

export function HeaderLogo() {
    return <img src={`${logo}logo-white.svg`} alt="willog-logo" />;
}

export function BlackLogo(props) {
    return <img src={`${logo}logo-black.svg`} width="200px" alt="willog-logo" {...props} />;
}

export function MobileHeaderLogo(props) {
    const classes = useStyles();
    return (
        <img
            src={`${logo}logo-white.svg`}
            alt="willog-logo"
            className={classes.mobileLogoImg}
            {...props}
        />
    );
}
