// unsplash API
export let unsplashAPIConfig = {
    key: {
        accessKey: 'YOUR ACCESS KEY',
        secretKey: 'YOUR SECRET KEY'
    },
    redirect_uri: 'http://localhost/auth',
    response_type: 'code',
    scope: 'public+write_likes',
    grant_type: 'authorization_code',
};
