import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

import { isVideo, spansFullRow } from "../lib/layout.ts";

test("isVideo picks video extensions, case insensitive", () => {
  for (const file of ["a.mp4", "a.webm", "a.mov", "a.m4v", "A.MP4"]) {
    assert.equal(isVideo(file), true, file);
  }
  for (const file of ["a.png", "a.jpg", "a.jpeg", "a.webp", "a.gif", "mp4.png", ""]) {
    assert.equal(isVideo(file), false, file);
  }
});

test("the grid never ends on an empty cell", () => {
  // 1 leftover: it spans the whole row on its own.
  assert.deepEqual([0].map((i) => spansFullRow(i, 1)), [true]);
  // 2 leftovers: they pair up.
  assert.deepEqual([0, 1].map((i) => spansFullRow(i, 2)), [false, false]);
  // 3 leftovers: two pair up, the third widens.
  assert.deepEqual([0, 1, 2].map((i) => spansFullRow(i, 3)), [false, false, true]);
  // 4 leftovers: two clean rows.
  assert.deepEqual(
    [0, 1, 2, 3].map((i) => spansFullRow(i, 4)),
    [false, false, false, false],
  );
  // No projects beyond the featured one: nothing to place.
  assert.equal(spansFullRow(0, 0), false);
});

test("project diagrams stay full-size vectors", async () => {
  for (const file of [
    "zero-trust-mcp-gateway.svg",
    "adeguard.svg",
    "twinmind-v2.svg",
    "kaggriculture-evidence-loop.svg",
  ]) {
    const svg = await readFile(new URL(`../public/projects/${file}`, import.meta.url), "utf8");
    assert.match(svg, /width="2560"/);
    assert.match(svg, /height="1440"/);
    assert.match(svg, /viewBox="0 0 2560 1440"/);
    assert.doesNotMatch(svg, /<image\b/, `${file} must not embed a raster image`);
    for (const marker of svg.matchAll(/<marker\b[^>]*>/g)) {
      assert.match(marker[0], /markerUnits="userSpaceOnUse"/, `${file} has a stroke-scaled arrow`);
    }
  }
});
