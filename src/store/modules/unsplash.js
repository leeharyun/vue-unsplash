import * as unsplashAPI from '@/API/unsplashAPI.js';

export const unsplash = {
    namespaced: true,
    state: () => ({
        images: [],
        totalImages: 0,
        per_page: 10
    }),
    mutations: {
        SET_IMAGES(state, images) {
            state.images = images;
        },
        TOTAL_IMAGES(state, images) {
            state.totalImages = images;
        },
        SET_LOAD_STATE(state, value) {
            state.loadState = value;
        }
    },
    actions: {
        getImages({ commit, state }, { page, per_page = state.per_page, order_by = 'latest' }) {
            let params = {
                page: page,
                per_page: per_page,
                order_by: order_by
            };            
            unsplashAPI
                .getImages(params)
                .then((res) => {
                    console.log(res);
                    commit('SET_IMAGES', res.data);
                    commit('TOTAL_IMAGES', res.headers['x-total']);
                })
                .catch((err) => {
                    console.log(`ERROR : ${err}`);
                });
        },
        getSearchImages({ commit, state }, { page, per_page = state.per_page, order_by = 'latest', query = "" }) {
            let params = {
                page: page,
                per_page: per_page,
                order_by: order_by,
                query: query
            };
            unsplashAPI
                .getSearchImages(params)
                .then((res) => {
                    commit('SET_IMAGES', res.data.results);
                    commit('TOTAL_IMAGES', res.headers['x-total']);
                })
                .catch((err) => {
                    console.log(`ERROR : ${err}`); 
                });
        },
        likeImageAction({ commit }, id) {
            unsplashAPI
                .likeImageAction(id)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(`ERROR : ${err}`); 
                });
        }
    },
    getters: {
        getImages: (state) => {
            return state;
        }
    },
};