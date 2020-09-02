module.exports = function config(api) {
    const presets = [
        [
            '@babel/preset-env',
            {
                useBuiltIns: false,
                targets: {
                    browsers: ['last 10 versions', 'ie >= 9']
                }
            }
        ]
    ];
    const plugins = [
        [
            '@babel/plugin-transform-runtime',
            {
                corejs: 3
            }
        ]
    ];

    api.cache(true);
    return {
        presets,
        plugins
    };
};
