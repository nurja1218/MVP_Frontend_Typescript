import { Slide } from '@material-ui/core';
import React from 'react';


const Transition: any = React.forwardRef(function Transition(props: any, ref: any) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default Transition;
