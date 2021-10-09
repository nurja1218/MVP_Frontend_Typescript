/**
 * Static Backend Configs
 */
const BACKEND_URI = 'mvp-backend-dev.willog.io';
const ENDPOINT = '/graphql';
const ROOT_PORT = 9000;
const COMPANY_PORT = 443;
const getBackendPort = (type) => (type === 'root' ? ROOT_PORT : COMPANY_PORT);

export { BACKEND_URI, getBackendPort, ENDPOINT };
