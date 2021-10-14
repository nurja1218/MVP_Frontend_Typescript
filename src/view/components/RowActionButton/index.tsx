import React from 'react';
import { useStyles } from './style';

interface RowButtonStyle {
	rowActionButton? : any;
}

interface RowButton {
    action: any;
    style? : any;
    className? : any;
    children: any;
    onMouseOver: (event: React.SyntheticEvent<HTMLSpanElement>) => void;
    onMouseLeave: (event: React.SyntheticEvent<HTMLSpanElement>) => void;
}

export default function RowActionButton (buttonOption: RowButton) {
    const classes: RowButtonStyle = useStyles();
    return (
        <span
            className={`${classes.rowActionButton} ${buttonOption.className}`}
            onClick={buttonOption.action}
            style={buttonOption.style}
            onMouseOver={buttonOption.onMouseOver}
            onMouseLeave={buttonOption.onMouseLeave}
        >
            {buttonOption.children}
        </span>
    );
    
}
