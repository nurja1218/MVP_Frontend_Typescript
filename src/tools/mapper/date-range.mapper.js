import moment from 'moment';

const convertLocalFromToUTC = (date) =>
    moment.utc(moment(date).local().startOf('day')).format('YYYYMMDDHHmmss');

const convertLocalToToUTC = (date) =>
    moment.utc(moment(date).local().endOf('day')).format('YYYYMMDDHHmmss');

const dateRangeMapper = (from, to) => {
    return {
        from: !from ? '' : convertLocalFromToUTC(from),
        to: !to ? '' : convertLocalToToUTC(to),
    };
};

export default dateRangeMapper;
