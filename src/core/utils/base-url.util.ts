import { HTTPS_BASE_URL, HTTP_BASE_URL } from '../constants/request.service.constants';

const getBaseUrl = (): string => (window.location.href.includes('https') ? HTTPS_BASE_URL : HTTP_BASE_URL);

export default getBaseUrl;
