import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ["@babel/plugin-proposal-decorators", {legacy: true}],
          ["@babel/plugin-proposal-class-properties", {loose: true}],
        ],
      },
    }),
  ],
  server: {
    // 指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。
    host: "0.0.0.0",
    // 开发服务器启动时，自动在浏览器中打开应用程序。
    open: false,
    // 为开发服务器配置 CORS。
    cors: true,
    /** 端口被占用时，是否直接退出 */
    strictPort: false,
    // Load proxy configuration from .env.development   为开发服务器配置自定义代理规则。
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
        bypass(req, res, options) {
          /**
           *
           */
          const proxyUrl = new URL(options.rewrite(req.url) || '', (options.target) as string)?.href || '';
          console.log(proxyUrl);
          req.headers["x-req-proxyUrl"] = proxyUrl;
          res.setHeader("x-req-proxyUrl", proxyUrl);
        }
      }
    }
  },
  define: {
    'process.env': {}
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    },
  }
})
