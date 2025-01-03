import type { Options } from 'canvas-confetti'

const canvasConfetti = import('canvas-confetti')

export function triggerConfetti() {
  const count = 200
  const defaults = {
    origin: { y: 0.7 },
  } satisfies Options

  function fire(particleRatio: number, opts: Options) {
    canvasConfetti.then(({ default: confetti }) =>
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      }),
    )
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  })
  fire(0.2, {
    spread: 60,
  })
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  })
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  })
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  })
}
