# Drop your project media here

1. Drag an image or video into this folder.
2. Open `lib/content.ts`, find the project, set `media` to the file name.

```ts
media: "adeguard.svg"   // image
media: "twinmind.mp4"   // video, autoplays muted and loops
media: ""               // shows an empty slot with these instructions
```

Supported: `.svg` `.png` `.jpg` `.jpeg` `.webp` `.avif` `.gif` `.mp4` `.webm` `.mov`

For video you can also set `poster: "twinmind-poster.png"` so there is
something to look at before the clip loads.

## Sizing

Every project renders at 16:9 without cropping. Aim for:

- SVG: a 2560 x 1440 viewBox
- raster images: at least 1600 x 900

Videos: keep them under ~5 MB and a few seconds long. They are decoration,
not a demo reel, and every visitor downloads them.
