import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../../configs/variables';

export const useStyles = makeStyles((theme) => ({
    checkboxGroup: {
        marginLeft: 7,
        '& .ant-checkbox + span': {
            paddingRight: 0,
            paddingLeft: 6,
        },
        '& label > span': {
            fontSize: 14,
            color: colors.CG800,
        },
        '& input': {
            zoom: 0.5,
        },
    },
}));
