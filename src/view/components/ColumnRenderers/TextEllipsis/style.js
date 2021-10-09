import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
    textEllipsis: {
        width: '100%',
        display: 'inline-block',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
}));
