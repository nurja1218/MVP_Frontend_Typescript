const uniqueBy = (prop) => (list) => {
    const uniques = {};
    return list && list.length > 0
        ? list.reduce((result, item) => {
              if (uniques[item[prop]]) return result;
              uniques[item[prop]] = item;
              return [...result, item];
          }, [])
        : [];
};

export default uniqueBy;
