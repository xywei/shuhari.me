"""Make the social preview art for the series introduction.

722 small pages, one for each manuscript in OpenAI's October 6, 2026
release, with one page lit up: the one somebody explained.

    python3 src/posts/papers-explained/make_share_art.py
"""

from pathlib import Path

from PIL import Image, ImageDraw

OUT = Path(__file__).parent
SIZE = 630
SUPER = 3  # draw large, then shrink, for smooth edges
COUNT = 722
COLS = ROWS = 27  # 27 x 27 = 729, so the last row is short
LIT = (17, 9)

INK = (9, 20, 35)
PAGE = (36, 52, 72)
LINE = (52, 70, 92)
AMBER = (218, 158, 63)
AMBER_LINE = (250, 236, 205)


def main():
    s = SIZE * SUPER
    image = Image.new("RGB", (s, s), INK)
    draw = ImageDraw.Draw(image)
    margin = 28 * SUPER
    cell_w = cell_h = (s - 2 * margin) / COLS
    pad_x, pad_y = cell_w * 0.17, cell_h * 0.08
    for row in range(ROWS):
        for col in range(COLS):
            if row * COLS + col >= COUNT:
                break
            lit = (col, row) == LIT
            x0, y0 = margin + col * cell_w + pad_x, margin + row * cell_h + pad_y
            x1, y1 = x0 + cell_w - 2 * pad_x, y0 + cell_h - 2 * pad_y
            draw.rectangle([x0, y0, x1, y1], fill=AMBER if lit else PAGE)
            # A few lines of "text" on each page.
            for k in range(4):
                ly = y0 + (y1 - y0) * (0.2 + 0.17 * k)
                lx1 = x1 - (x1 - x0) * (0.2 if k < 3 else 0.45)
                draw.line(
                    [(x0 + (x1 - x0) * 0.2, ly), (lx1, ly)],
                    fill=AMBER_LINE if lit else LINE,
                    width=SUPER,
                )
    image.resize((SIZE, SIZE), Image.LANCZOS).save(OUT / "share-art.png", optimize=True)


if __name__ == "__main__":
    main()
