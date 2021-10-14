import { useEffect, useState } from 'react';
import { useStyles } from './style';

// initialValue: 초기 검색값
export default function SearchInput({ onSearch, placeholder, initialValue }: any) {
    const classes = useStyles();
    const [value, setValue] = useState('');
    const onChange = (e: any) => {
        setValue(e.target.value);
    };
    const onClick = () => {
        onSearch(value);
    };
    const onKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            onClick();
        }
    };
    useEffect(() => {
        if (initialValue) {
            setValue(initialValue);
        }
    }, [initialValue]);
    return (
        <div className={classes.searchInput}>
            <input
                placeholder={placeholder}
                onKeyPress={onKeyPress}
                type="text"
                value={value}
                onChange={onChange}
            />
            <button onClick={onClick}>
                <img src="/assets/common/search.svg" alt="" />
            </button>
        </div>
    );
}
