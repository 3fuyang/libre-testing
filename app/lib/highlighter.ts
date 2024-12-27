import { createHighlighterCore } from 'shiki/core'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'

export const highlighterPromise = createHighlighterCore({
  themes: [
    import('shiki/themes/github-light.mjs'),
    import('shiki/themes/github-dark.mjs'),
  ],
  langs: [import('shiki/langs/typescript.mjs')],
  engine: createOnigurumaEngine(import('shiki/wasm')),
})
