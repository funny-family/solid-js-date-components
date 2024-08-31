import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import inspect from 'vite-plugin-inspect';
import solidDevtools from 'solid-devtools/vite';
import url from 'node:url';

const resolvePath = (p: string) => {
  return url.fileURLToPath(new URL(p, import.meta.url));
};

export default defineConfig({
  base: './',
  plugins: [
    inspect(),
    solidDevtools({
      autoname: true,
      locator: {
        targetIDE: 'vscode',
        componentLocation: true,
        jsxLocation: true,
      },
    }),
    solidPlugin({
      include: ['src/**/*', resolvePath('../lib/**/*')],
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
  ],
  resolve: {
    alias: {
      '@src': resolvePath('./src/'),
      '@lib': resolvePath('../lib/'),
    },
  },
  build: {
    target: 'esnext',
    outDir: resolvePath('../docs'),
  },
  server: {
    port: 2311,
    strictPort: true,
  },
});
