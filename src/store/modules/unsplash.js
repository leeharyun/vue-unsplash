import * as unsplashAPI from '@/API/unsplashAPI.js';
import { unsplashAPIConfig } from '../../../config/config.js';
import partials from '../partials';


export const unsplash = {
    namespaced: true,
    state: () => ({
        images: [],
        totalImages: 0,
        per_page: 10,
        loadState: partials.LOAD_STATE.LOADING,
        Authorization: `Client-ID ${unsplashAPIConfig.key.accessKey}`,
        token : {}
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
        },
        SET_TOKEN(state, tokenValue){
            state.token = tokenValue;
            state.Authorization = `Bearer ${tokenValue.access_token}`
            //console.log()
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
                    commit('SET_LOAD_STATE', partials.LOAD_STATE.SUCCESS)
                })
                .catch((err) => {
                    commit('SET_LOAD_STATE', partials.LOAD_STATE.ERROR)
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
                    commit('SET_LOAD_STATE', partials.LOAD_STATE.SUCCESS)
                })
                .catch((err) => {
                    commit('SET_LOAD_STATE', partials.LOAD_STATE.ERROR)
                    console.log(`ERROR : ${err}`); 
                });
        },
        likeImageAction({ commit, state }, id) {
            unsplashAPI
                .likeImageAction(id, `Bearer ${state.Authorization}`)
                .then((res) => {
                    console.log(res);

                    /*console.log(res);
                    commit('SET_LOAD_STATE', partials.LOAD_STATE.SUCCESS)*/
                })
                .catch((err) => {
                    //console.log(err.request.status)
                    if(err.request.status === 401) {
                        unsplashAPI
                            .getToken();
                    }
                    //commit('SET_LOAD_STATE', partials.LOAD_STATE.ERROR)
                    console.log(`ERROR : ${err}`); 
                });
        },
        unLikeImageAction({ commit }, id) {
            unsplashAPI
                .unLikeImageAction(id)
                .then((res) => {
                    console.log(res);
                    commit('SET_LOAD_STATE', partials.LOAD_STATE.SUCCESS)
                })
                .catch((err) => {
                    if(err.request.status === 401) {
                        unsplashAPI
                            .getToken();
                    }
                    //commit('SET_LOAD_STATE', partials.LOAD_STATE.ERROR)
                    console.log(`ERROR : ${err}`); 
                });
        },
        getToken({ commit }) {
            unsplashAPI
                .getToken();
        },
        setToken({ commit }, code) {
            unsplashAPI
                .setToken(code)
                .then((res) => {
                    if(res.status === 200) {
                        console.log(res);
                        commit('SET_TOKEN', res.data);
                        window.location.href = '/';
                    }  
                })
                .catch((err) => {
                    console.log(`ERROR : ${err}`); 
                });
        },
    },
    getters: {
        getAuthorization: state => {
            return state.Authorization
        }
    }
};