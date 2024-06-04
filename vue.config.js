const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");

const TARGET_URL = "http://localhost:8080";

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    client: {
      overlay: false,
    },
    port: 8088,
    proxy: {
      "/": {
        // 전체 경로에 대해 프록시 설정 적용
        target: TARGET_URL,
        changeOrigin: true,
        pathRewrite: { "^/": "" }, // 모든 경로를 백엔드의 루트로 변경
        ws: false, // WebSocket 프록시 비활성화
      },
    },
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
      }),
    ],
  },
});
