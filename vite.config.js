import path from "path";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default ({ command, mode }) => {
  const envConfig = loadEnv(mode, "./");
  const TARGET = envConfig.VITE_APP_TARGET;
  const JAVA_TARGET = envConfig.VITE_APP_JAVA_TARGET;
  const PROXY_COOKIE = "";
  return defineConfig({
    base: "./",
    server: {
      host: "0.0.0.0",
      port: "8000",
      proxy: {
        "/api/iot": {
          target: JAVA_TARGET,
          changeOrigin: true,
          rewrite: (path) => path,
        },
      },
    },
    preview: {
      port: 8080,
      proxy: {
        "/api/iot": {
          target: TARGET,
          changeOrigin: true,
          rewrite: (path) => path,
          onProxyReq(proxyReq) {
            proxyReq.setHeader("Cookie", PROXY_COOKIE);
          },
        },
      },
    },
    build: {
      assetsDir: "static/img/",
      rollupOptions: {
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name].[ext]",
        },
      },
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        comps: path.resolve(__dirname, "src/components"),
        views: path.resolve(__dirname, "src/views"),
        apis: path.resolve(__dirname, "src/apis"),
        styles: path.resolve(__dirname, "src/styles"),
        assets: path.resolve(__dirname, "public/assets"),
        utils: path.resolve(__dirname, "src/utils"),
        plugins: path.resolve(__dirname, "src/plugins"),
      },
      extensions: [".vue", ".js", ".json"],
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  });
};
