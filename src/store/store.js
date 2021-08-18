import { createStore } from 'vuex';

import { unsplash } from './modules/unsplash.js';

export default createStore({
  modules: {
    unsplash
  }
});
