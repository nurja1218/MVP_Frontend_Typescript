import { useState } from 'react';
import { assetsDir } from '../../../configs/variables';
import { useStyles } from './style';

export default function XlsxDownloadButton({ onClick }: any) {
    const classes = useStyles();
    const [hoverd, setHoverd] = useState(false);
    const handleMouseOver = () => {
        setHoverd(true);
    };
    const handleMouseLeave = () => {
        setHoverd(false);
    };
    return (
        <button
            className={classes.xlsxButton}
            onClick={onClick}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
        >
            <img
                src={`${
                    hoverd ? `${assetsDir.common}export_light.png` : `${assetsDir.common}export.png`
                }`}
                alt=""
            />
            XLSX
        </button>
    );
}
