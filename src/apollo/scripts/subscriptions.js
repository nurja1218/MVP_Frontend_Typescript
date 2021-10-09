import gql from 'graphql-tag';

export const SUBSCRIBE_ALARM = gql`
    subscription alarm {
        alarmUpdated {
            uuid
            productName
            date
        }
    }
`;
