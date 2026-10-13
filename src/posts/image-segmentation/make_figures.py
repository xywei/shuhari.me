"""Make the figures for the image segmentation post.

Runs the iterative thresholding method of Wang, Li, Wei and Wang
(arXiv:1608.01431) on a synthetic test image, so every figure is original.

    python3 src/posts/image-segmentation/make_figures.py
"""

from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw

OUT = Path(__file__).parent
N = 192
SCALE = 2  # each pixel is drawn as a SCALE x SCALE block
GAP = 12

rng = np.random.default_rng(1608)


def test_image():
    """A sun, a house with an antenna, and a few specks, on a dark sky."""
    y, x = np.mgrid[0:N, 0:N] + 0.5
    clean = np.full((N, N), 0.25)
    clean[(x - 140) ** 2 + (y - 50) ** 2 < 24**2] = 0.75  # sun
    clean[(x > 30) & (x < 100) & (y > 110) & (y < 170)] = 0.75  # house walls
    roof = (y > 70) & (y <= 110) & (np.abs(x - 65) < (y - 70) * 0.95)
    clean[roof] = 0.75
    clean[(x > 84) & (x < 87) & (y > 40) & (y < 90)] = 0.75  # antenna
    for cx, cy in [(30, 30), (60, 45), (170, 140), (150, 175)]:
        clean[(x - cx) ** 2 + (y - cy) ** 2 < 2.5**2] = 0.75  # specks
    noisy = clean + rng.normal(0, 0.2, clean.shape)  # variance 0.04, as in the paper
    return clean, noisy


def blur(u, sigma):
    """Gaussian blur (heat kernel) via FFT, with mirrored edges."""
    pad = int(4 * sigma) + 1
    v = np.pad(u, pad, mode="reflect")
    ky = np.fft.fftfreq(v.shape[0])[:, None]
    kx = np.fft.fftfreq(v.shape[1])[None, :]
    kernel_hat = np.exp(-2 * np.pi**2 * sigma**2 * (kx**2 + ky**2))
    return np.real(np.fft.ifft2(np.fft.fft2(v) * kernel_hat))[pad:-pad, pad:-pad]


def segment(f, u, lam, sigma, max_iter=100):
    """Two-phase iterative thresholding. u is the 0/1 mask of phase 1.

    The heat kernel G_dt has standard deviation sqrt(2 dt), so dt = sigma^2 / 2.
    Returns every iterate and the approximate energy of each.
    """
    dt = sigma**2 / 2
    weight = 2 * lam * np.sqrt(np.pi) / np.sqrt(dt)
    masks, energies = [u], []
    for _ in range(max_iter):
        phases = [u, 1 - u]
        means = [np.sum(p * f) / max(np.sum(p), 1) for p in phases]
        fits = [(c - f) ** 2 for c in means]
        blurred = [blur(p, sigma) for p in phases]
        energies.append(
            sum(np.sum(p * g) for p, g in zip(phases, fits))
            + weight / 2 * sum(np.sum(p * (1 - b)) for p, b in zip(phases, blurred))
        )
        scores = [g + weight * (1 - b) for g, b in zip(fits, blurred)]
        new_u = (scores[0] < scores[1]).astype(float)
        masks.append(new_u)
        if np.array_equal(new_u, u):
            break
        u = new_u
    return masks, energies


def gray(a):
    return np.clip(a, 0, 1)


def mask_rgb(u):
    ink, paper = np.array([0.07, 0.09, 0.13]), np.array([0.98, 0.97, 0.94])
    return np.where(u[..., None] > 0.5, paper, ink)


def save_row(panels, name):
    """Save panels side by side, with transparent gaps so they suit both themes."""
    tiles = []
    for p in panels:
        p = p if p.ndim == 3 else np.repeat(gray(p)[..., None], 3, axis=2)
        p = np.concatenate([p, np.ones(p.shape[:2] + (1,))], axis=2)
        tiles.append(np.kron(p, np.ones((SCALE, SCALE, 1))))
    spacer = np.zeros((tiles[0].shape[0], GAP, 4))
    row = np.concatenate([x for t in tiles for x in (t, spacer)][:-1], axis=1)
    Image.fromarray((row * 255).astype(np.uint8), "RGBA").save(OUT / name, optimize=True)


def save_share_art(noisy, result, name, size=630):
    """Square art for social preview cards: the noisy input above the
    diagonal, the result below it, split by an amber line."""
    before = np.repeat(gray(noisy)[..., None], 3, axis=2)
    after = mask_rgb(result)
    y, x = np.mgrid[0:N, 0:N]
    art = np.where((x > y)[..., None], before, after)
    image = Image.fromarray((art * 255).astype(np.uint8), "RGB").resize((size, size), Image.NEAREST)
    amber = (218, 158, 63)
    ImageDraw.Draw(image).line([(0, 0), (size, size)], fill=amber, width=8)
    image.save(OUT / name, optimize=True)


def main():
    clean, f = test_image()
    sigma = 2.0
    truth = clean > 0.5

    # Start from the naive answer: a plain per-pixel threshold.
    naive = (f > 0.5).astype(float)
    masks, energies = segment(f, naive, lam=0.15, sigma=sigma)

    # Figure 1: the noisy input, the naive threshold, and the method's result.
    save_row([f, mask_rgb(naive), mask_rgb(masks[-1])], "noisy-naive-result.png")

    # Figure 2: the regions after 0, 1 and 2 rounds, and at the end.
    picks = [0, 1, 2, len(masks) - 1]
    save_row([mask_rgb(masks[i]) for i in picks], "iterations.png")

    # Figure 3: the boundary-length weight lambda trades detail for smoothness.
    lams = (0.03, 0.15, 0.4)
    results = [segment(f, naive, lam, sigma)[0][-1] for lam in lams]
    save_row([mask_rgb(u) for u in results], "lambda.png")

    # Art for the social preview card (used by meta.social in the post).
    # A higher lambda than the main run gives a cleaner picture at this size.
    save_share_art(f, segment(f, naive, 0.3, sigma)[0][-1], "share-art.png")

    print("rounds:", len(masks) - 1)
    print("energy never increases:", all(b <= a + 1e-9 for a, b in zip(energies, energies[1:])))
    print("wrong pixels, naive:", int(np.sum((naive > 0.5) != truth)))
    for i in picks:
        print(f"wrong pixels after round {i}:", int(np.sum((masks[i] > 0.5) != truth)))
    for lam, u in zip(lams, results):
        print(f"wrong pixels, lambda {lam}:", int(np.sum((u > 0.5) != truth)))


if __name__ == "__main__":
    main()
