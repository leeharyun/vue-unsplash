import axios from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';
import { unsplashAPIConfig } from '../../config/config.js';
import qs from 'qs';

export const http = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  },
  adapter: cacheAdapterEnhancer(axios.defaults.adapter, { enabledByDefault: false }),
});

let config = unsplashAPIConfig;

export const getToken = () => {
  let url = `https://unsplash.com/oauth/authorize?client_id=${config.key.accessKey}&redirect_uri=${config.redirect_uri}&response_type=${config.response_type}&scope=${config.scope}`;
  window.location.href = url;
};

export const setToken = (code) => {
  let data = {
    client_id: config.key.accessKey,
    client_secret: config.key.secretKey,
    redirect_uri: config.redirect_uri,
    code: code,
    grant_type: config.grant_type
  }

  return http.post('https://unsplash.com/oauth/token?' + qs.stringify(data));
};

export const getImages = (params) => {
  http.defaults.headers.common['Authorization'] = `Client-ID ${unsplashAPIConfig.key.accessKey}`;
  return http.get('/photos', {
    params : params
  });
}

export const getSearchImages = (params) => {
  http.defaults.headers.common['Authorization'] = `Client-ID ${unsplashAPIConfig.key.accessKey}`;
  return http.get('/search/photos', {
    params : params
  },
  { cache: true },
  );
}

export const likeImageAction = (id, token) => {
  http.defaults.headers.common['Authorization'] = token;
  return http.post(`/photos/${id}/like`);
}

export const unLikeImageAction = (id, token) => {
  http.defaults.headers.common['Authorization'] = token;
  return http.delete(`/photos/${id}/like`);
}

