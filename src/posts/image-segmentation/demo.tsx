import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'

// A small version of the iterative thresholding method from
// make_figures.py, run in the browser on the same kind of test image.

const N = 192
const SIGMA = 2

type State = {
  image: Float32Array
  mask: Uint8Array
  round: number
  changed: number | null
}

function random(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function testImage(seed: number) {
  const rand = random(seed)
  const image = new Float32Array(N * N)
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const px = x + 0.5
      const py = y + 0.5
      const sun = (px - 140) ** 2 + (py - 50) ** 2 < 24 ** 2
      const walls = px > 30 && px < 100 && py > 110 && py < 170
      const roof = py > 70 && py <= 110 && Math.abs(px - 65) < (py - 70) * 0.95
      const antenna = px > 84 && px < 87 && py > 40 && py < 90
      const speck = [
        [30, 30],
        [60, 45],
        [170, 140],
        [150, 175],
      ].some(([cx, cy]) => (px - cx) ** 2 + (py - cy) ** 2 < 2.5 ** 2)
      const clean = sun || walls || roof || antenna || speck ? 0.75 : 0.25
      // Box-Muller: Gaussian noise with standard deviation 0.2.
      const noise = Math.sqrt(-2 * Math.log(1 - rand())) * Math.cos(2 * Math.PI * rand())
      image[y * N + x] = clean + 0.2 * noise
    }
  }
  return image
}

const kernel = (() => {
  const radius = Math.ceil(4 * SIGMA)
  const weights = Array.from({ length: 2 * radius + 1 }, (_, i) =>
    Math.exp(-((i - radius) ** 2) / (2 * SIGMA ** 2))
  )
  const total = weights.reduce((a, b) => a + b, 0)
  return { radius, weights: weights.map((w) => w / total) }
})()

function mirror(i: number) {
  if (i < 0) return -i - 1
  if (i >= N) return 2 * N - i - 1
  return i
}

// Gaussian blur, one direction at a time, with mirrored edges.
function blur(input: Float32Array) {
  const { radius, weights } = kernel
  const rows = new Float32Array(N * N)
  const out = new Float32Array(N * N)
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      let sum = 0
      for (let k = -radius; k <= radius; k++) sum += weights[k + radius] * input[y * N + mirror(x + k)]
      rows[y * N + x] = sum
    }
  }
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      let sum = 0
      for (let k = -radius; k <= radius; k++) sum += weights[k + radius] * rows[mirror(y + k) * N + x]
      out[y * N + x] = sum
    }
  }
  return out
}

function oneRound(image: Float32Array, mask: Uint8Array, lambda: number) {
  const dt = SIGMA ** 2 / 2
  const weight = (2 * lambda * Math.sqrt(Math.PI)) / Math.sqrt(dt)
  const inside = new Float32Array(N * N)
  let sumIn = 0
  let sumOut = 0
  let countIn = 0
  for (let i = 0; i < N * N; i++) {
    inside[i] = mask[i]
    if (mask[i]) {
      sumIn += image[i]
      countIn++
    } else {
      sumOut += image[i]
    }
  }
  const meanIn = sumIn / Math.max(countIn, 1)
  const meanOut = sumOut / Math.max(N * N - countIn, 1)
  const blurredIn = blur(inside)
  const next = new Uint8Array(N * N)
  let changed = 0
  for (let i = 0; i < N * N; i++) {
    // The blur of the outside mask is 1 minus the blur of the inside mask.
    const scoreIn = (image[i] - meanIn) ** 2 + weight * (1 - blurredIn[i])
    const scoreOut = (image[i] - meanOut) ** 2 + weight * blurredIn[i]
    next[i] = scoreIn < scoreOut ? 1 : 0
    if (next[i] !== mask[i]) changed++
  }
  return { mask: next, changed }
}

function start(seed: number): State {
  const image = testImage(seed)
  const mask = new Uint8Array(N * N)
  for (let i = 0; i < N * N; i++) mask[i] = image[i] > 0.5 ? 1 : 0
  return { image, mask, round: 0, changed: null }
}

function draw(canvas: HTMLCanvasElement | null, values: (i: number) => [number, number, number]) {
  const context = canvas?.getContext('2d')
  if (!context) return
  const pixels = context.createImageData(N, N)
  for (let i = 0; i < N * N; i++) {
    const [r, g, b] = values(i)
    pixels.data.set([r, g, b, 255], i * 4)
  }
  context.putImageData(pixels, 0, 0)
}

export function SegmentationDemo() {
  const [seed, setSeed] = useState(1)
  const [lambda, setLambda] = useState(0.15)
  const [state, setState] = useState<State | null>(null)
  const imageCanvas = useRef<HTMLCanvasElement>(null)
  const maskCanvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => setState(start(seed)), [seed])

  useEffect(() => {
    if (!state) return
    draw(imageCanvas.current, (i) => {
      const v = Math.round(255 * Math.min(1, Math.max(0, state.image[i])))
      return [v, v, v]
    })
    draw(maskCanvas.current, (i) => (state.mask[i] ? [250, 247, 240] : [18, 23, 33]))
  }, [state])

  const settled = state?.changed === 0

  function step() {
    setState((current) => {
      if (!current) return current
      const { mask, changed } = oneRound(current.image, current.mask, lambda)
      return { ...current, mask, changed, round: current.round + 1 }
    })
  }

  function runToEnd() {
    setState((current) => {
      if (!current) return current
      let next = current
      for (let i = 0; i < 100; i++) {
        const { mask, changed } = oneRound(next.image, next.mask, lambda)
        next = { ...next, mask, changed, round: next.round + 1 }
        if (changed === 0) break
      }
      return next
    })
  }

  function restart(newSeed = seed) {
    if (newSeed === seed) setState(start(seed))
    else setSeed(newSeed)
  }

  let status = 'Round 0: every pixel picks its side on its own.'
  if (state && state.round > 0) {
    status = settled
      ? `Settled after ${state.round - 1} rounds. No pixel wants to switch.`
      : `Round ${state.round}: ${state.changed?.toLocaleString('en-US')} pixels switched sides.`
  }

  return (
    <div className="seg-demo">
      <div className="grid grid-cols-2 gap-3">
        <figure>
          <canvas ref={imageCanvas} width={N} height={N} aria-label="Noisy test image" />
          <figcaption>Noisy image</figcaption>
        </figure>
        <figure>
          <canvas ref={maskCanvas} width={N} height={N} aria-label="Current regions" />
          <figcaption>Regions</figcaption>
        </figure>
      </div>
      <p className="seg-demo-status" aria-live="polite">
        {status}
      </p>
      <label className="seg-demo-slider">
        <span>
          Boundary weight λ = <strong>{lambda.toFixed(2)}</strong>
        </span>
        <input
          type="range"
          min={0.02}
          max={0.5}
          step={0.01}
          value={lambda}
          onChange={(event) => {
            setLambda(Number(event.target.value))
            setState((current) => current && { ...current, changed: null })
          }}
        />
      </label>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" onClick={step} disabled={!state || settled}>
          One round
        </Button>
        <Button size="sm" variant="secondary" onClick={runToEnd} disabled={!state || settled}>
          Run until it settles
        </Button>
        <Button size="sm" variant="secondary" onClick={() => restart()}>
          Start over
        </Button>
        <Button size="sm" variant="ghost" onClick={() => restart(seed + 1)}>
          New noise
        </Button>
      </div>
    </div>
  )
}
