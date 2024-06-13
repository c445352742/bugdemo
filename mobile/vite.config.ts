import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import Components from 'unplugin-vue-components/vite';

// VITE_BASE_URL
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    build: {
      chunkSizeWarningLimit: 600
    },
    plugins: [
      vue(),
      legacy(),
      Components({
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
        }
      }
    },
    server: {
      host: "0.0.0.0",
      port: 8001,
      open: false,
      proxy: {
        '/api': {
          // target: `http://39.101.197.185:8085`,
          target: `http://192.168.116.130:8085`,
          changeOrigin: true,
          // changeOrigin: false,
          rewrite: (path) => {
            return path.replace(/^\/api/, '/api');
          },
          bypass: (req, res, options) => {
            let url = req.url;
            // let url='192.168.116.130'
            let str = `[Proxy][${req.method}]${url} -> ${options.target + url}`;
            console.log(str)
          }
        },
        '/ws': {
          // target: `ws://39.101.197.185:8085`,
          target: `ws://192.168.116.130:8085`,
          changeOrigin: true,
          ws: true,
        }
      }
    }
  }
})
