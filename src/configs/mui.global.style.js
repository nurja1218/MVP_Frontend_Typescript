import { createMuiTheme } from '@material-ui/core/styles';
import { colors } from './variables';
import '@/configs/fonts/noto.sans.kr.css';
import '@/configs/fonts/nanum.myeongjo.css';
import '@/configs/fonts/pretendard.css';

export const themeGen = (type) =>
    createMuiTheme({
        overrides: {
            MuiCssBaseline: {
                '@global': {
                    'input:-webkit-autofill': {
                        WebkitBackgroundClip: 'text',
                    },
                    '*::-webkit-scrollbar': {
                        width: '7px',
                        height: 7,
                    },
                    '*::-webkit-scrollbar-track': {
                        backgroundColor: 'transparent',
                    },
                    '*::-webkit-scrollbar-thumb': {
                        borderRadius: '5px',
                        backgroundColor: '#D4D5D9',
                    },
                    '*::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: '#ccc',
                    },
                    '*::-webkit-scrollbar-button': {
                        width: 0,
                        height: 0,
                    },
                    body: {
                        backgroundColor: type === 'guest' ? 'white' : '#eff0f4',
                        margin: '0',
                        padding: '0',
                        fontFamily:
                            "-apple-system, 'Noto Sans KR', BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
                        WebkitFontSmoothing: 'antialiased',
                        MozOsxFontSmoothing: 'grayscale',
                        color: '#222',
                        width: '100%',
                        overflow: 'overlay',
                        wordBreak: 'keep-all',

                        // alert 수정
                        '& .ant-message-notice-content': {
                            padding: '10px 16px',
                            border: `1px solid ${colors.BORDER_GREY}`,
                            borderRadius: 5,
                            background: 'rgba(255,255,255,0.95)',
                            fontWeight: 700,
                            color: colors.CG800,
                            backdropFilter: 'blur(4px)',
                        },
                        '& .anticon-check-circle, & .anticon-close-circle': {
                            position: 'relative',
                            width: 20,
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                top: '-19px',
                                left: 0,
                                width: 20,
                                height: 20,
                            },
                            '& svg': {
                                display: 'none',
                            },
                        },
                        '& .anticon-check-circle': {
                            '&::after': {
                                background: 'url("/assets/common/check_circle.png") no-repeat',
                                backgroundSize: 'contain',
                            },
                        },
                        '& .anticon-close-circle': {
                            '&::after': {
                                background: 'url("/assets/common/report_problem.png") no-repeat',
                                backgroundSize: 'contain',
                            },
                        },
                    },
                    ul: {
                        margin: 0,
                        padding: 0,
                        listStyle: 'none',
                    },
                    button: {
                        cursor: 'pointer',
                    },
                },
            },
        },
        typography: {
            fontFamily:
                "'-apple-system', 'Noto Sans KR', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'",
            button: {
                textTransform: 'none',
            },
        },
        zIndex: {
            modal: 10,
        },
        palette: {
            primary: {
                main: colors.PRIMARY,
                mainLight: colors.LIGHT_PRIMARY,
                background: colors.BACKGROUND,
                borderGrey: colors.BORDER_GREY,
                text: colors.TEXT,
                white: colors.WHITE,

                error: colors.ERROR,
                lightError: colors.LIGHT_ERROR,
                darkError: colors.DARK_ERROR,
                grey: colors.GREY,
                lightGrey: colors.LIGHT_GREY,
                green: colors.GREEN,
                lightGreen: colors.LIGHT_GREEN,
                default: colors.DEFAULT,
                darkDefault: colors.DARK_DEFAULT,
                disabled: colors.DISABLED,
                darkDisabled: colors.DARK_DISABLED,

                cg900: colors.CG900,
                cg800: colors.CG800,
                cg700: colors.CG700,
                cg600: colors.CG600,
                cg500: colors.CG500,
                cg400: colors.CG400,
                cg300: colors.CG300,
                cg200: colors.CG200,
                cg100: colors.CG100,
            },
            secondary: {
                main: colors.SECONDARY,
            },
        },
    });
