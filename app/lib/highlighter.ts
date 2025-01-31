import { createHighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'

export const highlighterPromise = createHighlighterCore({
  themes: [
    import('@shikijs/themes/github-light'),
    import('@shikijs/themes/github-dark'),
  ],
  langs: [import('@shikijs/langs/typescript')],
  engine: createJavaScriptRegexEngine(),
})
