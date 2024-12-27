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
  },
})
