import { defineConfig } from '@tanstack/start/config'
import tsConfigPaths from 'vite-tsconfig-paths'

const ReactCompilerConfig = {
  target: '19', // '17' | '18' | '19'
}

// https://vitejs.dev/config/
export default defineConfig({
  react: {
    babel: {
      plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
    },
  },
  vite: {
    plugins: [
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
