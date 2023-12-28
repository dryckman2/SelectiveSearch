module.exports = function override(config) {
    // Add your overrides here
    config.resolve.fallback = {
        zlib: false,
        querystring: false,
        path: false,
        crypto: false,
        fs: false,
        stream: false,
        http: false,
        timers: false,
    };
    return config;
};