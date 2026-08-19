# Drop your project media here

1. Drag an image or video into this folder.
2. Open `lib/content.ts`, find the project, set `media` to the file name.

```ts
media: "adeguard.png"   // image
media: "twinmind.mp4"   // video, autoplays muted and loops
media: ""               // shows an empty slot with these instructions
```

Supported: `.png` `.jpg` `.jpeg` `.webp` `.avif` `.gif` `.mp4` `.webm` `.mov`

For video you can also set `poster: "twinmind-poster.png"` so there is
something to look at before the clip loads.

## Sizing

The first project in the array renders at 16:9, the rest at 4:3. Anything
gets cropped to fit, centred. Aim for roughly:

- featured: 1600 x 900
- the rest: 1200 x 900

Videos: keep them under ~5 MB and a few seconds long. They are decoration,
not a demo reel, and every visitor downloads them.
