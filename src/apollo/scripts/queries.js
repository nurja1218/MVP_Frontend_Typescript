import gql from 'graphql-tag';

export const VERIFY_LOGIN = gql`
    query verifyLogin {
        verifyLogin {
            accessToken
            name
            companyName
            roleId
            roleName
            phone
            email
        }
    }
`;

export const LOGIN = gql`
    query login($user: UserLoginInput!) {
        login(user: $user) {
            accessToken
            name
            companyName
            roleId
            roleName
            phone
            email
        }
    }
`;

export const PRODUCTS_BY_COMPANY = gql`
    query productsByCompany($page: PageInput!, $search: SearchInput!) {
        productsByCompany(page: $page, search: $search) {
            result {
                ... on ProductInTable {
                    id
                    name
                    placeName
                    minTemperature
                    maxTemperature
                    minHumidity
                    maxHumidity
                    maxShock
                    createdAt
                }
            }
            pages {
                currentPage
                totalPages
                totalItems
                pageSize
            }
        }
    }
`;

export const DEVICES_BY_COMPANY = gql`
    query devicesByCompany($search: SearchInput!, $page: PageInput!) {
        devicesByCompany(search: $search, page: $page) {
            result {
                ... on DeviceInTable {
                    serial
                    productName
                    createdAt
                    usedCount
                    status
                    statusName
                    lastArrivalLocation
                    updatedAt
                }
            }
            pages {
                currentPage
                pageSize
                totalPages
                totalItems
            }
        }
    }
`;

export const DEVICECOUNTS_BY_COMPANY = gql`
    query deviceCountsByCompany {
        deviceCountsByCompany {
            totalDevices
            progressDevices
            arrivedDevices
            unusedDevices
        }
    }
`;

export const DEVICEDETAIL_BY_SERIAL = gql`
    query deviceDetailBySerial($serial: ID!, $search: SearchInput!, $page: PageInput!) {
        deviceDetailBySerial(serial: $serial, search: $search, page: $page) {
            result {
                ... on DeviceDetailInTable {
                    serial
                    transportUUID
                    productName
                    departurePlaceName
                    transportStatusId
                    transportStatusName
                    departureTime
                    arrivalTime
                    alarmRangeStatusId
                    certificateStatusId
                }
            }
            pages {
                currentPage
                totalPages
                totalItems
                pageSize
            }
        }
    }
`;

export const USERS_BY_COMPANY = gql`
    query usersByCompany($search: SearchInput!, $page: PageInput!) {
        usersByCompany(search: $search, page: $page) {
            result {
                ... on UserInTable {
                    id
                    companyId
                    name
                    phone
                    email
                    roleId
                    roleName
                    createdAt
                }
            }
            pages {
                currentPage
                totalPages
                totalItems
                pageSize
            }
        }
    }
`;

export const GET_PRODUCT = gql`
    query getProduct($id: ID!) {
        getProduct(id: $id) {
            id
            name
            placeName
            minTemperature
            maxTemperature
            minHumidity
            maxHumidity
            maxShock
            createdAt
        }
    }
`;

export const USER_BY_ID = gql`
    query userById($id: ID!) {
        userById(id: $id) {
            id
            name
            phone
            email
            roleId
            companyId
            createdAt
        }
    }
`;

export const USER_DETAIL = gql`
    query userDetail($id: ID!) {
        userDetail(id: $id) {
            name
            phone
            email
            roleId
            roleName
            companyName
            address
        }
    }
`;

export const CURRENT_USER_DETAIL = gql`
    query userDetail {
        userDetail {
            name
            phone
            email
            roleId
            roleName
            companyName
            address
        }
    }
`;

export const TRANSPORTS_BY_COMPANY = gql`
    query transportsByCompany($search: SearchInput!, $page: PageInput!) {
        transportsByCompany(search: $search, page: $page) {
            result {
                ... on TransportInTable {
                    id
                    productName
                    departurePlaceName
                    transportStatusId
                    departureTime
                    arrivalTime
                    certificateStatusId
                    alarmRangeStatusId
                }
            }
            pages {
                currentPage
                totalPages
                totalItems
                pageSize
            }
        }
    }
`;

export const TODAY_TRANSPORT_COUNTS = gql`
    query transportCounts($dateRange: DateRangeInput!) {
        transportCounts(dateRange: $dateRange) {
            arrivalProducts
            departureProducts
            issuedCertificates
        }
    }
`;

export const TODAY_TRANSPORT_STATUS_COUNTS = gql`
    query transportStatusCounts($dateRange: DateRangeInput!) {
        transportStatusCounts(dateRange: $dateRange) {
            id
            productName
            departureCount
            arrivalCount
            abnormalAlarmCount
        }
    }
`;

export const TRANSPORT_HISTORY_IN_PRODUCT = gql`
    query transportHistoryInProduct($uuid: String!) {
        transportHistoryInProduct(uuid: $uuid) {
            serial
            interval
            indexTime
            departureTime
            departureLocation
            inspectionTime
            inspectionLocation
            arrivalTime
            arrivalLocation
            temperature
            humidity
            shock
            productName
            departurePlaceName
            minTemperature
            maxTemperature
            minHumidity
            maxHumidity
            maxShock
            userName
            userPhone
            certificateStatusId
            alarmRangeStatusId
            transportStatusId
            mkt
        }
    }
`;

export const CERTIFICATE_BY_UUID = gql`
    query certificateByUUID($uuid: String!) {
        certificateByUUID(uuid: $uuid) {
            uuid
            certificateStatusId
            productName
            quantity
            size
            storageMethod
            manufacturerName
            manufacturerAddress
            manufactureNumber
            expirationDate
            sellerName
            sellerAddress
            packageMethod
            departureTime
            receiverName
            receiverAddress
            temperature
            arrivalTime
            sellerSignature
            receiverSignature
        }
    }
`;

export const CERTIFICATE_BY_UUID_MUTATION = gql`
    mutation certificateByUUIDInMutation($uuid: String!) {
        certificateByUUIDInMutation(uuid: $uuid) {
            uuid
            certificateStatusId
            productName
            quantity
            size
            storageMethod
            manufacturerName
            manufacturerAddress
            manufactureNumber
            expirationDate
            sellerName
            sellerAddress
            packageMethod
            departureTime
            receiverName
            receiverAddress
            temperature
            arrivalTime
            sellerSignature
            receiverSignature
        }
    }
`;

export const CERTIFICATE_BY_UUID_MOBILE = gql`
    query certificateByUUIDForMobile($uuid: String!, $token: String!) {
        certificateByUUIDForMobile(uuid: $uuid, token: $token) {
            uuid
            certificateStatusId
            productName
            quantity
            size
            storageMethod
            manufacturerName
            manufacturerAddress
            manufactureNumber
            expirationDate
            sellerName
            sellerAddress
            packageMethod
            departureTime
            receiverName
            receiverAddress
            temperature
            arrivalTime
            sellerSignature
            receiverSignature
        }
    }
`;
