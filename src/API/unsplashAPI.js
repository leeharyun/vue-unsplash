import axios from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';
import { unsplashAPIConfig } from '../../config/config.js';

const http = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Client-ID ${unsplashAPIConfig.key.accessKey}`,
    'Cache-Control': 'no-cache'
  },
  adapter: cacheAdapterEnhancer(axios.defaults.adapter, { enabledByDefault: false }),
});

export const getImages = (params) => {
  return http.get('/photos/', {
    params : params
  });
}

export const getSearchImages = (params) => {
  return http.get('/search/photos', {
    params : params
  },
  { cache: true },
  );
}

export const likeImageAction = (id) => {
  return http.post(`/photos/${id}/like`);
}

export const cancleLikeImageAction = (id) => {
  return http.delete(`/photos/${id}/like`);
}