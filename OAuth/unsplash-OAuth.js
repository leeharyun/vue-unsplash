import { unsplashAPIConfig } from '../config/config.js';

let config = unsplashAPIConfig;

export let getUnsplashOAuthToken = () => {
    let url = `https://unsplash.com/oauth/authorize?client_id=${config.key.accessKey}&redirect_uri=${config.redirect_uri}&response_type=${config.response_type}&scope=${config.scope}`;
    let win = window.open(url, name, specs, replace);

    //window.location.href = url;
};

export let setUnsplashOAuthToken = () => {

};

/*class UnsplashOAuthParams {
    constructor() {
        this.client_id = unsplashAPIConfig.key.accessKey,
        this.client_secret = unsplashAPIConfig.key.secretKey,
        this.redirect_uri = unsplashAPIConfig.redirect_uri,
        this.code = null,
        this.response_type = unsplashAPIConfig.response_type,
        this.scope = unsplashAPIConfig.scope,
        this.grant_type = unsplashAPIConfig.grant_type;
    }
}

export class UnsplashOAuth extends UnsplashOAuthParams{
    constructor() {
        super();
    }

    setUnsplashOAuthToken() {
        
    }
}*/