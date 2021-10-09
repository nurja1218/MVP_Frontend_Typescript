import gql from 'graphql-tag';

export const LOGOUT = gql`
    mutation logout {
        logout
    }
`;

export const CREATE_PRODUCT = gql`
    mutation createProduct($product: ProductCreateInput!) {
        createProduct(product: $product) {
            success
            failedSerials
        }
    }
`;

export const CREATE_ACCOUNT = gql`
    mutation createUser($user: UserCreateInput!) {
        createUser(user: $user) {
            id
            name
            phone
            email
            roleId
            companyId
        }
    }
`;

export const MODIFY_PRODUCT = gql`
    mutation modifyProduct($product: ProductModifyInput!, $id: ID!) {
        modifyProduct(product: $product, id: $id)
    }
`;

export const MODIFY_USER = gql`
    mutation modifyUser($user: UserModifyInput!, $id: ID!) {
        modifyUser(user: $user, id: $id)
    }
`;

export const MODIFY_USER_AND_COMPANY = gql`
    mutation modifyUserAndCompany($company: CompanyModifyInput!, $user: UserModifyInput!) {
        modifyUserAndCompany(company: $company, user: $user)
    }
`;

export const CHANGE_PASSWORD = gql`
    mutation changePassword($passwords: PasswordChangeInput!) {
        changePassword(passwords: $passwords)
    }
`;

export const DELETE_USER = gql`
    mutation deleteUser($id: ID!) {
        deleteUser(id: $id)
    }
`;

export const DELETE_PRODUCT = gql`
    mutation deleteProduct($id: ID!) {
        deleteProduct(id: $id)
    }
`;
