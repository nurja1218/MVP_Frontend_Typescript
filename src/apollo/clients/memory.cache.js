import { InMemoryCache } from '@apollo/react-hooks';

export default new InMemoryCache();
//     {
//     typePolicies: {
//         Subscription: {
//             fields: {
//                 myNotifications: {
//                     merge(_existing, incoming) {
//                         return incoming;
//                     },
//                 },
//             },
//         },
//     },
// }
