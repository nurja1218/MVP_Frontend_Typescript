import { makeStyles } from '@material-ui/core';
import { colors } from '../../../configs/variables';

export const useStyles = makeStyles((theme) => ({
    rangeInput: {
        width: '100%',
        backgroundColor: colors.LIGHT_BLUE_2,
        padding: '7px 8px 7px 16px',
        border: `1px solid ${colors.BORDER_GREY}`,
        borderRadius: 5,
        '& .ant-picker-input input': {
            fontSize: '13px !important',
        },
        '& .ant-picker-suffix': {
            width: 100,
            '& svg': {
                display: 'none',
            },
            '& ::after': {
                content: "''",
                zIndex: 2,
                position: 'absolute',
                left: 'auto !important',
                top: '50%',
                right: 8,
                transform: 'translateY(-50%)',
                width: 24,
                height: 24,
                backgroundImage: "url('/assets/common/calendar_today.svg')",
                backgroundSize: 'cover',
            },
        },
    },
}));
