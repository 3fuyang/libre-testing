import { partytownVite } from '@builder.io/partytown/utils';
import { defineConfig } from '@tanstack/start/config';
import path from 'node:path';
import tsConfigPaths from 'vite-tsconfig-paths';

const ReactCompilerConfig = {
  target: '19', // '17' | '18' | '19'
}

const isProd = process.env.NODE_ENV === 'production'

// https://vitejs.dev/config/
export default defineConfig({
  react: {
    babel: {
      plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
    },
  },
  vite: {
    plugins: [
      isProd ? partytownVite({
        dest: path.join(import.meta.dirname, '.output/public', '~partytown'),
      }) : undefined,
      tsConfigPaths({
        projects: ['./tsconfig.json']
      })
    ],
    // Workers are handled in a completely separate build process,
    // so that required plugins should be specified explicitly.
    worker: {
      plugins: () => [
        tsConfigPaths({
          projects: ['./tsconfig.json']
        })
      ]
    }
  },
})
