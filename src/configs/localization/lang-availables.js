const langAvailables = [
    {
        key: 0,
        value: 'ko',
        name: '한국어',
    },
    {
        key: 1,
        value: 'en',
        name: 'English',
    },
];

const supportedLngs = langAvailables.map((l) => l.value);

export default langAvailables;
export { supportedLngs };
