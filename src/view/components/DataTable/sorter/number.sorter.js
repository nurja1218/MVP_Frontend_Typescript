const numberSorter = (key) => {
    return (a, b) => {
        if (typeof a[key] === 'number' && typeof b[key] === 'number') {
            return a[key] - b[key];
        }
        return (
            +a[key].toString().replace(/[^0-9]/g, '') - +b[key].toString().replace(/[^0-9]/g, '')
        );
    };
};

export default numberSorter;
