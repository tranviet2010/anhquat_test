import MAsyncStorage from '../utilities/MAsyncStorage';
// import axios from 'axios';
import {create} from 'apisauce';

export const BASE_API = 'http://54.169.138.82/api/v1/';
export const IS_PUBLISH = true;
export const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
  POSTFORM: 'POSTFORM',
};

function getInstance(baseUrl, user) {
  return create({
    baseURL: baseUrl,
    timeout: 50000,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + user.token,
    },
  });
}
function getInstance2(baseUrl) {
  return create({
    baseURL: baseUrl,
    timeout: 50000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
function getInstance3(baseUrl, user) {
  return create({
    baseURL: baseUrl,
    timeout: 50000,
    headers: {
      'Content-Type': 'multipart/form-data',

      'Content-Disposition': 'form-data',
      Authorization: 'Bearer ' + user.token,
    },
  });
}

export function* execute(endpoint, method, params) {
  let response = undefined;
  const user = yield MAsyncStorage.getUserInfo();
  // const baseUrl = yield MAsyncStorage.getBaseUrl();
  console.log('execute', user);
  console.log('params', params);

  const baseUrl = BASE_API;
  if (user) {
    switch (method) {
      case Method.GET:
        response = yield getInstance(baseUrl, user).get(endpoint, params);
        break;
      case Method.POST:
        response = yield getInstance(baseUrl, user).post(endpoint, params);
        break;
      case Method.PUT:
        response = yield getInstance(baseUrl, user).put(endpoint, params);
        break;
      case Method.DELETE:
        response = yield getInstance(baseUrl, user).delete(
          endpoint,
          {},
          {data: params},
        );
        break;
      case Method.POSTFORM:
        response = yield getInstance3(baseUrl, user).post(endpoint, params);
        break;
      default:
        response = yield getInstance(baseUrl, user).get(endpoint, params);
        break;
    }
  } else {
    switch (method) {
      case Method.GET:
        response = yield getInstance2(baseUrl).get(endpoint, params);
        break;
      case Method.POST:
        response = yield getInstance2(baseUrl).post(endpoint, params);
        break;
      case Method.PUT:
        response = yield getInstance2(baseUrl).put(endpoint, params);
        break;
      case Method.DELETE:
        response = yield getInstance2(baseUrl).delete(endpoint, params);
        break;
      default:
        response = yield getInstance2(baseUrl).get(endpoint, params);
        break;
    }
  }

  console.log('Services Endpoint', endpoint);
  console.log('Services Response', response);
  return response;
}

export function* execute_customize_url(url, method, params) {
  console.log(url);
  console.log(params);

  let response = undefined;
  const user = yield MAsyncStorage.getUserInfo();
  switch (method) {
    case Method.GET:
      response = yield getInstance(url, user).get('', params);
      break;
    case Method.POST:
      response = yield getInstance(url, user).post('', {body: params});
      break;
    case Method.PUT:
      response = yield getInstance(url, user).put('', params);
      break;
    case Method.DELETE:
      response = yield getInstance(url, user).delete('', params);
      break;
    default:
      response = yield getInstance(url, user).get('', params);
      break;
  }
  console.log('Services Endpoint', url);
  console.log('Services Response', response);
  return response;
}
export const Services = {};
