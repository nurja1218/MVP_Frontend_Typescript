import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../../configs/variables';

export const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: 100,
        '& input, & .ant-input-password': {
            padding: '8px 16px',
            border: `1px solid ${colors.CG400}`,
            borderRadius: 5,
            lineHeight: 1,
        },
    },
    logoWrapper: {
        marginBottom: 50,
    },
    buttonWrapper: {
        marginTop: 10,
    },
    button: {
        boxShadow: 'none',
        borderRadius: 5,
        '&:hover': {
            background: '#5B81F6',
            boxShadow: 'none',
        },
    },
}));
