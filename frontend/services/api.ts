import axios from 'axios';

const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
} as any;

const HEADERS_MULTIPLE_PART = {
  ...HEADERS,
  'Content-Type': 'multipart/form-data; boundary=something',
  Accept: 'application/json',
};

export const getToken = (token: any) => {
  HEADERS['Authorization'] = `Bearer ${token}`;
  HEADERS_MULTIPLE_PART['Authorization'] = `Bearer ${token}`;
};

const getFullUrl = (url: string) => {
  if (!url.startsWith('/')) {
    url = '/' + url;
  }
  console.log(`${process.env.NEXT_PUBLIC_API}` + url);
  return `${process.env.NEXT_PUBLIC_API}` + url;
};

const api = {
  post: (endpoint: string, params?: any) => {
    return axios.post(getFullUrl(endpoint), params, {
      headers: HEADERS,
    });
  },

  postMultiplePart: (endpoint: string, params?: any) => {
    return axios.post(getFullUrl(endpoint), params, {
      headers: HEADERS_MULTIPLE_PART,
    });
  },

  get: (endpoint: string, params: any = {}) => {
    return axios.get(getFullUrl(endpoint), {
      params: params,
      headers: HEADERS,
    });
  },

  put: (endpoint: string, params?: any) => {
    return axios.put(getFullUrl(endpoint), params, {
      headers: HEADERS,
    });
  },

  patch: (endpoint: string, params?: any) => {
    return axios.patch(getFullUrl(endpoint), params, {
      headers: HEADERS,
    });
  },

  delete: (endpoint: string, params: any) => {
    return axios.delete(getFullUrl(endpoint), {
      data: params,
      headers: HEADERS,
    });
  },
};

const apiCustom = {
  get: (endpoint: string, params: any = {}) => {
    return axios.get(endpoint, {
      params: params,
      headers: HEADERS,
    });
  },
};

export { api, apiCustom };
