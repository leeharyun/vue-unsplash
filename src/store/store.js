import { createStore } from 'vuex';

import { unsplash } from './modules/unsplash.js';
import createPersistedState from "vuex-persistedstate";

export default createStore({
  modules: {
    unsplash
  },
  plugins: [createPersistedState({
    paths: ['unsplash'],
  })],
});
