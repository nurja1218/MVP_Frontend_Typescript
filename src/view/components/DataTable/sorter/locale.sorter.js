const localeSorter = (key) => {
    const stringKey = key.toString();
    return (a, b) => (a[stringKey] || '').localeCompare(b[stringKey] || '');
};

export default localeSorter;
