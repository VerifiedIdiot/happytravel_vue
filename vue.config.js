const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

const TARGET_URL = 'http://localhost:80';

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    client: {
      overlay: false,
    },
    port: 8088,
    proxy: {
      '/': {
        target: TARGET_URL,
        changeOrigin: true,
        pathRewrite: { '^/': '' },
        ws: false, // WebSocket 비활성화
      },
    },
    webSocketServer: false, // WebSocket 서버 비활성화
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
      }),
    ],
  },
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: [require('tailwindcss'), require('autoprefixer')],
        },
      },
    },
  },
  outputDir: '../happytravel_spring/src/main/resources/static',
});
