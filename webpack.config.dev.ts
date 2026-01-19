import { merge } from 'webpack-merge';
import ESLintPlugin from 'eslint-webpack-plugin';
import commonConfig from './webpack.config.common';

import type { Configuration as WebpackConfiguration } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

type Configuration = WebpackConfiguration & {
  devServer?: DevServerConfiguration;
};

const config: Configuration = merge(commonConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 3000,
    hot: true,
    open: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['js', 'ts'],
      emitWarning: true,
      failOnError: false,
    }),
  ],
})

export default config;