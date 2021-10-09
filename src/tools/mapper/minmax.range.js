export default function minMaxRange(min, max, unit) {
    if (unit === '℃') {
        if (min === null && max === null) {
            return '-';
        } else if (min === null) {
            return `${max}℃ 이하`;
        } else if (max === null) {
            return `${min}℃ 이상`;
        } else {
            return `${min} ~ ${max}℃`;
        }
    } else if (unit === '%') {
        if (min === null && max === null) {
            return '-';
        } else if (min === null) {
            return max === 0 ? '-' : `${max}% 이하`;
        } else if (max === null) {
            return min === 0 ? '-' : `${min}% 이상`;
        } else {
            return min === 0 && max === 0 ? '-' : `${min} ~ ${max}%`;
        }
    }
}
