/* eslint-disable react-hooks/rules-of-hooks,@typescript-eslint/no-var-requires */
const path = require('path');
const { override, overrideDevServer, useBabelRc, addWebpackPlugin, addWebpackModuleRule } = require('customize-cra');
const CopyPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  webpack: override(
    useBabelRc(),
    addWebpackPlugin(
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, './../../node_modules/@metamask/contract-metadata/images/'),
            to: 'images/contract/',
          },
        ],
      })
    ),
    addWebpackModuleRule({
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [
        { loader: 'babel-loader' },
        {
          loader: '@linaria/webpack-loader',
          options: {
            cacheDirectory: 'src/.linaria_cache',
            sourceMap: isDev,
          },
        },
      ],
    }),
    addWebpackModuleRule({
      test: /-icon\.svg$/,
      use: ['@svgr/webpack'],
    })
  ),
  devServer: overrideDevServer((config) => {
    config.writeToDisk = (filePath) => {
      return filePath.indexOf('images/contract') !== -1; // /images\/contract\//.test(filePath);
    };

    return config;
  }),
};
