import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const trpcServiceUrl = '/api/trpc-service';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  server: {
    proxy: {
      [trpcServiceUrl]: {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) =>
          path.startsWith(trpcServiceUrl)
            ? path.replace(trpcServiceUrl, '')
            : path,
      },
    },
  },
});
