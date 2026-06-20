"""Create a transparent-background version of the SAsya's logo so it sits
cleanly on the dark deck (the source is a white-background JPG)."""
from PIL import Image
import os

SRC = os.path.join("src", "assets", "sasyas-logo.png")  # white-bg source
OUT = os.path.join("src", "assets", "sasyas-logo-transparent.png")
OUT_PUB = os.path.join("public", "assets", "sasyas-logo-transparent.png")

img = Image.open(SRC).convert("RGBA")
px = img.load()
w, h = img.size

# Make near-white pixels transparent; feather edges by alpha based on brightness.
# Recolor the dark (near-black) tagline to a light tone so it reads on a dark deck.
THRESH = 232
LIGHT = (201, 212, 227)  # soft ice-gray for the tagline on dark backgrounds
for y in range(h):
    for x in range(w):
        r, g, b, a = px[x, y]
        mn = min(r, g, b)
        mx = max(r, g, b)
        if r >= THRESH and g >= THRESH and b >= THRESH:
            px[x, y] = (r, g, b, 0)  # white background -> transparent
        elif mx < 110 and (mx - mn) < 40:
            # near-neutral dark (the black tagline) -> light, keep its darkness as alpha
            px[x, y] = (*LIGHT, 255)
        elif mn >= 200:
            # soft edge: fade alpha as the pixel approaches white
            alpha = int(max(0, (255 - mn)) / (255 - 200) * 255)
            px[x, y] = (r, g, b, alpha)

# Crop to the logo's bounding box to remove empty margins.
bbox = img.getbbox()
if bbox:
    img = img.crop(bbox)

img.save(OUT)
os.makedirs(os.path.dirname(OUT_PUB), exist_ok=True)
img.save(OUT_PUB)
print("saved", img.size)
