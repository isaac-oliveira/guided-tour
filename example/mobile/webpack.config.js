const path = require('path');
const fs = require('fs');
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

const nodeModules = path.resolve(__dirname, '..', '..', 'node_modules');
const packages = path.resolve(__dirname, '..', '..', 'packages');

module.exports = async function (env, argv) {
    const config = await createExpoWebpackConfigAsync(env, argv);

    config.module.rules.push({
        test: /\.(js|ts|tsx)$/,
        include: /(packages|example)\/.+/,
        exclude: /node_modules/,
        use: 'babel-loader'
    });

    Object.assign(config.resolve.alias, {
        react: path.resolve(nodeModules, 'react'),
        'react-native': path.resolve(nodeModules, 'react-native-web'),
        'react-native-web': path.resolve(nodeModules, 'react-native-web'),
        '@expo/vector-icons': path.resolve(nodeModules, '@expo/vector-icons')
    });

    fs.readdirSync(packages)
        .filter((name) => !name.startsWith('.'))
        .forEach((name) => {
            const pak = require(`../packages/${name}/package.json`);

            if (pak.source == null) {
                return;
            }

            config.resolve.alias[pak.name] = path.resolve(
                packages,
                name,
                pak.source
            );
        });

    return config;
};
